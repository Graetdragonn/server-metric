import UserService from "../../requests/UserService";
import {Console} from "inspector";

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

export async function getClientServersByUser(email: string) {
    try {
        const res = await UserService.getUserByEmail(email);
        var json = JSON.parse(res);
        var clientEmailList= [] as any[];
        var serversList = [] as any[];
        var clientsAndServersList = [] as any[];
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

