import React from 'react';
import "./MyOrg.css";
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import OrgRegistration from '../OrgRegistration/OrgRegistration';
import JoinRequestModal from '../JoinRequestModal/JoinRequestModal';
import Modal from "react-bootstrap/Modal";
import JoinRequests from '../JoinRequestsView/JoinRequests';
import ManageMembers from '../ManageMembers/ManageMembers';

function dispOrg(orgInfo){
  // TODO display better
  return(
    <>
      <h4>{orgInfo.name}</h4>
      <h4>{orgInfo.address}</h4>
      <h4>{orgInfo.email}</h4>
      <h4>{orgInfo.phone}</h4>
      <h4>{orgInfo.url}</h4>
    </>
  )
}

function DispAdmin({accountInfo}){
  const [showManageMembers, setShowManageMembers] = useState(false);
  const [showJoinRequests, setShowJoinRequests] = useState(false);

  const handleShowManageMembers = () => setShowManageMembers(true);
  const handleShowJoinRequests = () => setShowJoinRequests(true);
  const handleCloseManageMembers = () => setShowManageMembers(false);
  const handleCloseJoinRequests = () => setShowJoinRequests(false);

  // do not show admin view for non admin user
  console.log("HERE", accountInfo);
  if (!accountInfo.is_org_admin) {
    return null
  }

  return(
    <>
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
            <JoinRequests orgID = {accountInfo.organization.id}/>
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

function isInOrg(accountInfo){
    if(!accountInfo.organization){
        return noOrg()
    }
    return (
      <>
        {dispOrg(accountInfo.organization)}
        <DispAdmin accountInfo = {accountInfo}/>
      </>
    )  
}

export default function MyOrg({accountInfo}){
    return(
        <>
          {isInOrg(accountInfo)}
        </>
    )
}