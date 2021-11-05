import React from 'react';
import { useEffect, useState } from 'react';
import {button} from 'react-bootstrap/Button'


function dispOrg(orgInfo){
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