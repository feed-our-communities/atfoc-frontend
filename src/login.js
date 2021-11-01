import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        if (this.username.current != null && this.password.current != null) {

            console.log(this.username.current.value);

            var formdata = new FormData();
            formdata.append("username", this.username.current.value);
            formdata.append("password", this.password.current.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/api/identity/login/", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
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
                            <Button variant="custom" type="button" onClick={this.handleSubmit}>
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