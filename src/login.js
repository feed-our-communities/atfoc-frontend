import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import history from "./history";
import OrgRegistration from './OrgRegistration';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.callLoginAPI = this.callLoginAPI.bind(this);
    }

    async callLoginAPI() {

        if (this.username.current != null && this.password.current != null) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": this.username.current.value,
                "password": this.password.current.value
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            var response = await fetch("http://localhost:8000/api/identity/login/", requestOptions);
            var result = await response.json();

            if (response.status === 200) {

                var token = result["token"];
                localStorage.setItem("token", token);

                history.push("/");

            } else {
                alert(result["message"]);
            }

        }
    }

    render() {
        return (
            <>
                <Card className="whiteCard">
                    <Card.Body>
                        <h1>Login</h1>
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
                                controlId="formLoginPassword"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    ref={this.password}
                                />
                            </Form.Group>
                            <Button variant="customOrange" type="button" onClick={this.callLoginAPI}>
                                Login
                            </Button>
                        </Form>
                        <p>Not a member yet? <span><Link to="/CreateAccount">Sign up</Link></span></p>
                    </Card.Body>
                </Card>
            </>
        );
    }

}

export default Login;