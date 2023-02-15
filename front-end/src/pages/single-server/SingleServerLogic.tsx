import TrafficService from "../../requests/TrafficService";

export async function getServerTraffic(address: string) {
    try {
        const res = await TrafficService.getAllTraffic();
        var allTrafficList = JSON.parse(res);
        var serverTraffic = new Array();
        for (let i = 0; i < allTrafficList.length; i++){
            var addr = allTrafficList[i]["srcIP"]["address"];
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

export function translateTime(time: number){
    let d = new Date(time);
    let month = d.getUTCMonth() + 1;
    let day = d.getUTCDate();
    let year = d.getFullYear();
    let hour = d.getHours();
    let min = d.getUTCMinutes();
    var result = {"month": month, "day": day, "year": year, "hour": hour, "min": min};
    return result;
}
