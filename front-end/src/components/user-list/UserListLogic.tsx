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
export async function getClientList(): Promise<any[]>{
    const res = await UserService.getUsers();
    var clientList = JSON.parse(res);
    var clients = new Array();
    
    for(let i = 0; i < clientList.length; i++){
        if(clientList[i]["userType"] === "CLIENT"){
            clients.push(clientList[i]);
        }
    }
    return clients;
}