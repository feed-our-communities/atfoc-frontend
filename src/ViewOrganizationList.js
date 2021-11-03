import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';

import history from "./history";

class ViewOrganizationsList extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            orgs: [],
            orgSelection: -1
        }

        this.search = React.createRef();

        this.callOrgListAPI = this.callOrgListAPI.bind(this);
        this.getOrganizationCards = this.getOrganizationCards.bind(this);
    }

    callOrgListAPI() {

        var token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Token " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8000/api/identity/org/", requestOptions)
            .then(response => {

                if (response.status !== 200) {
                    return null;
                }
                return response.text();
            })
            .then(result => {

                if (result !== null) {

                    this.setState({
                        orgs: result
                    });

                }


            })
            .catch(error => console.log('error', error));

    }

    getOrganizationCards() {

        let orgList = this.state.orgs;

        var orgCards = [];

        for (var i = 0; i < orgList.length; i++) {
            orgCards.push(
                <Card>
                    <Card.Body>

                        <p>{orgList[i]["Organization Id"]}</p>
                        <p>{orgList[i]["Organization name"]}</p>

                        <Button onClick={function () {
                            this.setState({
                                orgSelection: orgList[i]["Organization Id"]
                            });
                        }}>
                            Select
                        </Button>

                    </Card.Body>
                </Card>);
        }

        return orgList;
    }

    render() {
        return (<>
            <Card className="whiteCard">
                <Card.Body>
                    <h1>Search</h1>
                    <Form>
                        <Form.Group
                            controlId="formSearchOrgList"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                ref={this.search}
                            />
                        </Form.Group>
                        {this.getOrganizationCards}
                    </Form>
                </Card.Body>
            </Card>
        </>);
    }

}

export default ViewOrganizationsList;