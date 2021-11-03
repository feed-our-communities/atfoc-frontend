import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import history from "./history";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.callLoginAPI = this.callLoginAPI.bind(this);
    }

    callLoginAPI() {

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

            fetch("http://localhost:8000/api/identity/login/", requestOptions)
                .then(response => {

                    if (response.status === 401) {
                        alert("Invalid username or password");
                        return null;
                        //could make this a state, and show it in the form TODO
                    } else if (response.status === 400) {
                        alert("Missing username or password");
                        return null;
                    } else if (response.status === 200) {
                        return response.text();
                    }
                    return null;
                })
                .then(result => {

                    if (result != null) {

                        var token = JSON.parse(result)["token"];
                        localStorage.setItem("token", token);

                        history.push("/");

                    }
                })
                .catch(error => console.log('error', error));

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
                            <Button variant="custom" type="button" onClick={this.callLoginAPI}>
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