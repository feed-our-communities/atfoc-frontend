import React from 'react';
import '../../App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SERVER } from "../../constants"

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

    async callOrgListAPI() {

        var token = localStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Token " + token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        var response = await fetch(SERVER + "/api/identity/org/", requestOptions);
        var result = await response.json();

        if (response.status === 200) {

            this.setState({
                orgs: result
            });

        } else {
            alert(result["message"]);
        }

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