import React from 'react';
import '../../App.css';
import './Login.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import history from "../../history";
import { SERVER, COLORS } from "../../constants";
import { ContextGlobal } from '../../contexts';

class Login extends React.Component {
    static contextType = ContextGlobal // makes context accessible through this.context

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.callLoginAPI = this.callLoginAPI.bind(this);
    }

    componentDidMount(){
        document.body.style.backgroundColor = COLORS.primary_orange
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

            var response = await fetch(SERVER + "/api/identity/login/", requestOptions);
            var result = await response.json();

            if (response.status === 200) {

                var token = result["token"];
                localStorage.setItem("token", token);
                this.context.setToken(token)

                history.push("/");

            } else {
                console.log(result["message"]);
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
