import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import history from "./history";

class OrgRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.orgName = React.createRef();
        this.address = React.createRef();
        this.orgURL = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
    }

    validInput() {



    }

    callOrgRegistrationAPI() {

        if (this.orgName.current != null &&
            this.address.current != null &&
            this.orgURL.current != null &&
            this.email.current != null &&
            this.phone.current != null &&
            this.validInput()) {

            //api call

        }

    }

    render() {

        return (
            <>
                <Card className="whiteCard">
                    <Card.Body>
                        <h1>New Organization Application</h1>
                        <Form>
                            <Form.Group
                                controlId="formOrgName"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Organization Name"
                                    ref={this.orgName}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formOrgAddress"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    ref={this.address}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formOrgURL"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Organization URL"
                                    ref={this.orgURL}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formOrgEmail"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Organization Email"
                                    ref={this.email}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formOrgPhone"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Organization Phone"
                                    ref={this.phone}
                                />
                            </Form.Group>

                            <Button variant="customOrange" type="button" onClick={this.callOrgRegistrationAPI}>
                                Submit
                            </Button>
                        </Form>
                        <Link to="/Home">
                            <Button variant="customBlue" type="button">
                                Back
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </>
        );
    }


}

export default OrgRegistration;