import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { getOrgList, getUserOrg } from './services/org'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MyOrg from './components/MyOrg';
import history from "../history";

/**
 * Parent for the index/home page. 
 * TODO conditionally render donation and requests tabs based on user status
 * TODO see if loading view is necessary
 * 
 * @returns home view
 */
export default function Home() {
    let token = localStorage.getItem("token")
    // make sure user is logged in, else send to login
    if (!token) {
        history.push("/login")
    }

    const [orgInfo, setOrgInfo] = useState([])
    // const [isLoading, setLoading] = useState(false)
    const [orgList, setOrgList] = useState([])

    useEffect(() => {
        // setLoading(true)
        getUserOrg(setOrgInfo, token)
        getOrgList(setOrgList, token)
    }, [orgInfo, orgList, token])

    // if (isLoading) {
    //     return <p>Loading ...</p>
    // }

    return (
        <>
            <Tabs
            defaultActiveKey="myOrg"
            style={{
                position: "fixed",
                zIndex: 1,
                width: "100%",
                backgroundColor: "white",
            }}
            >
                <Tab eventKey="myOrg" title="My Org" style={{ paddingTop: "5vh" }}>
                    <MyOrg 
                        orgInfo = {orgInfo}  
                    />
                </Tab>

                <Tab eventKey="donations" title="donations" style={{ paddingTop: "5vh" }}>
                </Tab>

                <Tab eventKey="requests" title="requests" style={{ paddingTop: "5vh" }}>
                </Tab>
            </Tabs>
        </>
    );
}

