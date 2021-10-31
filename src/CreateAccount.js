import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
                <Form>
                    <Form.Group
                        controlId="formLoginUsername"
                    >
                        <Form.Control
                            type="email"
                            placeholder="Username"
                            ref={this.username}
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="formLoginPassword"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={this.password}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formLoginConfirmPassword"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            ref={this.confirmPassword}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formFirstName"
                    >
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            ref={this.firstName}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formLastName"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            ref={this.lastName}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Login
                    </Button>
                </Form>
                <Button ariant="primary" type="submit">
                    Create An Account
                </Button>
            </>
        );

    }

}

export default CreateAccount;