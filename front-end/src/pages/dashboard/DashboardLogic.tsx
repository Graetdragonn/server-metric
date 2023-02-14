import TrafficService from "../../requests/TrafficService";

interface getAllTrafficType {
    "time": number;
    "dstIP": string;
    "srcPort": number;
    "dstPort": number;
    "srcIP": { 
        "address": string 
    };
}

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
        
        var packetsPerIp = new Map<string, number>();
        userAddresses.forEach((address: string) => {
            packetsPerIp.set(address, 0);
        });

        trafficList.forEach((item: getAllTrafficType) => { 
            if (packetsPerIp.has(item["srcIP"]["address"])) {
                var num = packetsPerIp.get(item["srcIP"]["address"]) as number;
                packetsPerIp.set(item["srcIP"]["address"], num + 1); 
            }
        });
        console.log(packetsPerIp);
        return packetsPerIp;
    }
    catch {
        return new Map<string, number>();
    }
}
