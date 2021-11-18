import React, { useState } from 'react';
import {Card, Button, Tabs, Tab} from "react-bootstrap";

/**
 * @returns manage members  view
 */
 export default function ManageMembers() {

    const [regMembers, setRegMembers] = useState([]);
    const [admins, setAdmins] = useState([]);

    getUsers(setRegMembers, false);
    getUsers(setAdmins, true);

    let regMemberCards = makeUserCards(regMembers, false);
    let adminCards = makeUserCards(admins, true)

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

 async function getUsers(setUsers, getAdmin) {

    //TODO get orgID and token 
    let token = 0;
    let orgID = 0;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let response = await fetch("http://localhost:8000/api/identity/org/members/?org_id=" + orgID, requestOptions);
    let result = await response.json();

    if (response.status === 200) {

        if (getAdmin) {
            setUsers(result["admins"]);
        } else {
            setUsers(result["members"]);
        }

    } else if (response.status === 204) {
        console.log("No users");
    } else {
        console.log(result);
    }

 }

 function makeUserCards(users, isAdmin) {

    let cards = [];

    let adminButton = (<></>);
    if (isAdmin) {
        adminButton = (
            <Button variant="customOrange" type="button" onClick={removeAdmin}>
                Remove Admin
            </Button>);
    } else {
        adminButton = (
            <Button variant="customOrange" type="button" onClick={makeAdmin}>
                Make Admin
            </Button>);
    }

    for (let i = 0; i < users.length; i++) {
        cards.push(<Card>
                <Card.Body>
                    <div class="btn-group">
                        <p>Name</p>
                        <div class="buttonPad">
                            {adminButton}
                        </div>
                        <div class="buttonPad">
                            <Button variant="customBlue" type="button" onClick={removeMember}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>);
    }

    return cards; 
 }

 //TODO fill in these functions 

 function removeAdmin() {

 }

 function makeAdmin() {

}

function removeMember() {

}