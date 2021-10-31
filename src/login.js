import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.username = React.createRef();
        this.password = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        //make api call with the two refs 





    }

    render() {

        return (
            <>
                <h1>Login</h1>
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

export default Login;