import React from 'react';
import "./MyOrg.css";
import { useEffect, useState } from 'react';
import OrgRegistration from '../OrgRegistration/OrgRegistration';
import JoinRequestModal from '../JoinRequestModal/JoinRequestModal';


function dispOrg(orgInfo){
    //TODO pull out org info
    return(
        <>
            <h1>{orgInfo}</h1>
        </>
    )
}

function noOrg(){
    return(
        <>
            <h1>You are not part of an organization yet</h1>
            <div className="pad">
                <OrgRegistration />
            </div>
            <JoinRequestModal/>
        </>
    )
}

function isInOrg(orgInfo){
    if(!orgInfo){
        return noOrg()
    }
    return dispOrg(orgInfo)
}

export default function MyOrg({userInfo, orgInfo, orgList}){
    console.log("heheheh", {userInfo});
    return(
        <>
            {isInOrg(orgInfo)}
        </>
    )
}