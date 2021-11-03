function getStandardRequestOptions(token){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return requestOptions
}


/**
 * Gets the organization info associated with this user.
 * Makes sure user has a token
 */
export async function getUserOrg(setOrgInfo, token) {
    let requestOptions = getStandardRequestOptions(token)
    let url = "org/info"; //FIXME
    let orgInfo = await (await fetch(url, requestOptions)).json();
    setOrgInfo(orgInfo)
}

export async function getOrgList(setOrgList, token){
    let requestOptions = getStandardRequestOptions(token)
    let url = "org/info"; //FIXME
    let orgList = await (await fetch(url, requestOptions)).json();
    setOrgList(orgList)
}

export async function joinOrgRequest(token){
    let requestOptions = getStandardRequestOptions(token)
    requestOptions.method = 'POST'
    let url = "org/info"; //FIXME
    let ret = await (await fetch(url, requestOptions)).json();
    // TODO error handling
}

export async function createOrg(token){
    let requestOptions = getStandardRequestOptions(token)
    requestOptions.method = 'POST'
    let url = "org/info"; //FIXME
    let ret = await (await fetch(url, requestOptions)).json();
    // TODO error handling

}


