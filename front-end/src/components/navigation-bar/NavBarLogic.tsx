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