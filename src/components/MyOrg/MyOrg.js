import React from 'react';
import "./MyOrg.css";
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import OrgRegistration from '../OrgRegistration/OrgRegistration';
import JoinRequestModal from '../JoinRequestModal/JoinRequestModal';
import Modal from "react-bootstrap/Modal";

import JoinRequests from '../JoinRequestsView/JoinRequests';
import ManageMembers from '../ManageMembers/ManageMembers';

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
    // if(!orgInfo){
    //     return noOrg()
    // }
    return dispOrg(orgInfo, handleShowManageMembers, handleShowJoinRequests)
}

export default function MyOrg({userInfo, orgInfo, orgList}){
    const [showManageMembers, setShowManageMembers] = useState(false);
    const [showJoinRequests, setShowJoinRequests] = useState(false);

    const handleShowManageMembers = () => setShowManageMembers(true);
    const handleShowJoinRequests = () => setShowJoinRequests(true);
    const handleCloseManageMembers = () => setShowManageMembers(false);
    const handleCloseJoinRequests = () => setShowJoinRequests(false);

    console.log("heheheh", {userInfo});
    return(
        <>
            {isInOrg(orgInfo, handleShowManageMembers, handleShowJoinRequests)}
        <Modal
          show={showJoinRequests}
          onHide={handleCloseJoinRequests}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="join-requests"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="join-requests">Manage Join Requests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JoinRequests/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseJoinRequests}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showManageMembers}
          onHide={handleCloseManageMembers}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="manage-members"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="manage-members">Manage Members</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ManageMembers/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseManageMembers}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        </>
    )
}