import TrafficService from "../../requests/TrafficService";

/**
 * Gets all traffic and returns # of packets from each ip address
 * 
 * Returns a dictionary
 * key = ip address, value = # of packets sent
 */
export async function getNumPacketsSentPerAddresses(userAddresses: string[]) {
    try {
       
        const res = await TrafficService.getAllTraffic();
        var trafficList = JSON.parse(res);
        var packetsPerIp = new Array();
        userAddresses.forEach((address: string) => {
            packetsPerIp.push({address: address, numPackets: 0});
        });

        for (let i = 0; i < trafficList.length; i++){
            var addr = trafficList[i]["srcIP"];
            let idx = packetsPerIp.findIndex(obj => obj.address == addr);
            if (idx != -1){
                packetsPerIp[idx].numPackets += 1;
            }
        }
        return packetsPerIp;
    }
    catch {
        return new Array();
    }
}

/**
 * Gets all traffic and returns # of packets received by each ip address
 *
 * Returns a dictionary
 * key = ip address, value = # of packets received
 */
export async function getNumPacketsReceivedPerAddresses(userAddresses: string[]) {
    try {

        const res = await TrafficService.getAllTraffic();
        var trafficList = JSON.parse(res);
        var packetsPerIp = new Array();
        userAddresses.forEach((address: string) => {
            packetsPerIp.push({address: address, numPackets: 0});
        });

        for (let i = 0; i < trafficList.length; i++){
            var addr = trafficList[i]["dstIP"];
            let idx = packetsPerIp.findIndex(obj => obj.address == addr);
            if (idx != -1){
                packetsPerIp[idx].numPackets += 1;
            }
        }
        return packetsPerIp;
    }
    catch {
        return new Array();
    }
}