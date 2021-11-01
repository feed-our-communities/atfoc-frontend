import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();
        this.firstName = React.createRef();
        this.LastName = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

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
                            <Button variant="custom" type="submit" onClick={this.handleSubmit}>
                                Create Account
                            </Button>
                        </Form>

                        <p>Already have an account? <span><Link to="/Login">Login</Link></span></p>

                    </Card.Body>
                </Card>

            </>
        );

    }

}

export default CreateAccount;