import React, { useState, useContext } from 'react';
import {Card, Button, Form} from "react-bootstrap";
import './JoinRequests.css'

import { ContextGlobal } from '../../contexts';

/**
 * @returns join requests view
 */
 export default function JoinRequests() {
    const context = useContext(ContextGlobal);

    const [pendingRequests, setPendingRequests] = useState([]);

    getPendingJoinRequests(setPendingRequests, context.token);

    let requestCards = makeRequestCards(pendingRequests, context.token);

    return (<>
                {requestCards}
            </>);
 }

 function makeRequestCards(requests, token) {

    console.log(requests);

    //TODO add notes  
    const approveNumber = 1;
    const rejectNumber = 2;

    let requestCardList = [];

    for (let i = 0; i < requests.length; i++) {

        //should always have both first and last
        let name = requests[i].user.first_name + requests[i].user.last_name;

        requestCardList.push(
            <Card>
                <Card.Body>
                    <div class="btn-group">
                        <p>{name}</p>
                        <div class="buttonPad">
                            {requests[i].note}
                        </div>
                        <div class="buttonPad">
                            <Button variant="customOrange" type="button" onClick={function() {updateJoinRequestStatus(approveNumber, requests[i].id, token);}}>
                                Approve
                            </Button>
                        </div>
                        <div class="buttonPad">
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

 async function getPendingJoinRequests(setPendingRequests, token) {

    const pendingStatusNum = 0;

    let result = await callJoinRequestsAPI(pendingStatusNum, setPendingRequests, token);

    return result;
 }

 async function callJoinRequestsAPI(status, setPendingRequests, token) {

    let orgID = 0; //TODO get actual ordID - localStorage? api call?

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
        setPendingRequests(result["join_requests"]);
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
