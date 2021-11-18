import React, {useContext} from 'react';
import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import { useRef} from 'react';
import { joinRequest } from "../../services/org"
import { ContextGlobal } from '../../contexts';

export default function RequestModal({org, show, setShow}) {
    const context = useContext(ContextGlobal)

    const handleClose = () => setShow(false);
    const applicationText = useRef();

    function handleSubmit(){
        joinRequest(org.id, applicationText, context.token)
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
            <Modal.Title>Join Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="request">
                <Form.Label>Join Request Form for {org.name}</Form.Label>
                <Form.Control 
                    as="textarea"
                    placeholder="Write information related to your join request here"
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