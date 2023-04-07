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