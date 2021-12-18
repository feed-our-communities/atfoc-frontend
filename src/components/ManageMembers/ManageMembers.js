import React, { useState, useContext } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

import { ContextGlobal } from '../../contexts';

/**
 * @returns manage members view
 */
export default function ManageMembers({orgID}) {
    const context = useContext(ContextGlobal);

    const [regMembers, setRegMembers] = useState([]);
    const [admins, setAdmins] = useState([]);

    getUsers(regMembers, admins, setRegMembers, false, context.token, orgID);
    getUsers(regMembers, admins, setAdmins, true, context.token, orgID);

    let regMemberCards = makeUserCards(regMembers, false, context.token, orgID);
    let adminCards = makeUserCards(admins, true, context.token, orgID);

    return (<>
                <Tabs defaultActiveKey="members">
                    <Tab eventKey="members" title="Members">
                        {regMemberCards}
                    </Tab>
                    <Tab eventKey="admin" title="Admin">
                        {adminCards}
                    </Tab>
                </Tabs>
            </>);
}

async function getUsers(regMembers, admins, setUsers, getAdmin, token, orgID) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/"+orgID+"/members/", requestOptions);
    let result = await response.json();

    if (response.status === 200) {

        if (getAdmin) {
            if (JSON.stringify(admins) !== JSON.stringify(result["admins"])) {
                setUsers(result["admins"]);
            }
        } else {
            if (JSON.stringify(regMembers) !== JSON.stringify(result["members"])) {
                setUsers(result["members"]);
            }
        }

    } else if (response.status === 204) {
        console.log("No users");
    } else {
        console.log(result);
    }
}

function makeUserCards(users, isAdmin, token, orgID) {

    let cards = [];

    let adminButton = (<></>);
    
    for (let i = 0; i < users.length; i++) {

        if (isAdmin) {
            adminButton = (
                <Button variant="customOrange" type="button" onClick={function() {changeAdminStatus(false, token, users[i].user_id, orgID);}}>
                    Remove Admin
                </Button>);
        } else {
            adminButton = (
                <Button variant="customOrange" type="button" onClick={function() {changeAdminStatus(true, token, users[i].user_id, orgID);}}>
                    Make Admin
                </Button>);
        }

        cards.push(<Card key={i}>
                <Card.Body>
                    <div className="btn-group">
                        <p>{users[i].first} {users[i].last}</p>
                        <div className="buttonPad">
                            {adminButton}
                        </div>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {removeMember(token, users[i].user_id, orgID)}}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>);
    }

    return cards; 
} 

async function changeAdminStatus(newStatus, token, userID, org_id) {
    console.log(userID);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
                "user_id": userID,
                "is_admin": newStatus
            });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/"+ org_id +"/members/", requestOptions);
    let result = await response.json();

    if (response.status === 201) {
        alert("Admin status changed");
    } else {
        console.log(response);
    }
    
}

async function removeMember(token, user_id, org_id) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
                "user_id": user_id,
                "is_admin": false
            });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/"+ org_id +"/members/", requestOptions);
    let result = await response.json();

    if (response.status !== 200) {
        console.log(response);
    } else {
        alert("User successfully removed!");
    }
}
