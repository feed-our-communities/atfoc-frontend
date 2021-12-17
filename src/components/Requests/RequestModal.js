import React, {useContext} from 'react';
import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import { useRef} from 'react';
import { deleteRequest, makeRequest } from "../../services/org";
import { ContextGlobal } from '../../contexts';

export function MakeRequestModal({orgID, show, setShow, updateRequests}) {
    const context = useContext(ContextGlobal)
    const desc = useRef();

    const handleClose = () => setShow(false);

    async function handleSubmit(){
        let data = JSON.stringify({
            "org_id": orgID,
            "description": desc.current.value,
            "traits":[1]
        })

        await makeRequest(data, context.token)
        updateRequests() // reload the donation list
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
            <Modal.Title>Make a Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="requestDescription">
                <Form.Control 
                  as="textarea"
                  placeholder="What are you requesting?"
                  ref={desc}
                  rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
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


export function DeleteRequestModal({donationID, show, setShow, updateRequests}) {
  const context = useContext(ContextGlobal)

  const handleClose = () => setShow(false);

  async function handleSubmit(){
    await deleteRequest(donationID, context.token)
    updateRequests() // reload the donation list
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
          <Modal.Title>Are you sure you want to close this Listing?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
              variant="customOrange"
              type="button"
              onClick={handleSubmit}>
              Close Listing
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


