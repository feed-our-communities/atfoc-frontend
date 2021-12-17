import React, { useState, useContext } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

import { ContextGlobal } from '../../contexts';

/**
 * @returns manage members view
 */
export default function ManageMembers({orgId}) {
    const context = useContext(ContextGlobal);

    const [regMembers, setRegMembers] = useState([]);
    const [admins, setAdmins] = useState([]);

    getUsers(regMembers, admins, setRegMembers, false, context.token, orgId);
    getUsers(regMembers, admins, setAdmins, true, context.token, orgId);

    let regMemberCards = makeUserCards(regMembers, false, context.token);
    let adminCards = makeUserCards(admins, true, context.token);

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

async function getUsers(regMembers, admins, setUsers, getAdmin, token, orgId) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/members/?org_id=" + orgId, requestOptions);
    let result = await response.json();

    if (response.status === 200) {

        if (getAdmin) {
            if (admins !== result["admins"]) {
                setUsers(result["admins"]);
            }
        } else {
            if (regMembers !== result["members"]) {
                setUsers(result["members"]);
            }
        }

    } else if (response.status === 204) {
        console.log("No users");
    } else {
        console.log(result);
    }
}

function makeUserCards(users, isAdmin, token) {

    console.log(users);

    let cards = [];

    let adminButton = (<></>);
    
    for (let i = 0; i < users.length; i++) {

        if (isAdmin) {
            adminButton = (
                <Button variant="customOrange" type="button" onClick={function() {changeAdminStatus(false, token, users[i].id);}}>
                    Remove Admin
                </Button>);
        } else {
            adminButton = (
                <Button variant="customOrange" type="button" onClick={function() {changeAdminStatus(true, token, users[i].id);}}>
                    Make Admin
                </Button>);
        }

        cards.push(<Card>
                <Card.Body>
                    <div className="btn-group">
                        <p>Name</p>
                        <div className="buttonPad">
                            {adminButton}
                        </div>
                        <div className="buttonPad">
                            <Button variant="customBlue" type="button" onClick={function() {removeMember(token, users[i].id)}}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>);
    }

    return cards; 
} 

async function changeAdminStatus(newStatus, token, user_id) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var formdata = new FormData();
    formdata.append("is_admin", newStatus);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/members/?id=" + user_id, requestOptions);
    let result = await response.json();
}

async function removeMember(token, user_id) {
    //TODO check that parameter is right with api call? unsure 

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token" + token);

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/members/?id=" + user_id, requestOptions);
    let result = await response.json();

}