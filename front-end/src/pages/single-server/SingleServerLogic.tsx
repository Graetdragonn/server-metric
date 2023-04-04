import TrafficService from "../../requests/TrafficService";

/**
 * Get list of packets sent
 * @param address source address
 * @returns list of packets sent by address
 */
export async function getSentServerTraffic(address: string) {
    try {
        const res = await TrafficService.getAllTraffic();
        var allTrafficList = JSON.parse(res);
        var serverTraffic = [];
        for (let i = 0; i < allTrafficList.length; i++){
            var addr = allTrafficList[i]["srcIP"];
            allTrafficList[i].time = translateTime(allTrafficList[i]["time"]);
            if(addr === address){
                serverTraffic.push(allTrafficList[i]);
            }
        }
        return serverTraffic;
    }
    catch {
        return [];
    }
}

/**
 * Get list of packets received
 * @param address dst address
 * @returns list of packets received by address
 */
export async function getReceivedServerTraffic(address: string) {
    try {
        const res = await TrafficService.getAllTraffic();
        var allTrafficList = JSON.parse(res);
        var serverTraffic = [];
        for (let i = 0; i < allTrafficList.length; i++){
            var addr = allTrafficList[i]["dstIP"];
            allTrafficList[i].time = translateTime(allTrafficList[i]["time"]);
            if(addr === address){
                serverTraffic.push(allTrafficList[i]);
            }
        }
        return serverTraffic;
    }
    catch {
        return [];
    }
}

/**
 * Translate EPOCH UTC time to date
 * @param time UTC
 * @returns date
 */
export function translateTime(time: number){
    let d = new Date(time*1000);
    let month = d.getUTCMonth() + 1;
    let day = d.getUTCDate();
    let year = d.getUTCFullYear();
    let hour = d.getHours();
    let min = d.getUTCMinutes();
    let ms = d.getUTCMilliseconds();
    return {"month": month, "day": day, "year": year, "hour": hour, "min": min, "ms": ms};
}

export async function getPortTrafficForAServer(address: string) {
    const sentRes = await TrafficService.getMapOfPortsSentByAddress(address);
    const receivedRes = await TrafficService.getMapOfPortsReceivedByAddress(address);
    const sentMap = new Map(Object.entries(JSON.parse(sentRes)));
    const receivedMap = new Map(Object.entries(JSON.parse(receivedRes)));
    let sentPortsUsed = [] as any[];
    let receivedPortsUsed = [] as any[];

    // @ts-ignore
    for (let entry of sentMap.entries()) {
        sentPortsUsed.push({port: "Port: " + entry[0], numSent: entry[1] })
    }
    // @ts-ignore
    for (let entry of receivedMap.entries()) {
        receivedPortsUsed.push({port: "Port: " +  entry[0], numReceived: entry[1] })
    }

    return sentPortsUsed.map((item) => {
        const found = receivedPortsUsed.find((element) => item.port == element.port);
        return {...item, ...found};
    });
}

