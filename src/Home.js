import React from 'react';
import './App.css';
import './Home.css';
import { useEffect, useState } from 'react';
import { getOrgList, getUserOrg } from './services/org'
import Tab from "react-bootstrap/Tab";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav'
import MyOrg from './components/MyOrg/MyOrg';
import history from "./history";

/**
 * Parent for the index/home page. 
 * TODO conditionally render donation and requests tabs based on user status
 * TODO see if loading view is necessary
 * 
 * @returns home view
 */
export default function Home() {
    
    let token = localStorage.getItem('token')
    const [orgInfo, setOrgInfo] = useState([])
    const [orgList, setOrgList] = useState([])
    // const [isLoading, setLoading] = useState(false)
    
    // make sure user is logged in, else send to login
    if (!token) {
        history.push('/login')
    }

    useEffect(() => {
        // setLoading(true)
        getUserOrg(setOrgInfo, token)
        getOrgList(setOrgList, token)
    }, [orgInfo, orgList, token])

    // if (isLoading) {
    //     return <p>Loading ...</p>
    // }

    return(
        <>
            <Tab.Container id="left-tabs" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="tabs" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="MyOrg">MyOrg</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Donations">Donations</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Requests">Requests</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="MyOrg">
                        <MyOrg/>
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

