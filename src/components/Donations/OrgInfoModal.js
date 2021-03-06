import React, {useContext, useEffect, useState} from 'react';
import '../../App.css';
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import { ContextGlobal } from '../../contexts';
import { getOrg } from '../../services/org';
      
export default function OrgInfoModal({orgID, show, setShow}) {
    const context = useContext(ContextGlobal)
    const [orgInfo, setOrgInfo] = useState(null)

    const handleClose = () => setShow(false);

    useEffect(() => {
      if (orgID !== null) {
        getOrg(orgID, setOrgInfo, context.token)
      }
    }, [orgID, context.token])

    return(
        <Modal
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Org contact Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><b>Name:</b> {orgInfo?.name}</h4>
            <h4><b>Address:</b> {orgInfo?.address}</h4>
            <h4><b>Email:</b> {orgInfo?.email}</h4>
            <h4><b>Phone:</b> {orgInfo?.phone}</h4>
            <h4><b>Website:</b> {orgInfo?.url}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
    )
}
      


