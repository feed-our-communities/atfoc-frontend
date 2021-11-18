import { SERVER } from "../constants"

export function getStandardRequestOptions(token){
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Token " + token)

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }
    return requestOptions
}

/**
 * Gets the organization info associated with this user.
 */
export async function getUserOrg(setOrgInfo, token) {
    let requestOptions = getStandardRequestOptions(token)
    let url = SERVER + "/api/identity/info"
    let orgInfo
    let res
    try {
        res = await fetch(url, requestOptions)
        console.log(res)
        orgInfo = await res.json();
    } catch (error) {
        console.log(error)
        return
    }
    console.log(orgInfo)
    if(res.ok){
        setOrgInfo(orgInfo)
    }
}

export async function getOrgList(setOrgList, token){
    let requestOptions = getStandardRequestOptions(token)
    let url = SERVER + "/api/identity/org"
    let orgList;
    let res;
    try {
        res = await fetch(url, requestOptions)
        console.log(res);
        orgList = await res.json()
    } catch (error) {
        console.log(error)
        return
    }
    console.log(orgList)
    if(res.ok){
        setOrgList(orgList)
    }
}

export async function joinRequest(orgName, note){
    let requestOptions = getStandardRequestOptions()
    
    let raw = JSON.stringify({
        "Organization Name": orgName,
        "note": note
    });
    requestOptions.body = raw
    requestOptions.method = 'POST'

    let url = SERVER + "/api/identity/org"
    try {
        let res = await fetch(url, requestOptions)
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}