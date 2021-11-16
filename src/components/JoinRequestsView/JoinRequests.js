import React from 'react';

/**
 * 
 * @returns join requests view
 */
 export default function JoinRequests() {

    return (<></>);

 }

 async function getPendingJoinRequests() {

    const pendingStatusNum = 0;

    let result = await callJoinRequestsAPI(pendingStatusNum);

 }

 async function callJoinRequestsAPI(status) {
    //TODO get token and orgID

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
        return result;
    } else {
        console.log(result);
    }
    
    return [];
 }

 //Questions
 //only org admins can approve requests? 