import TrafficService from "../../requests/TrafficService";
import UserService from "../../requests/UserService";

export async function getNumPacketsSentAndReceivedClient(userAddresses: string[]){
    try{
        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const packetsPerIp = [] as any[];
        userAddresses.forEach((address: string) => {
            packetsPerIp.push({ address: address, numPacketsSent: 0, numPacketsReceived: 0 });
        });

        for (let i = 0; i < trafficList.length; i++) {
            const addrRec = trafficList[i]["dstIP"];
            const addrSnt = trafficList[i]["srcIP"];
            let idxRec = packetsPerIp.findIndex(obj => obj.address === addrRec);
            if (idxRec !== -1) {
                packetsPerIp[idxRec].numPacketsReceived += 1;
            }
            let idxSnt = packetsPerIp.findIndex(obj => obj.address === addrSnt);
            if (idxSnt !== -1) {
                packetsPerIp[idxSnt].numPacketsSent += 1;
            }
        }
        return packetsPerIp;
    }
    catch {
        return [];
    }


}

/**
 * Get number of packets sent and received per server
 * @param clientAndClientServers client and their servers
 * @returns list with servers and number of packets sent/received
 */
export async function getNumPacketsSentAndReceivedSP(clientAndClientServers: any[]) {
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

        var returnList = [] as any[]
        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++)
                returnList.push({ userAndAddress: clientAndServersAndPackets[i]["username"] + ": " + clientAndServersAndPackets[i]["servers"][j], sentPackets: clientAndServersAndPackets[i]["sentPackets"][j], receivedPackets: clientAndServersAndPackets[i]["receivedPackets"][j]})
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
