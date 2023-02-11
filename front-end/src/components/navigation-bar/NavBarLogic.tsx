import ServerService from "../../requests/ServerService";

/**
 * Sends JSON request to get all servers
 * 
 * Returns array of strings (server addresses)
 */
export async function getListOfServers() {
    try {
        const res = await ServerService.getAllServers();
        var serverList = JSON.parse(res);
        var addressList = [] as string[];
        serverList.forEach((item: {address: string}) => { addressList.push(item['address']); });
        return addressList;
    }
    catch {
        return [];
    }
}