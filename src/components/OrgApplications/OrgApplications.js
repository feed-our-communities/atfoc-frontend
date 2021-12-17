import React, { useState, useContext } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

import { ContextGlobal } from '../../contexts';

export default function OrgApplications() {

    const context = useContext(ContextGlobal);

    const [orgApps, setOrgApps] = useState([]);

    getOrgApplications(setOrgApps, orgApps, context.token);

    let orgCards = makeOrgCards(orgApps, setOrgApps, context.token);

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

async function getOrgApplications(setOrgApps, orgApps, token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let pendingStatusID = 0;

    let response;
    let result;

    try {
        response = await fetch("http://localhost:8000/api/identity/application/?status=" + pendingStatusID, requestOptions);
        result = await response.json();
    } catch (error) {
        console.log(error)
        return;
    }

    console.log(result);

    if (response.status === 200) {
        if (JSON.stringify(orgApps) !== JSON.stringify(result)) {
            setOrgApps(result);
        } 
    } else if (response.status === 204) {
        if (JSON.stringify(orgApps) !== JSON.stringify(result)) {
            setOrgApps([]);
        } 
    } else {
        alert("An Error Occured Retrieving Organization Applications.");
        console.log(response.status);
        console.log(result);
    }
}

function makeOrgCards(orgApps, setOrgApps, token) {

    let approveNum = 1;
    let denyNum = 2;

    let orgCards = [];

    for (let i = 0; i < orgApps.length; i++) {
        orgCards.push(
            <Card key={i}>
                <Card.Body>
                    <div className="btn-group">
                        <p style={{marginRight: '35vw'}}>{orgApps[i]["name"]}</p>
                        <div className="buttonPad">
                            <Button variant="customOrange" type="button" onClick={function() {changeOrgAppStatus(approveNum, orgApps, setOrgApps, orgApps[i]["id"], token)}}>
                                Approve
                            </Button>
                        </div>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {changeOrgAppStatus(denyNum, orgApps, setOrgApps, orgApps[i]["id"], token)}}>
                                Deny
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return orgCards;
}

async function changeOrgAppStatus(status, orgApps, setOrgApps, appId, token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": appId,
        "status": status
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let response;
    let result;

    try {
        response = await fetch("http://localhost:8000/api/identity/application/", requestOptions);
        result = await response.json();
    } catch (error) {
        console.log(error);
    }

    if (response.status === 200) {

        let newApps = JSON.parse(JSON.stringify(orgApps));

        let index = -1;
        
        for (let i = 0; i < newApps.length; i++) {
            if (newApps[i]["id"] === appId) {
                index = i;
            }
        }

        if (index === -1) {
            alert("There has been a problem updating the status of this application.");
        } else {
            let removedElem = newApps.splice(index, 1)[0];
            if (status === 1) {
                createNewOrganization(removedElem)
            }
            setOrgApps(newApps);
        }
        
    } else {
        alert("There has been a problem updating the status of this application.");
    }

}

async function createNewOrganization(newOrg) {
    //TODO couldnt find info on this api call
}