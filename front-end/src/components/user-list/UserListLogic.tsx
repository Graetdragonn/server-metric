import { getClientServiceProvider } from "../../pages/delete-user/DeleteUserLogic";
import UserService from "../../requests/UserService";

/**
 * Get all users in database
 * @returns array of all users
 */
export async function getAllUsers(){
    var res = await UserService.getUsers();
    return JSON.parse(res);
}

/**
 * Get user data from email
 * @param email user email
 * @returns user data
 */
export async function getUserInfo(email: string) {
    const userInfo = await UserService.getUserByEmail(email);
    var userData = JSON.parse(userInfo);
    return userData;
}

/**
 * Get all clients
 * @returns list of all clients
 */
export async function getClientList(): Promise<any[]> {
    const res = await UserService.getUsers();
    var clientList = JSON.parse(res);
    var clients = new Array();

    for (let i = 0; i < clientList.length; i++) {
        if (clientList[i]["userType"] === "CLIENT") {
            clients.push(clientList[i]);
        }
    }
    return await getServiceProviders(clients);
}

/**
 * Get service providers for clients
 * @param clients list of clients
 * @returns list of clients with their service provider
 */
export async function getServiceProviders(clients: any[]) {
    var res = new Array();
    for (let i = 0; i < clients.length; i++) {
        var sp = await getClientServiceProvider(clients[i]["username"]);
        res.push({client: clients[i], serviceProvider: sp});
    }
    return res;
}