import React, { useState, useContext } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

import { ContextGlobal } from '../../contexts';

export default function OrgApplications() {

    const context = useContext(ContextGlobal);

    const [orgApps, setOrgApps] = useState([]);

    getOrgApplications(setOrgApps, context.token);

    let orgCards = makeOrgCards(orgApps, context.token);

    return (
        <>
            <Tabs defaultActiveKey="Pending Applications">
                    <Tab eventKey="Pending Applications" title="Pending Applications">
                        {orgCards}
                    </Tab>
            </Tabs>    
        </>
    );

}

async function getOrgApplications(setOrgApps, token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let pendingStatusID = 0;

    let response = await fetch("http://localhost:8000/api/identity/application/?status=" + pendingStatusID, requestOptions);
    let result = await response.json();

    if (response.status === 200) {
        setOrgApps(result);
    } else if (response.status === 204) {
        setOrgApps([]);
    } else {
        alert("An Error Occured Retrieving Organization Applications.");
        console.log(response.status);
        console.log(result);
    }
}

function makeOrgCards(orgApps, token) {

    //TODO add note

    let orgCards = [];

    for (let i = 0; i < orgApps.length; i++) {
        orgCards.push(
            <Card>
                <Card.Body>
                    <div class="btn-group">
                        <p>Note</p>
                        <div class="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {approveOrgApp()}}>
                                Approve
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return ([]);
}

async function approveOrgApp() {

}