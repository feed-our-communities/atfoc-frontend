import React, { useState } from 'react';
import {Card, Button, Form} from "react-bootstrap";

/**
 * @returns members view
 */
 export default function Members() {

    const [members, setMembers] = useState([]);

    getPendingJoinRequests(setPendingRequests);

    let membersCards = makeRequestCards(setPendingRequests);

    //let requestCards = makeRequestCards([0, 1, 2]);

    return (<>
                <h1>Join Requests</h1>
                {requestCards}
            </>);
 }