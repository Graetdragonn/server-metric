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
        //alert(JSON.stringify(trafficList));
        var packetsPerIp = new Array();
        //alert(userAddresses);
        userAddresses.forEach((address: string) => {
            packetsPerIp.push({address: address, numPackets: 0});
        });

        //trafficList.forEach((item: getAllTrafficType) => { 
            //console.log(item["srcIP"]["address"]);
            // if (packetsPerIp.has(item["srcIP"]["address"])) {
            //     var num = packetsPerIp.get(item["srcIP"]["address"]) as number;
            //     packetsPerIp.set(item["srcIP"]["address"], num + 1); 
            // }
        //});
        for (let i = 0; i < trafficList.length; i++){
            var addr = trafficList[i]["srcIP"]["address"];
            let idx = packetsPerIp.findIndex(obj => obj.address == addr);
            if (idx != -1){
                packetsPerIp[idx].numPackets += 1;
            }
            //console.log(idx);
        }
        //console.log(packetsPerIp);
        return packetsPerIp;
    }
    catch {
        return new Array();
    }
}
