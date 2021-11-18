import React from 'react';
import '../../App.css';
import './JoinRequestModal.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { SERVER } from "../../constants"
import { getStandardRequestOptions } from "../../services/org"
import RequestModal from './RequestModal';
import ContextGlobal from '../../contexts'


class joinRequestModal extends React.PureComponent {
    static contextType = ContextGlobal

    constructor(props) {
        super(props);

        this.state = {
            orgs: [],
            filteredOrgs: [],
            orgSelection: {name: "", id: ""},
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
        var response = await fetch(SERVER + "/api/identity/organization", getStandardRequestOptions(this.context.token));
        var result = await response.json();

        if (response.ok) {
            this.setState({
                orgs: result
            });
        } else {
            console.log(result["message"]);
        }
    }
    
    filterOrgs(){
        let search = this.search.current.toLowerCase()
        let new_orgs = []
        if(!search){
            return
        }
        let orgs = JSON.parse(JSON.stringify(this.state.orgs)) // deep copy
        for (const org of orgs){
            if (org['Organization name'].toLowerCase().includes(search)){
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
        let orgList = this.state.orgs;

        var orgCards = [];

        for (var i = 0; i < orgList.length; i++) {
            let orgName = orgList[i]["Organization name"]
            let orgID = orgList[i]["Organization Id"]
            orgCards.push(
                <Card>
                    <Card.Body>
                        <span style={{display: "inline"}}>
                            <p>{orgName}</p>
                            <p> ({orgID}) </p>
                            {/* TODO Does this acually pass the current org to each function? */}
                            <Button onClick={() => this.handleOrgSelection(orgName, orgID)}>
                                Join
                            </Button>
                        </span>
                    </Card.Body>
                </Card>);
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
                        <div className="org-list">
                            {this.getOrganizationCards}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>);
    }
}

export default joinRequestModal;