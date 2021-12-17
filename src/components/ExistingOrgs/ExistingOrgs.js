import React, { useState, useContext } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

import { ContextGlobal } from '../../contexts';

export default function ExistingOrgs() {

    const context = useContext(ContextGlobal);

    const [orgs, setOrgs] = useState([]);

    getOrgs(setOrgs, orgs, context.token);

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

async function getOrgs(setOrgs, orgs, token) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response;
    let result;

    try {
        response = await fetch("http://localhost:8000/api/identity/organization", requestOptions);
        result = await response.json();
    } catch (error) {
        console.log(error)
        return;
    }

    if (response.status === 200) {
        if (JSON.stringify(orgs) !== JSON.stringify(result)) {
            setOrgs(result);
        }
    } else {
        alert("There was a problem retrieving active organizations.");
    }

}

function makeOrgCards(orgs, token) {

    let orgCards = [];

    console.log(orgs);

    for (let i = 0; i < orgs.length; i++) {
        orgCards.push(
            <Card key={i}>
                <Card.Body>
                    <div className="btn-group">
                        <p style={{marginRight: '24vw'}}>{orgs[i]["id"]} </p>
                        <p style={{marginRight: '24vw'}}>{orgs[i]["name"]}</p>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {removeOrg(token)}}>
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

async function removeOrg(token) {
    //TODO (i dont think we planned for this)
}

