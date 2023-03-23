import TrafficService from "../../requests/TrafficService";

/**
 * Gets all traffic and returns # of packets from each ip address
 * 
 * Returns a dictionary
 * key = ip address, value = # of packets sent
 */
export async function getNumPacketsSentPerAddressesClient(userAddresses: string[]) {
    try {

        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const packetsPerIp = [] as any[];
        userAddresses.forEach((address: string) => {
            packetsPerIp.push({ address: address, numPackets: 0 });
        });

        for (let i = 0; i < trafficList.length; i++) {
            const addr = trafficList[i]["srcIP"];
            let idx = packetsPerIp.findIndex(obj => obj.address == addr);
            if (idx != -1) {
                packetsPerIp[idx].numPackets += 1;
            }
        }
        return packetsPerIp;
    }
    catch {
        return [];
    }
}

/**
 * Gets all traffic and returns # of packets received by each ip address
 *
 * Returns a dictionary
 * key = ip address, value = # of packets received
 */
export async function getNumPacketsReceivedPerAddressesClient(userAddresses: string[]) {
    try {

        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const packetsPerIp = [] as any[];
        userAddresses.forEach((address: string) => {
            packetsPerIp.push({ address: address, numPackets: 0 });
        });

        for (let i = 0; i < trafficList.length; i++) {
            const addr = trafficList[i]["dstIP"];
            let idx = packetsPerIp.findIndex(obj => obj.address == addr);
            if (idx != -1) {
                packetsPerIp[idx].numPackets += 1;
            }
        }
        return packetsPerIp;
    }
    catch {
        return [];
    }
}

/**
 * Get number of packets sent per server
 * @param clientAndClientServers client and their servers
 * @returns list with servers and number of packets sent
 */
export async function getNumPacketsSentPerAddressesSP(clientAndClientServers: any[]) {
    try {
        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const clientAndServersAndPackets = [] as any[];

        for (let i = 0; i < clientAndClientServers.length; i++) {
            let packets = [] as number[];
            for (let j = 0; j < clientAndClientServers[i]["servers"].length; j++) {
                packets.push(0);
            }
            clientAndServersAndPackets.push({
                username: clientAndClientServers[i]["username"],
                servers: clientAndClientServers[i]["servers"],
                packets: packets
            })
        }

        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++) {

                for (let k = 0; k < trafficList.length; k++) {
                    const addr = trafficList[k]["srcIP"];
                    if (clientAndServersAndPackets[i]["servers"][j] == addr) {
                        clientAndServersAndPackets[i]["packets"][j] += 1;
                    }
                }
            }
        }

        var returnList = [] as any[]
        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++)
                returnList.push({ userAndAddress: clientAndServersAndPackets[i]["username"] + ": " + clientAndServersAndPackets[i]["servers"][j], numPackets: clientAndServersAndPackets[i]["packets"][j] })
        }
        return returnList;
    }
    catch {
        return [];
    }
}

/**
 * Get number of packets recieved per server
 * @param clientAndClientServers client and their servers
 * @returns list with servers and number of packets received
 */
export async function getNumPacketsReceivedPerAddressesSP(clientAndClientServers: any[]) {
    try {
        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const clientAndServersAndPackets = [] as any[];

        for (let i = 0; i < clientAndClientServers.length; i++) {
            let packets = [] as number[];
            for (let j = 0; j < clientAndClientServers[i]["servers"].length; j++) {
                packets.push(0);
            }
            clientAndServersAndPackets.push({
                username: clientAndClientServers[i]["username"],
                servers: clientAndClientServers[i]["servers"],
                packets: packets
            })
        }

        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++) {

                for (let k = 0; k < trafficList.length; k++) {
                    const addr = trafficList[k]["dstIP"];
                    if (clientAndServersAndPackets[i]["servers"][j] == addr) {
                        clientAndServersAndPackets[i]["packets"][j] += 1;
                    }
                }
            }
        }

        var returnList = [] as any[]
        for (let i = 0; i < clientAndServersAndPackets.length; i++) {
            for (let j = 0; j < clientAndServersAndPackets[i]["servers"].length; j++)
                returnList.push({ userAndAddress: clientAndServersAndPackets[i]["username"] + ": " + clientAndServersAndPackets[i]["servers"][j], numPackets: clientAndServersAndPackets[i]["packets"][j] })
        }
        return returnList;
    }
    catch {
        return [];
    }
}

/**
 * Get receiving ports for a server
 * @param address server address
 * @returns receiving ports
 */
export async function getReceivingPortsForAServer(address: string) {
    const res = await TrafficService.getMapOfPortsReceivedByAddress(address);
    const map = new Map(Object.entries(JSON.parse(res)));
    const portsUsed = [] as any[];

    // @ts-ignore
    for (let entry of map.entries()) {
        portsUsed.push({ ports: "Port: " + entry[0], numUsed: entry[1] })
    }
    return portsUsed;
}

/**
 * Get sent ports for a server
 * @param address server address
 * @returns sent ports
 */
export async function getSentPortsForAServer(address: string) {
    const res = await TrafficService.getMapOfPortsSentByAddress(address);
    const map = new Map(Object.entries(JSON.parse(res)));
    let portsUsed = [] as any[];

    // @ts-ignore
    for (let entry of map.entries()) {
        portsUsed.push({ ports: "Port: " + entry[0], numUsed: entry[1] })
    }
    return portsUsed;
}
