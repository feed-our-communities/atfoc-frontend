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
    let url = SERVER + "/api/identity/info/"
    let orgInfo
    let res
    try {
        res = await fetch(url, requestOptions)
        orgInfo = await res.json();
    } catch (error) {
        console.log(error)
        return
    }
    if(res.ok){
        setOrgInfo(orgInfo)
    }
}

export async function getOrgList(setOrgList, token){
    let requestOptions = getStandardRequestOptions(token)
    let url = SERVER + "/api/identity/organization/"
    let orgList;
    let res;
    try {
        res = await fetch(url, requestOptions)
        orgList = await res.json()
    } catch (error) {
        console.log(error)
        return
    }
    if(res.ok){
        setOrgList(orgList)
    }
}

export async function joinRequest(orgID, note, token){
    let requestOptions = getStandardRequestOptions(token)
    let raw = JSON.stringify({
        "organization": orgID,
        "status": 0,
        "note": note
    });
    requestOptions.body = raw
    requestOptions.method = 'POST'

    let url = SERVER + "/api/identity/joinrequests/"
    try {
        let res = await fetch(url, requestOptions)
        console.log(res);
        if (res.ok) {
            alert("Application Submitted!")
        }
    } catch (error) {
        console.log(error)
    }
}