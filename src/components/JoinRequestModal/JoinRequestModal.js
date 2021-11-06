import React from 'react';
import '../../App.css';
import './JoinRequestModal.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SERVER } from "../../constants"
import { getStandardRequestOptions } from "../../services/org"
import RequestModal from './RequestModal';


class joinRequestModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            orgs: [],
            orgSelection: "",
            show: false
        }

        this.search = React.createRef();
        this.applicationText = React.createRef();
        this.callOrgListAPI = this.callOrgListAPI.bind(this);
        this.getOrganizationCards = this.getOrganizationCards.bind(this);
        this.setShow = this.setShow.bind(this);
    }

    componentDidMount(){
        this.callOrgListAPI()
    }

    async callOrgListAPI() {
        var response = await fetch(SERVER + "/api/identity/organization", getStandardRequestOptions());
        var result = await response.json();

        if (response.status === 200) {
            this.setState({
                orgs: result
            });
        } else {
            console.log(result["message"]);
        }
    }

    setShow(val){
        this.setState({show: val})
    }

    handleOrgSelection(orgName){
        // TODO validation
        this.setShow(false)
        this.setState({orgSelection: orgName})
    }

    getOrganizationCards() {
        let orgList = this.state.orgs;

        var orgCards = [];

        for (var i = 0; i < orgList.length; i++) {
            let orgName = orgList[i]["Organization name"]
            orgCards.push(
                <Card>
                    <Card.Body>
                        <p>{orgList[i]["Organization Id"]}</p>
                        <p>{orgName}</p>
                        {/* Does this acually pass the current org to each function? */}
                        <Button onClick={() => this.handleOrgSelection(orgName)}>
                            apply
                        </Button>
                    </Card.Body>
                </Card>);
        }
        return orgCards;
    }

    render() {
        return (
        <>
            <RequestModal 
                orgName= {this.state.orgSelection}
                show = {this.state.show}
                setShow = {this.setShow}
            />
            <Card className="card-style">
                <Card.Body>
                    <h3>Search Existing Orgs</h3>
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

export default joinRequestModal;