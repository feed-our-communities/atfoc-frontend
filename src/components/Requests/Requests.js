import React from 'react';
import '../../App.css';
import './Requests.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SERVER } from "../../constants"
import { getStandardRequestOptions } from "../../services/org"
import {MakeRequestModal, DeleteRequestModal } from './RequestModal';
import OrgInfoModal from '../Donations/OrgInfoModal'
import { ContextGlobal } from '../../contexts'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Requests extends React.PureComponent {
    static contextType = ContextGlobal

    constructor(props) {
        super(props);

        this.state = {
            allRequests: [],
            filteredRequests: [],
            showUserOrg: false,
            showOrg: false,
            showMakeRequest: false,
            selectedRequestID: null,
            selectedOrgID: null,
            showDelRequest: false,
            loadingRequests: false
        }

        this.search = React.createRef();
        this.getAllRequests = this.getAllRequests.bind(this)
        this.filterRequests = this.filterRequests.bind(this)
        this.setShowDelRequest = this.setShowDelRequest.bind(this)
        this.setShowMakeRequest = this.setShowMakeRequest.bind(this)
        this.setShowOrg = this.setShowOrg.bind(this)
        this.setShowUserOrg = this.setShowUserOrg.bind(this)
        this.handleOrgSelection = this.handleOrgSelection.bind(this)
    }

    componentDidMount(){
        this.getAllRequests()
    }

    async getAllRequests() {
        var response = await fetch(SERVER + "/api/listing/requests/?status=active", getStandardRequestOptions(this.context.token));
        if (response.status == 200){
            var result = await response.json();
            this.setState({
                allRequests: result.requests,
                filteredRequests: result.requests
            });
        } else if (response.status == 204) {
            this.setState({
                allRequests: [],
                filteredRequests: [],
            });
        } else {
            console.log(result["message"]);
        }
    }
    
    filterRequests(){
        let search = this.search.current.value.toLowerCase()
        let filtered_requests = []
        let requests = JSON.parse(JSON.stringify(this.state.allRequests)) // deep copy
        if(!search){
            this.setState({filteredRequests: requests})
        }
        for (const req of requests){
            if (req.description.toLowerCase().includes(search)){
                filtered_requests.push(req)
            }
        }
        this.setState({filteredDonations: filtered_requests})
    }

    setShowMakeRequest(val){
        this.setState({showMakeRequest: val})
    }

    setShowDelRequest(val){
        this.setState({showDelRequest: val})
    }

    setShowUserOrg(val){
        this.setState({showUserOrg: val})
    }

    setShowOrg(val){
        this.setState({showOrg: val})
    }

    handleOrgSelection(orgID){
        this.setShowOrg(true) // show the org info modal
        this.setState({selectedOrgID: orgID})
    }

    handleDelDonBtn(reqID){
        this.setShowDelRequest(true)
        this.setState({selectedRequestID: reqID})
    }

    // shows the users donations with option to close them
    getUserRequestCards(){
        let reqList = this.state.filteredRequests;
        var reqCards = [];

        for (var i = 0; i < reqList.length; i++) {
            if (reqList[i].organization_id !== this.props.orgID){
                continue //only add user's org
            }
            let reqID = reqList[i].request_id
            let desc = reqList[i].description
            reqCards.push(
                <Card key={i}>
                    <Card.Body>
                        <Container>
                            <Row className="list-body">
                                <Col>
                                    <p>{desc}</p>
                                </Col>
                                <Col>
                                    <Button 
                                        onClick={() => this.handleDelDonBtn(reqID)}
                                        variant="customOrange">
                                        Close Listing
                                    </Button>
                                </Col>
                            </Row>
                        </Container>                            
                    </Card.Body>
                </Card>
            );
        }
        return reqCards;
    }

    getRequestCards() {
        if(this.state.showUserOrg){
            return this.getUserRequestCards()
        }

        let reqList = this.state.filteredRequests;
        var reqCards = [];

        for (var i = 0; i < reqList.length; i++) {
            if (reqList[i].organization_id === this.props.orgID){
                continue //only add user's org
            }
            let orgID = reqList[i].organization_id
            let desc = reqList[i].description
            reqCards.push(
                <Card key={i}>
                    <Card.Body>
                        <Container>
                            <Row className="list-body">
                            <Col><p>{desc}</p></Col>
                            <Col>
                                <Button 
                                    onClick={() => this.handleOrgSelection(orgID)}
                                    variant="customOrange">
                                    Show Org Contact Info
                                </Button>  
                            </Col>
                            </Row>
                        </Container>                            
                    </Card.Body>
                </Card>
            );
        }
        return reqCards;
    }

    render() {
        return (
        <>
            <MakeRequestModal
                orgID= {this.props.orgID}
                show = {this.state.showMakeRequest}
                setShow = {this.setShowMakeRequest}
                updateRequests = {this.getAllRequests}
            />
            <DeleteRequestModal
                donationID = {this.state.selectedRequestID}
                show = {this.state.showDelRequest}
                setShow = {this.setShowDelRequest}
                updateRequests = {this.getAllRequests}
            />
            <OrgInfoModal
                orgID = {this.state.selectedOrgID}
                show = {this.state.showOrg}
                setShow = {this.setShowOrg}
            />
            <Button 
                variant="customOrange"
                type="button"
                onClick={() => this.setShowMakeRequest(true)}>
                Make a Request
            </Button>
            <br></br>
            <br></br>
            <Card className="card-style-don">
                <Card.Body>
                    <h3>Search Requests</h3>
                    <Form>
                        <Form.Group
                            controlId="formSearchOrgList"
                            className="mb-3"
                            onChange={() => this.filterRequests()}
                        >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                ref={this.search}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 align-left" controlId="formBasicCheckbox" >
                            <Form.Check
                                inline
                                type="checkbox"
                                label="See my Requests"
                                onChange={event => this.setShowUserOrg(event.target.checked)}/>
                        </Form.Group>
                    </Form>
                    <div className="don-list">
                        {this.getRequestCards()}
                    </div>
                </Card.Body>
            </Card>
        </>);
    }
}

export default Requests;
