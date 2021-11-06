import React from 'react';
import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SERVER } from "../../constants"
import { useEffect, useState, useRef} from 'react';

function validateInput() {
    //what required input validation is there? 
    return true;
}

export default function OrgRegistration() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const orgName = useRef(null)
    const address = useRef(null)
    const orgURL = useRef(null)
    const email = useRef(null)
    const phone = useRef(null)
  
    async function callOrgRegistrationAPI() {
        if (!(orgName.current != null &&
            address.current != null &&
            orgURL.current != null &&
            email.current != null &&
            phone.current != null &&
            validateInput())) {
            return
        }
    
        var token = localStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "name": orgName.current.value,
            "address": address.current.value,
            "phone": phone.current.value,
            "email": email.current.value,
            "url": orgURL.current.value
        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        var response = await fetch(SERVER + "/api/identity/application/", requestOptions);
        var result = await response.json();
    
        if (response.status === 200) {
    
            //TODO set showmodal state to false
    
        } else {
            alert(result["message"]);
        }
    }

    return (
      <>
        <Button variant="customOrange" onClick={handleShow}>
            Apply to Register an Organization
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="register-org"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="register-org">Register an Organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Group
                    controlId="formOrgName"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Organization Name"
                        ref={orgName}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formOrgAddress"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Address"
                        ref={address}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formOrgURL"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Organization URL"
                        ref={orgURL}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formOrgEmail"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Organization Email"
                        ref={email}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formOrgPhone"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        placeholder="Organization Phone"
                        ref={phone}
                    />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button 
                variant="customOrange"
                type="button"
                onClick={callOrgRegistrationAPI}
            >
                Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
