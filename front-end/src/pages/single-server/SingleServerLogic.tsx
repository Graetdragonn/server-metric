import TrafficService from "../../requests/TrafficService";

/**
 * Get list of packets sent
 * @param address source address
 * @returns list of packets sent by address
 */
export async function getServerTraffic(address: string) {
    try {
        const res = await TrafficService.getAllTraffic();
        var allTrafficList = JSON.parse(res);
        var serverTraffic = new Array();
        for (let i = 0; i < allTrafficList.length; i++){
            var addr = allTrafficList[i]["srcIP"];
            let t = translateTime(allTrafficList[i]["time"]);
            allTrafficList[i].time = t;
            if(addr === address){
                serverTraffic.push(allTrafficList[i]);
            }
        }
        return serverTraffic;
    }
    catch {
        return new Array();
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
    var result = {"month": month, "day": day, "year": year, "hour": hour, "min": min, "ms": ms};
    return result;
}
