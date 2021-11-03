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

    async callIdentityAPI() {


    }

    redirectAfterLogin() {
        var id = await callIdentityAPI();
        localStorage.setItem("org", id["org"]);
        history.push("/");
    }

    callLoginAPI() {

        if (this.username.current != null && this.password.current != null) {

            console.log(this.username.current.value);

            var formdata = new FormData();
            formdata.append("username", this.username.current.value);
            formdata.append("password", this.password.current.value);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/identity/login/", requestOptions)
                .then(response => response.text())
                .then(result => {

                    //TODO error case 

                    var token = JSON.parse(result)["token"];
                    localStorage.setItem("token", token);

                    redirectAfterLogin();

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