import React, { useEffect, useState, useContext} from 'react';
import './App.css';
import './Home.css';
import { getUserInfo } from './services/org'
import Tab from "react-bootstrap/Tab";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import MyOrg from './components/MyOrg/MyOrg';
import OrgApplications from './components/OrgApplications/OrgApplications';
import ExistingOrgs from './components/ExistingOrgs/ExistingOrgs';
import history from "./history";
import { COLORS } from "./constants";
import { ContextGlobal } from './contexts';
import Donations from './components/Donations/Donations';
import Requests from './components/Requests/Requests';

/**
 * Parent for the index/home page. 
 * TODO conditionally render donation and requests tabs based on user status
 * TODO see if loading view is necessary
 * 
 * @returns home view
 */
export default function Home() {
    const context = useContext(ContextGlobal)
    const [accountInfo, setUserInfo] = useState('')

    useEffect(() =>{
        // get user token
        // empty token evaluates to false
        if (!context.token) {
            let stored_token = localStorage.getItem('token')
            if(!stored_token){
                history.push('/login')
            }else{
                context.setToken(stored_token)
            }
        }
    }, [context])

    useEffect(() => {
        document.body.style.backgroundColor = COLORS.primary_white
        if(context.token){
            getUserInfo(setUserInfo, context.token)
        }
        // getOrgList(setOrgList, context.token)
    }, [context.token])

    // if(!accountInfo){
    //     return (<><h4>Loading...</h4></>)
    // }

    // render site admin view 
    // TODO get info about this api call
    let siteAdmin = accountInfo.is_site_admin;
    if (siteAdmin) {
        return (
            <>
                <Tab.Container id="left-tabs-siteAdmin" defaultActiveKey="ExistingOrgs">
                    <Row>
                        <Col sm={3} className="primaryOrangeBG" style={{textAlign: "center"}}>
                            <p style={{fontSize:"1.2em"}}>Welcome, {accountInfo.first} {accountInfo.last}</p>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item >
                                    <Nav.Link eventKey="ExistingOrgs">Existing Orgs</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="OrgApps">Org Applications</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button id="logoutButton" variant="customBottomBlue" type="button" onClick={function() {
                                context.setToken(undefined);
                                localStorage.removeItem('token');
                                history.push("/login");
                            }}> 
                                Logout
                            </Button>
                        </Col>

                        <Col sm={9} className = "content">
                            <Tab.Content>
                                <Tab.Pane eventKey="ExistingOrgs">
                                    <ExistingOrgs/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="OrgApps">
                                    <OrgApplications/>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
        );

    }

    // render view with no org
    if(!accountInfo.organization){
        return(
            <>
                <Tab.Container id="left-tabs-noOrg" defaultActiveKey="MyOrg">
                    <Row>
                        <Col sm={3} className="primaryOrangeBG" style={{textAlign: "center"}}>
                            <p style={{fontSize:"1.2em"}}>Welcome, {accountInfo.first} {accountInfo.last}</p>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item >
                                    <Nav.Link eventKey="MyOrg">Org Registration</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Button id="logoutButton" variant="customBottomBlue" type="button" onClick={function() {
                                context.setToken(undefined);
                                localStorage.removeItem('token');
                                history.push("/login");
                            }}> 
                                Logout
                            </Button>
                        </Col>

                        <Col sm={9} className = "content">
                            <Tab.Content>
                                <Tab.Pane eventKey="MyOrg">
                                <MyOrg
                                    accountInfo = {accountInfo}
                                />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
        )
    }

    return(
        <>
            <Tab.Container id="left-tabs" defaultActiveKey="MyOrg">
                <Row>
                    <Col sm={3} className="primaryOrangeBG" style={{textAlign: "center"}}>
                        <p style={{fontSize:"1.2em"}}>Welcome, {accountInfo.first} {accountInfo.last}</p>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link eventKey="MyOrg">MyOrg</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Donations">Donations</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Requests">Requests</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Button id="logoutButton" variant="customBottomBlue" type="button" onClick={function() {
                            context.setToken(undefined);
                            localStorage.removeItem('token'); 
                            history.push("/login");
                        }}> 
                            Logout
                        </Button>
                    </Col>

                    <Col sm={9} className = "content">
                        <Tab.Content>
                            <Tab.Pane eventKey="MyOrg">
                            <MyOrg
                                accountInfo = {accountInfo}
                            />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Donations">
                                <Donations
                                    orgID = {accountInfo.organization.id}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Requests">
                                <Requests
                                    orgID = {accountInfo.organization.id}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}
