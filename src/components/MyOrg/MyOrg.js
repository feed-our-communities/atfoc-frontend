import React from 'react';
import "./MyOrg.css";
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import OrgRegistration from '../OrgRegistration/OrgRegistration';
import JoinRequestModal from '../JoinRequestModal/JoinRequestModal';
import Modal from "react-bootstrap/Modal";


function dispOrg(orgInfo, handleShowManageMembers, handleShowJoinRequests){
    //TODO pull out org info
    return(
        <>
            <h1>{orgInfo}</h1>
            <div className="smallPad" onClick={handleShowManageMembers}>
                <Button variant="customOrange">
                    Manage Members
                </Button>
            </div>
            <div className="smallPad" onClick={handleShowJoinRequests}>
                <Button variant="customOrange">
                    JoinRequests
                </Button>
            </div>
        </>
    )
}

function noOrg(){
    return(
        <>
            <h1>You are not part of an organization yet</h1>
            <div className="pad">
                <OrgRegistration />
            </div>
            <JoinRequestModal/>
        </>
    )
}

function isInOrg(orgInfo, handleShowManageMembers, handleShowJoinRequests){
    if(!orgInfo){
        return noOrg()
    }
    return dispOrg(orgInfo, handleShowManageMembers, handleShowJoinRequests)
}

export default function MyOrg({userInfo, orgInfo, orgList}){
    const [showManageMembers, setShowManageMembers] = useState(false);
    const [showJoinRequests, setShowJoinRequests] = useState(false);

    const handleShowManageMembers = () => setShowManageMembers(true);
    const handleShowJoinRequests = () => setShowJoinRequests(true);

    console.log("heheheh", {userInfo});
    return(
        <>
            {isInOrg(orgInfo, handleShowManageMembers, handleShowJoinRequests)}
        </>
    )
}