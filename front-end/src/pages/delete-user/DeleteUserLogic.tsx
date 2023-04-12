import UserService from "../../requests/UserService";
import { getServiceProviderList } from "../add-user/AddUserLogic";

/**
 * Delete a user by email
 * @param email user email
 * @returns true on success, false otherwise
 */
export async function deleteUser(email: string) {
    await deleteUserServers(email);
    const res = await UserService.deleteUserByEmail(email);
    if(res === "ERROR"){
        return false;
    }
    else {
        return true;
    }
}

/**
 * Delete user's server list
 * @param email user email
 */
export async function deleteUserServers(email: string){
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    var password = userData['password'];
    var userType = userData['userType'];
    var firstName = userData['userFirstName'];
    var lastName = userData['userLastName'];
    var phone = userData['phoneNumber'];
    await UserService.updateUser(email, phone, firstName, lastName, password, userType, [])
}

/**
 * Get the service provider for a client
 * @param email user email (client)
 * @returns client's service provider
 */
export async function getClientServiceProvider(email: string) {
    const serviceProviders = await getServiceProviderList();
    for (let i = 0; i < serviceProviders.length; i++) {
        for (let j = 0; j < serviceProviders[i]["clients"].length; j++) {
            if (email === serviceProviders[i]["clients"][j]["username"]) {
                return serviceProviders[i]["username"];
            }
        }
    }
    return "";
}

/**
 * Delete a client from a service provider's list
 * @param serviceProvider service provider email
 * @param client client email
 * @returns error if fail
 */
export async function deleteServerProviderClientByEmail(serviceProvider: string, client: string) {
    const res = UserService.deleteServiceProviderClientByEmail(serviceProvider, client);
    return res;
}
