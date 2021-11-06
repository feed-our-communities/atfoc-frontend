import React from 'react';
import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import { useRef} from 'react';
import { joinRequest } from "../../services/org"

export default function RequestModal({orgName, show, setShow}) {
    const handleClose = () => setShow(false);
    const applicationText = useRef();
  

    function handleSubmit(){
        joinRequest(orgName, applicationText)
        alert("Application Submitted!")
        setShow(false)
    }

    return (
      <>  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="request">
                <Form.Label>Request Form</Form.Label>
                <Form.Control 
                    as="textarea"
                    placeholder="Organization URL"
                    ref={applicationText}
                    rows={3} />
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
                onClick={handleSubmit}>
                Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }