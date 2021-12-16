import React from 'react';
import '../../App.css';
import './Donations.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SERVER } from "../../constants"
import { getStandardRequestOptions } from "../../services/org"
import MakeDonationModal, { DeleteDonationModal } from './DonationModal';
import OrgInfoModal from './OrgInfoModal'
import { ContextGlobal } from '../../contexts'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class Donations extends React.PureComponent {
    static contextType = ContextGlobal

    constructor(props) {
        super(props);

        this.state = {
            allDonations: [],
            filteredDonations: [],
            showUserOrg: false,
            showOrg: false,
            showMakeDon: false,
            selectedDonID: null,
            selectedOrgID: null,
            showDelDon: false,
            loadingDons: false
        }

        this.search = React.createRef();
        this.getAllDonations = this.getAllDonations.bind(this)
        this.filterDons = this.filterDons.bind(this)
        this.setShowDelDon = this.setShowDelDon.bind(this)
        this.setShowMakeDon = this.setShowMakeDon.bind(this)
        this.setShowOrg = this.setShowOrg.bind(this)
        this.setShowUserOrg = this.setShowUserOrg.bind(this)
        this.handleOrgSelection = this.handleOrgSelection.bind(this)
    }

    componentDidMount(){
        this.getAllDonations()
    }

    async getAllDonations() {
        var response = await fetch(SERVER + "/api/listing/donations/", getStandardRequestOptions(this.context.token));
        var result = await response.json();
        if (response.ok) {
            this.setState({
                allDonations: result.donations,
                filteredDonations: result.donations
            });
        } else {
            console.log(result["message"]);
        }
    }
    
    filterDons(){
        let search = this.search.current.value.toLowerCase()
        let filtered_dons = []
        let dons = JSON.parse(JSON.stringify(this.state.allDonations)) // deep copy
        if(!search){
            this.setState({filteredDonations: dons})
        }
        for (const don of dons){
            if (don.description.toLowerCase().includes(search)){
                filtered_dons.push(don)
            }else{
                for(const trait of don.traits){
                    if (trait.toLowerCase().includes(search)) {
                        filtered_dons.push(don)
                    }
                }
            }
        }
        this.setState({filteredDonations: filtered_dons})
    }

    setShowMakeDon(val){
        this.setState({showMakeDon: val})
    }

    setShowDelDon(val){
        this.setState({showDelDon: val})
    }

    setShowUserOrg(val){
        console.log(val)
        this.setState({showUserOrg: val})
    }

    setShowOrg(val){
        this.setState({showOrg: val})
    }

    handleOrgSelection(orgID){
        this.setShowOrg(true) // show the org info modal
        this.setState({SelectedOrgID: orgID})
    }

    handleDelDonBtn(donID){
        this.setShowDelDon(true)
        this.setState({selectedDonID: donID})
    }

    // shows the users donations with option to close them
    getUserDonationCards(){
        let donList = this.state.filteredDonations;
        var donCards = [];

        for (var i = 0; i < donList.length; i++) {
            if (donList[i].organization_id !== this.props.orgID){
                continue //only add user's org
            }
            let donID = donList[i].donation_id
            let desc = donList[i].description
            let exp = new Date(donList[i].expiration_date).toLocaleString().split(',')[0]
            let picture_url = donList[i].picture
            let traits = donList[i].traits
            donCards.push(
                <Card key={i}>
                    <Card.Body>
                        <Container>
                            <Row className="list-body">
                                <Col>
                                    <Image src={picture_url} fluid/>
                                </Col>
                                <Col>
                                    <p>{desc}</p>
                                    <br></br>
                                    <p>Expiration Date: {exp}</p>
                                </Col>
                            </Row>
                            <Row>
                                <p>Tags: {traits.join(", ")}</p>
                                <Button 
                                    onClick={() => this.handleDelDonBtn(donID)}
                                    variant="customOrange">
                                    Close Listing
                                </Button>
                            </Row>
                        </Container>                            
                    </Card.Body>
                </Card>
            );
        }
        return donCards;
    }

    getDonationCards() {
        if(this.state.showUserOrg){
            return this.getUserDonationCards()
        }

        let donList = this.state.filteredDonations;
        var donCards = [];

        for (var i = 0; i < donList.length; i++) {
            let orgID = donList[i].organization_id
            let desc = donList[i].description
            let exp = new Date(donList[i].expiration_date).toLocaleString().split(',')[0]
            let picture_url = donList[i].picture
            let traits = donList[i].traits
            donCards.push(
                <Card key={i}>
                    <Card.Body>
                        <Container>
                            <Row className="list-body">
                                <Col>
                                    <Image src={picture_url} fluid/>
                                </Col>
                                <Col>
                                    <Button 
                                        onClick={() => this.handleOrgSelection(orgID)}
                                        variant="customOrange">
                                        Show Org Contact Info
                                    </Button>
                                    <p>{desc}</p>
                                    <p>Expiration Date: {exp}</p>
                                </Col>
                            </Row>
                            <Row>
                                <p>traits: {traits.join(", ")}</p>
                            </Row>
                        </Container>                            
                    </Card.Body>
                </Card>
            );
        }
        return donCards;
    }

    render() {
        return (
        <>
            <MakeDonationModal
                orgID= {this.props.orgID}
                show = {this.state.showMakeDon}
                setShow = {this.setShowMakeDon}
                updateDonations = {this.getAllDonations}
            />
            <DeleteDonationModal
                donationID = {this.state.selectedDonID}
                show = {this.state.showDelDon}
                setShow = {this.state.setShowDelDon}
                updateDonations = {this.getAllDonations}
            />
            <OrgInfoModal
                orgID = {this.state.selectedOrgID}
                show = {this.state.showOrg}
                setShow = {this.state.setShowOrg}
            />
            <Button 
                variant="customOrange"
                type="button"
                onClick={() => this.setShowMakeDon(true)}>
                Make a Donation
            </Button>
            <Card className="card-style">
                <Card.Body>
                    <h3>Search Donations</h3>
                    <Form>
                        <Form.Group
                            controlId="formSearchOrgList"
                            className="mb-3"
                            onChange={() => this.filterDons()}
                        >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                ref={this.search}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Show my Donations" />
                            <Form.Control
                                value = {this.state.showUserOrg}
                                onChange={(checked) => this.setShowUserOrg(checked)}
                            />
                        </Form.Group>
                    </Form>
                    <div className="don-list">
                        {this.getDonationCards()}
                    </div>
                </Card.Body>
            </Card>
        </>);
    }
}

export default Donations;