import UserService from "../../requests/UserService";

/**
 * Get list of all service providers
 * @returns list of all service providers
 */
export async function getServiceProviderList() {
    const res = await UserService.getUsers();
    var userList = JSON.parse(res);
    var serverProviders = new Array();
    
    for(let i = 0; i < userList.length; i++){
        if(userList[i]["userType"] === "SERVICE_PROVIDER"){
            serverProviders.push(userList[i]);
        }
    }
    return serverProviders;
}

/**
 * Adds a client to a server provider list
 * @param serviceProvider service provider email
 * @param client client email
 * @returns true on success, false otherwise
 */
export async function addClientToServerProvider(serviceProvider: string, client: string) {
    const res = await UserService.addServiceProviderClientByEmail(serviceProvider, client);
    if (res === "ERROR") {
        return false;
    }
    else {
        return true;
    }
}