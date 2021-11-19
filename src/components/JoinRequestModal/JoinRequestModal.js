import React from 'react';
import '../../App.css';
import './JoinRequestModal.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SERVER } from "../../constants"
import { getStandardRequestOptions } from "../../services/org"
import RequestModal from './RequestModal';
import { ContextGlobal } from '../../contexts'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class joinRequestModal extends React.PureComponent {
    static contextType = ContextGlobal

    constructor(props) {
        super(props);

        this.state = {
            orgs: [],
            filteredOrgs: [],
            orgSelection: {},
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
        var response = await fetch(SERVER + "/api/identity/organization/", getStandardRequestOptions(this.context.token));
        var result = await response.json();
        if (response.ok) {
            this.setState({
                orgs: result,
                filteredOrgs: result
            });
        } else {
            console.log(result["message"]);
        }
    }
    
    filterOrgs(){
        let search = this.search.current.value.toLowerCase()
        let new_orgs = []
        if(!search){
            this.setState({filteredOrgs: this.state.orgs})
        }
        let orgs = JSON.parse(JSON.stringify(this.state.orgs)) // deep copy
        for (const org of orgs){
            if (org.name.toLowerCase().includes(search)){
                new_orgs.push(org)
            }
        }
        this.setState({filteredOrgs: new_orgs})
    }

    setShow(val){
        this.setState({show: val})
    }

    handleOrgSelection(orgName,orgID){
        let org = {name: orgName, id: orgID}
        // TODO validation
        this.setShow(true) // show the join request form
        this.setState({orgSelection: org})
    }

    getOrganizationCards() {
        let orgList = this.state.filteredOrgs;

        var orgCards = [];

        for (var i = 0; i < orgList.length; i++) {
            let orgName = orgList[i].name
            let orgID = orgList[i].id
            orgCards.push(
                <Card>
                    <Card.Body>
                        <Container >
                            <Row className="list-body">
                                <Col><p>{orgName}</p></Col>
                                <Col>
                                    <Button 
                                        onClick={() => this.handleOrgSelection(orgName, orgID)}
                                        variant="customOrange">
                                        Join
                                    </Button>
                                </Col>
                            </Row>
                        </Container>                            
                    </Card.Body>
                </Card>
            );
        }
        return orgCards;
    }

    render() {
        return (
        <>
            <RequestModal 
                org= {this.state.orgSelection}
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
                            onChange={() => this.filterOrgs()}
                        >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                ref={this.search}
                            />
                        </Form.Group>
                    </Form>
                    <div className="org-list">
                        {this.getOrganizationCards()}
                    </div>
                </Card.Body>
            </Card>
        </>);
    }
}

export default joinRequestModal;