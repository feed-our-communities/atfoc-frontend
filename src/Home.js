import React, { useEffect, useState, useContext} from 'react';
import './App.css';
import './Home.css';
import { getOrgList, getUserOrg } from './services/org'
import Tab from "react-bootstrap/Tab";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import MyOrg from './components/MyOrg/MyOrg';
import history from "./history";
import { COLORS } from "./constants";
import { ContextGlobal } from './contexts';

/**
 * Parent for the index/home page. 
 * TODO conditionally render donation and requests tabs based on user status
 * TODO see if loading view is necessary
 * 
 * @returns home view
 */
export default function Home() {
    const context = useContext(ContextGlobal)
    // get user token
    // empty token evaluates to false
    if (!context.token) {
        let token = localStorage.getItem('token')
        if(!token){
            history.push('/login')
        }else{
            // TODO consider validating token
            context.setToken(token)
        }
    }

    const [accountInfo, setOrgInfo] = useState({'':''})
    const [orgList, setOrgList] = useState([])

    useEffect(() => {
        document.body.style.backgroundColor = COLORS.primary_white

        getUserOrg(setOrgInfo, context.token)
        getOrgList(setOrgList, context.token)
    }, [context.token])

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
                            orgInfo = {accountInfo.org}
                            orgList = {orgList}
                        />
                        </Tab.Pane>
                        <Tab.Pane eventKey="Donations">
                        <h1>Donations component here</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Requests">
                        <h1>Requests component here</h1>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

function logoutHelper() {

   

    //navigate and clear token 

}
