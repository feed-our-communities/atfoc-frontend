import React, { useState, useContext } from 'react';
import {Card, Button} from "react-bootstrap";
import './JoinRequests.css'

import { ContextGlobal } from '../../contexts';

/**
 * @returns join requests view
 */
 export default function JoinRequests({orgID}) {
    const context = useContext(ContextGlobal);

    const [pendingRequests, setPendingRequests] = useState([]);

    getPendingJoinRequests(setPendingRequests, context.token, orgID, pendingRequests);

    let requestCards = makeRequestCards(pendingRequests, context.token, orgID);

    return (<>
                {requestCards}
            </>);
 }

 function makeRequestCards(requests, token, orgID) {

    console.log(requests);


    //TODO add notes  
    const approveNumber = 1;
    const rejectNumber = 2;

    let requestCardList = [];

    if(!requests){
        return (
            <p>No Active Join Requests</p>
        )
    }

    console.log(requests);

    for (let i = 0; i < requests.length; i++) {

        //should always have both first and last
        let name = requests[i].user.first + " " + requests[i].user.last;

        requestCardList.push(
            <Card key={i}>
                <Card.Body>
                    <div className="btn-group">
                        <p>{name}</p>
                        <div className="buttonPad">
                            {requests[i].note}
                        </div>
                        <div className="buttonPad">
                            <Button variant="customOrange" type="button" onClick={function() {callUpdateJoinRequestAPI(approveNumber, requests[i].id, token, requests[i].user.id, false, orgID);}}>
                                Approve
                            </Button>
                        </div>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {callUpdateJoinRequestAPI(rejectNumber, requests[i].id, token, requests[i].user.id, false, orgID);}}>
                                Reject
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    if (requestCardList.length === 0) {
        return (
            <p>No Active Join Requests</p>
        )
    }
     
    return requestCardList;
 }

 async function getPendingJoinRequests(setPendingRequests, token, orgID, joinRequests) {

    const pendingStatusNum = 0;

    let result = await callJoinRequestsAPI(pendingStatusNum, setPendingRequests, token, orgID, joinRequests);

    return result;
 }

 async function callJoinRequestsAPI(status, setPendingRequests, token, orgID, joinRequests) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token" + token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/joinrequests/?organization=" + orgID + "&status=" + status, requestOptions);
    let result = await response.json();

    if (response.status === 200 || response.status === 204) {
        if (JSON.stringify(joinRequests) !== JSON.stringify(result)){
            setPendingRequests(result);
        }
    } else {
        console.log(result);
    }
 }

 async function callUpdateJoinRequestAPI(status, requestId, token, userID, isAdmin, orgID) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token" + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "status": status
      });

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/joinrequests/" + requestId + "/", requestOptions);
    let result = await response.json();

    if (response.status === 200) {
        if (status === 1) {
            alert("Join request approved");
            callAddUserToOrg(token, userID, isAdmin, orgID);
        } else if (status === 2) {
            alert("Join request denied");
        }
    } else {
        console.log(response);
    }

}

async function callAddUserToOrg(token, userID, isAdmin, orgID) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user_id": userID,
        "is_admin": isAdmin
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/" + orgID + "/members/", requestOptions);
    let result = await response.json();

    if (response.status === 201) {
        alert("Join request approved");
    } else {
        console.log(response);
        console.log(userID)
    }

}
