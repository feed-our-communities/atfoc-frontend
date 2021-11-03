import React from 'react';
import { useEffect, useState } from 'react';
import {button} from 'react-bootstrap/Button'


function dispOrg(orgInfo){
    return false
}

function noOrg(){
    return(
        <>
            <h1>You are not part of an organization yet</h1>
        </>
    )
}

function isInOrg(orgInfo){
    // TODO check if user is in an organization
    if(!orgInfo){
        dispOrg(orgInfo)
    }

    return false
}


export default function MyOrg({orgInfo}){


    return(
        <>
            isInOrg(orgInfo)
        </>
    )
}