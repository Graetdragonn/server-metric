
import UserService from "../../requests/UserService";
import {getServersByUser} from "../../components/packet-per-ip-graph-sp/PacketPerIPSPLogic";
import {getUserByEmail} from "../../components/server-list/ServerListLogic";


function getSubnetFromFullAddress(fullAddress: string){
    var regExp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}/;
    return fullAddress.match(regExp)
}

/**
 * Sends JSON request to get all servers
 *
 * Returns array of strings (server addresses)
 */
export async function getSubnetServersByUser(email: string) {
    try {
        const res = await UserService.getUserByEmail(email);
        const serverList = JSON.parse(res);
        const addressList = [] as string[];
        serverList['servers'].forEach((item: {address: string}) => { addressList.push(item['address']); });
        let subnetServerList= [] as string[];
        for(let i = 0; i < addressList.length; i++){
            // @ts-ignore
            let str = getSubnetFromFullAddress(addressList[i]).toString()
            let isInArray = false
            for(let j = 0; j < subnetServerList.length; j++){
                if(subnetServerList[j] == str){
                    isInArray = true;
                }
            }
            if(!isInArray){
                subnetServerList.push(str)
            }

        }
        return subnetServerList;
    }
    catch {
        return [];
    }
}

async function getFullNameFromEmail(email: string) {
    const user = await getUserByEmail(email)
    return user.userFirstName + " " + user.userLastName

}

/**
 * Get list of client's servers
 * @param email user email
 * @returns a client's list of servers
 */
export async function getClientAndSubnetServersByUser(email: string) {

    try {
        let nameToAdd;
        const res = await UserService.getUserByEmail(email);
        const json = JSON.parse(res);
        const clientEmailList = [] as any[];
        const serversList = [] as any[];
        const clientsAndServersList = [] as any[];
        json['clients'].forEach((item: { username: string }) => {
            clientEmailList.push(item['username']);
        });
        const clientNameList = [] as any[];
        for (let i = 0; i < clientEmailList.length; i++) {
            nameToAdd = await getFullNameFromEmail(clientEmailList[i]);
            clientNameList.push(nameToAdd);
        }
        for (let i = 0; i < clientEmailList.length; i++) {
            serversList.push(await getSubnetServersByUser(clientEmailList[i]));
            clientsAndServersList.push({
                clientEmail: clientEmailList[i],
                clientName: clientNameList[i],
                subnets: serversList[i]
            })
        }
        return clientsAndServersList;

    } catch {
        return [];

    }
}



