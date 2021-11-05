function getStandardRequestOptions(token){
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", token)

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
export async function getUserOrg(setOrgInfo, token) {
    
    let requestOptions = getStandardRequestOptions(token)
    let url = "org/info" //FIXME
    let orgInfo
    try {
        orgInfo = await (await fetch(url, requestOptions)).json();
    } catch (error) {
        console.log(error)
        return
    }
    setOrgInfo(orgInfo)
}

export async function getOrgList(setOrgList, token){
    let requestOptions = getStandardRequestOptions(token)
    let url = "org/info" //FIXME
    let orgList
    try {
        orgList = await (await fetch(url, requestOptions)).json();
    } catch (error) {
        console.log(error)
        return
    }
    setOrgList(orgList)
}

export async function joinOrgRequest(token){
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

export async function createOrg(token){
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


