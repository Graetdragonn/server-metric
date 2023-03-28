import UserService from "../../requests/UserService";

/**
 * Get list of all clients
 * @returns list of all clients
 */
export async function getClientList() {
    const res = await UserService.getUsers();
    var userList = JSON.parse(res);
    var clients = [] as any[];
    
    for(let i = 0; i < userList.length; i++){
        if(userList[i]["userType"] === "CLIENT"){
            clients.push(userList[i]);
        }
    }
    return clients;
}
