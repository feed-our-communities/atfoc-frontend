import React, { useState } from 'react';
import {Card, Button, Form} from "react-bootstrap";

/**
 * @returns join requests view
 */
 export default function JoinRequests() {

    const [pendingRequests, setPendingRequests] = useState([]);

    getPendingJoinRequests(setPendingRequests);

    let requestCards = makeRequestCards(setPendingRequests);

    //let requestCards = makeRequestCards([0, 1, 2]);

    return (<>
                <h1>Join Requests</h1>
                {requestCards}
            </>);
 }

 function makeRequestCards(requests) {

    let requestCardList = [];

    for (let i = 0; i < requests.length; i++) {
        requestCardList.push(
            <Card>
                <Card.Body>
                    <div class="btn-group">
                        <Form.Check type="checkbox"/>
                        <p>Name</p>
                        <Button variant="customOrange">
                            Notes
                        </Button>
                        <Button variant="customOrange" type="button" onClick={function() {updateJoinRequestStatus(1);}}>
                            Approve
                        </Button>
                        <Button variant="customBlue" type="button" onClick={function() {updateJoinRequestStatus(2);}}>
                            Reject
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    console.log(requestCardList);
     
    return requestCardList;
 }

function updateJoinRequestStatus(status) {
    callUpdateJoinRequestAPI(status);
}

 async function getPendingJoinRequests(setPendingRequests) {

    const pendingStatusNum = 0;

    let result = await callJoinRequestsAPI(pendingStatusNum, setPendingRequests);

    return result;
 }

 async function callJoinRequestsAPI(status, setPendingRequests) {

    let token = localStorage.getItem('token');
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

 async function callUpdateJoinRequestAPI(status) {

    let token = localStorage.getItem('token');
    let requestId = 0; //TODO find actual request Id

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token");

    var formdata = new FormData();
    formdata.append("request_id", requestId);
    formdata.append("status", status);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    let result = await fetch("http://localhost:8000/api/identity/joinrequests", requestOptions);
    let response = await response.json();

    //TODO error handling

}
