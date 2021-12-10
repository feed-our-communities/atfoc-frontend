import React, { useState, useContext } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

import { ContextGlobal } from '../../contexts';

export default function ExistingOrgs() {

    const context = useContext(ContextGlobal);

    const [orgs, setOrgs] = useState([]);

    getOrgs(setOrgs, context.token);

    let orgCards = makeOrgCards(orgs, context.token);

    return (
        <>
            <Tabs defaultActiveKey="Active Organizations">
                    <Tab eventKey="Active Organizations" title="Active Organizations">
                        {orgCards}
                    </Tab>
            </Tabs>    
        </>
    );
}

async function getOrgs(setOrgs, token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org", requestOptions);
    let result = await response.json();

    if (response.status === 200) {
        setOrgs(result);
    } else {
        alert("There was a problem retrieving active organizations.");
    }

}

function makeOrgCards(orgs, token) {

    let orgCards = [];

    // orgs.push(
    //     {
    //         "Organization Id": 0,
    //         "Organization name": "test",
    //     }
    // );

    console.log(orgs);

    for (let i = 0; i < orgs.length; i++) {
        orgCards.push(
            <Card key={i}>
                <Card.Body>
                    <div className="btn-group">
                        <p>{orgs[i]["Organization Id"]} </p>
                        <p>{orgs[i]["Organization name"]}</p>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {removeOrg()}}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (orgCards);

}

async function removeOrg() {
    //TODO (i dont think we planned for this)
}

