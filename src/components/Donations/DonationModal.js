import React, {useContext, useState} from 'react';
import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Modal } from 'react-bootstrap';
import { useRef} from 'react';
import { deleteDonation, makeDonation } from "../../services/org";
import { ContextGlobal } from '../../contexts';
import DatePicker from 'react-datepicker';

export function MakeDonationModal({org, show, setShow, updateDonations}) {
    const context = useContext(ContextGlobal)
    const [expirationDate, setStartDate] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const description = useRef();
    const traits = useRef();

    const handleClose = () => setShow(false);

    async function handleSubmit(){
      var body = {
        "org_id": org.id, // TODO double check props  
        "description": description.current.value,
        "picture": selectedImage,
        "expiration_date": expirationDate,
        "traits": [traits.current.value]
      }

      await makeDonation(body, context.token)
      updateDonations() // reload the donation list
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
            <Modal.Title>Make a Donation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="donationDescription">
                <Form.Control 
                  as="textarea"
                  placeholder="Donation Description"
                  ref={description}
                  rows={3} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Donation Image</Form.Label>
                <Form.Control 
                  type="file" 
                  onChange= {(image) => {setSelectedImage(image)}}
                />
              </Form.Group>
            </Form>
            <DatePicker
              selected={expirationDate}
              onChange={(date) => setStartDate(date)}
            />
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


export function DeleteDonationModal({donationID, show, setShow, updateDonations}) {
  const context = useContext(ContextGlobal)

  const handleClose = () => setShow(false);

  async function handleSubmit(){
    await deleteDonation(donationID, context.token)
    updateDonations() // reload the donation list
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


