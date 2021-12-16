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
            SelectedOrgID: null,
            showDelDon: false,
            loadingDons: false
        }

        this.search = React.createRef();
        this.applicationText = React.createRef();
        this.callOrgListAPI = this.callOrgListAPI.bind(this);
        this.getOrganizationCards = this.getDonationCards.bind(this);
        this.setShow = this.setShowMakeDon.bind(this);
    }

    componentDidMount(){
        this.getAllDonations()
    }

    componentDidUpdate(){

    }

    // radio button for viewing your donations
    // if active only show org, otherwise dont show

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




    // async getOrgDonations() {
    //     var response = await fetch(SERVER + "/api/listing/donations/?org_id=" + this.props.orgID, getStandardRequestOptions(this.context.token));
    //     var result = await response.json();
    //     if (response.ok) {
    //         this.setState({
    //             donations: result.donations,
    //             filteredDonations: result.donations
    //         });
    //     } else {
    //         console.log(result["message"]);
    //     }
    // }
    
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

    // shows the users donations with option to close them
    getUserDonations(){
        let donList = this.state.filteredDonations;
        var donCards = [];

        return donList
    }

    getDonationCards() {
        if(this.state.showUserOrg){
            return this.getUserDonations()
        }

        let donList = this.state.filteredDonations;
        var donCards = [];

        for (var i = 0; i < donList.length; i++) {
            let orgName = donList[i].name
            let orgID = donList[i].id
            donCards.push(
                <Card key={i}>
                    <Card.Body>
                        <Container >
                            <Row className="list-body">
                            <Col>
                                <Button 
                                    onClick={() => this.handleOrgSelection(orgID)}
                                    variant="customOrange">
                                    Show Org Contact Info
                                </Button>
                                </Col>
                            </Row>
                            <Row className="list-body">
                                <Col><p>{orgName}</p></Col>
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
                org= {this.props.org}
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
                org = {this.state.selectedDonID}
                show = {this.state.showOrg}
                setShow = {this.state.setShowOrg}
            />
            <Card className="card-style">
                <Card.Body>
                    <h3>Search Donations</h3>
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
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Show my Donations" />
                            <Form.Control
                                value = {this.state.showUserOrg}
                                onChange={(val) => {this.setShowUserOrg()}}
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