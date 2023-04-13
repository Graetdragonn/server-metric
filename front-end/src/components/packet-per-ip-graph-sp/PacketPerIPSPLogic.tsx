import UserService from "../../requests/UserService";
import TrafficService from "../../requests/TrafficService";

function getSubnetFromFullAddress(fullAddress: string){
    var regExp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}/;
    // @ts-ignore
    return fullAddress.match(regExp).toString()
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

/**
 * Get number of packets sent and received per server
 * @param clientAndClientServers client and their servers
 * @param clientName
 * @param subnetAddress
 * @returns list with servers and number of packets sent/received
 */
export async function getNumPacketsSentAndReceivedSP(clientAndClientServers: any[], clientName: string, subnetAddress:string) {
    try {
        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const clientAndServersAndPackets = [] as any[];

        for (let i = 0; i < clientAndClientServers.length; i++) {
            let sentPackets = [] as number[];
            let receivedPackets = [] as number[];
            for (let j = 0; j < clientAndClientServers[i]["servers"].length; j++) {
                sentPackets.push(0);
                receivedPackets.push(0)
            }
            clientAndServersAndPackets.push({
                username: clientAndClientServers[i]["username"],
                servers: clientAndClientServers[i]["servers"],
                sentPackets: sentPackets,
                receivedPackets: receivedPackets
            })
        }

        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++) {

                for (let k = 0; k < trafficList.length; k++) {
                    const receivedAddr = trafficList[k]["dstIP"];
                    const sentAddr = trafficList[k]["srcIP"];
                    if (clientAndServersAndPackets[i]["servers"][j] === sentAddr) {
                        clientAndServersAndPackets[i]["sentPackets"][j] += 1;
                    }
                    if (clientAndServersAndPackets[i]["servers"][j] === receivedAddr) {
                        clientAndServersAndPackets[i]["receivedPackets"][j] += 1;
                    }
                }
            }
        }

        const returnList = [] as any[];
        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++)
                if(clientAndServersAndPackets[i]["username"] == clientName){
                    if(getSubnetFromFullAddress(clientAndServersAndPackets[i]["servers"][j]) == subnetAddress){
                        returnList.push({ address: clientAndServersAndPackets[i]["servers"][j], sentPackets: clientAndServersAndPackets[i]["sentPackets"][j], receivedPackets: clientAndServersAndPackets[i]["receivedPackets"][j]})
                    }
                }
        }

        return returnList;


    }
    catch {
        return [];
    }
}

/**
 * Sends JSON request to get all servers
 *
 * Returns array of strings (server addresses)
 */
export async function getServersByUser(email: string) {
    try {
        const res = await UserService.getUserByEmail(email);
        const serverList = JSON.parse(res);
        const addressList = [] as string[];
        serverList['servers'].forEach((item: {address: string}) => { addressList.push(item['address']); });
        return addressList;
    }
    catch {
        return [];
    }
}
