import UserService from "../../requests/UserService";

/**
 * Sends JSON request to get all servers
 * 
 * Returns array of strings (server addresses)
 */
export async function getServersByUser(email: string) {
    try {
        const res = await UserService.getUserByEmail(email);
        var serverList = JSON.parse(res);
        var addressList = [] as string[];
        serverList['servers'].forEach((item: {address: string}) => { addressList.push(item['address']); });
        return addressList;
    }
    catch {
        return [];
    }
}

/**
 * Get list of client's servers
 * @param email user email
 * @returns a client's list of servers
 */
export async function getClientServersByUser(email: string) {
    try {
        const res = await UserService.getUserByEmail(email);
        const json = JSON.parse(res);
        const clientEmailList = [] as any[];
        const serversList = [] as any[];
        const clientsAndServersList = [] as any[];
        json['clients'].forEach((item: {username: string}) => {clientEmailList.push(item['username']); });
        for (let i = 0; i < clientEmailList.length; i++) {
           serversList.push(await getServersByUser(clientEmailList[i]));
           clientsAndServersList.push({username: clientEmailList[i], servers: serversList[i]})
        }
        return clientsAndServersList;
    }
    catch {
        return [];

    }
}

