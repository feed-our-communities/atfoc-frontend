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

    let requestCards = makeRequestCards(pendingRequests, context.token);

    return (<>
                {requestCards}
            </>);
 }

 function makeRequestCards(requests, token) {

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
            <Card>
                <Card.Body>
                    <div className="btn-group">
                        <p>{name}</p>
                        <div className="buttonPad">
                            {requests[i].note}
                        </div>
                        <div className="buttonPad">
                            <Button variant="customOrange" type="button" onClick={function() {updateJoinRequestStatus(approveNumber, requests[i].id, token);}}>
                                Approve
                            </Button>
                        </div>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {updateJoinRequestStatus(rejectNumber, requests[i].id, token);}}>
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

function updateJoinRequestStatus(status, token) {
    callUpdateJoinRequestAPI(status, token);
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

 async function callUpdateJoinRequestAPI(status, requestId, token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token" + token);

    var formdata = new FormData();
    formdata.append("request_id", requestId);
    formdata.append("status", status);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/joinrequests", requestOptions);
    let result = await response.json();

    //TODO error handling

}
