import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        console.log("log");



    }

    render() {

        return (
            <>
                <h1>Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formLoginUsername">
                        <Form.Control type="email" placeholder="Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLoginPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Login
                    </Button>
                </Form>
            </>
        );
    }

}

export default Login;