import { SERVER } from "../constants"
import history from "../history"

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
export async function getUserInfo(setUserInfo, token) {
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
        setUserInfo(orgInfo)
    } else if (res.status === 401) {
        // invalid token
        history.push('/login')
    }
}

export async function getOrg(orgID, setOrgInfo, token) {
    var response = await fetch(SERVER + "/api/identity/organization/" + orgID +"/", getStandardRequestOptions(token));
    var result = await response.json();
    if (response.ok) {
      setOrgInfo(result)
    } else {
        console.log(result["message"]);
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

export async function getjoinRequests(setRequests, token){
    let requestOptions = getStandardRequestOptions(token)

    let url = SERVER + "/api/identity/joinrequests/"
    try {
        let res = await fetch(url, requestOptions)
        console.log(res);
        if (res.ok) {
            // TODO set requests
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getApplications(orgID, note, token){
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

export async function deleteDonation(donationID, token){
    let requestOptions = getStandardRequestOptions(token)
    let raw = JSON.stringify({
        "donation_id": donationID,
    });
    requestOptions.body = raw
    requestOptions.method = 'DELETE'

    let url = SERVER + "/api/listing/donations/"
    let res
    try {
        res = await fetch(url, requestOptions)
        if (res.ok) {
            alert("listing closed")
        }
    } catch (error) {
        alert(res.message)
        console.log(error)
    }
}

export async function makeDonation(body, token){
    let requestOptions = getStandardRequestOptions(token)
    requestOptions.body = JSON.stringify(body);
    requestOptions.method = 'POST'

    let url = SERVER + "/api/listing/donations/"
    let res
    try {
        res = await fetch(url, requestOptions)
        if (res.ok) {
            alert("listing created")
        }
    } catch (error) {
        alert(res.message)
        console.log(error)
    }
}