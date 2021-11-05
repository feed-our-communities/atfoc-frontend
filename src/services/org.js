import { SERVER } from "../constants"

function getStandardRequestOptions(token){
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", "Token " + token)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }
    return requestOptions
}

/**
 * Gets the organization info associated with this user.
 * Makes sure user has a token
 */
export async function getUserOrg(setOrgInfo) {
    let token = localStorage.getItem('token')
    let requestOptions = getStandardRequestOptions(token)
    let url = SERVER + "/api/identity/info"
    let orgInfo
    try {
        let res = await fetch(url, requestOptions)
        console.log(res)
        orgInfo = await res.json();
    } catch (error) {
        console.log(error)
        return
    }
    console.log(orgInfo)
    setOrgInfo(orgInfo)
}

export async function getOrgList(setOrgList){
    let token = localStorage.getItem('token')
    let requestOptions = getStandardRequestOptions(token)
    let url = SERVER + "/api/identity/org"
    let orgList;
    try {
        let res = await fetch(url, requestOptions)
        console.log(res);
        orgList = await res.json()
    } catch (error) {
        console.log(error)
        return
    }
    console.log(orgList)
    setOrgList(orgList)
}

export async function joinOrgRequest(){
    let token = localStorage.getItem('token')
    let requestOptions = getStandardRequestOptions(token)
    requestOptions.method = 'POST'
    let url = "org/info"; //FIXME
    let ret
    try {
        ret = await (await fetch(url, requestOptions)).json()
    } catch (error) {
        console.log(error);
        return
    }
    // TODO error handling
}

export async function createOrg(){
    let token = localStorage.getItem('token')
    let requestOptions = getStandardRequestOptions(token)
    requestOptions.method = 'POST'
    let url = "org/info" //FIXME

    let ret
    try {
        ret = await (await fetch(url, requestOptions)).json()
    } catch (error) {
        console.log(error);
        return
    }
    // TODO error handling
}


