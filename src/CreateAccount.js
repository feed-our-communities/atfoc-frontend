import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import history from "./history";


class CreateAccount extends React.PureComponent {

    constructor(props) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();
        this.firstName = React.createRef();
        this.lastName = React.createRef();

        this.callRegisterAPI = this.callRegisterAPI.bind(this);
        this.validInput = this.validInput.bind(this);
    }

    validInput() {

        // username is autovalidated for being an email 

        // password and current password are same 
        if (this.password.current.value !== this.confirmPassword.current.value) {
            return false;
        }

        // no all whitespace names
        if (this.firstName.current.value.trim() === "" || this.lastName.current.value.trim() === "") {
            return false;
        }

        return true;

    }

    callRegisterAPI() {

        if (this.username.current != null &&
            this.password.current != null &&
            this.confirmPassword.current != null &&
            this.firstName.current != null &&
            this.lastName.current != null && this.validInput()) {

            var formdata = new FormData();
            formdata.append("username", this.username.current.value);
            formdata.append("password", this.password.current.value);
            formdata.append("confirmPassword", this.confirmPassword.current.value);
            formdata.append("firstName", this.firstName.current.value);
            formdata.append("lastName", this.lastName.current.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/identity/register/", requestOptions)
                .then(response => response.text())
                .then(result => {

                    //if success go to login page
                    //TODO 

                    history.push("/");

                })
                .catch(error => console.log('error', error));

        } else {
            //error TODO
        }


    }


    render() {
        return (
            <>
                <Card className="whiteCard">
                    <Card.Body>
                        <h1>Create An Account</h1>
                        <Form>
                            <Form.Group
                                controlId="formLoginUsername"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="Username"
                                    ref={this.username}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formFirstName"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    ref={this.firstName}
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="formLastName"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    ref={this.lastName}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formLoginPassword"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    ref={this.password}
                                />
                            </Form.Group>
                            <Form.Group
                                controlId="formLoginConfirmPassword"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    ref={this.confirmPassword}
                                />
                            </Form.Group>
                            <Button variant="custom" type="button" onClick={this.callRegisterAPI}>
                                Create Account
                            </Button>
                        </Form>
                        <p>Already have an account? <span><Link to="/">Login</Link></span></p>
                    </Card.Body>
                </Card>
            </>
        );

    }

}

export default CreateAccount;