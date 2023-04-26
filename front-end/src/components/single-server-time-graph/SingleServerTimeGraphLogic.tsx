import React from 'react';
import TrafficService from "../../requests/TrafficService";


export async function getPacketsSentAndReceived(server: string) {
        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const timesAndPackets = [] as any[];
        const output = [] as any[];

        for(let i = 0; i < 24; i++){
            timesAndPackets.push({time: i, sentCount: 0, receivedCount: 0})
        }


        for (let i = 0; i < trafficList.length; i++) {
            const receivedAddr = trafficList[i]["dstIP"];
            const sentAddr = trafficList[i]["srcIP"];
            let time = convertTimeToHr(trafficList[i]["time"])

            if (server === sentAddr ) {
                if(checkCurrentDate(trafficList[i]["time"])){
                    timesAndPackets[time].sentCount++
                }

            }

            if (server === receivedAddr) {
                if(checkCurrentDate(trafficList[i]["time"])){
                    timesAndPackets[time].receivedCount++
                }

            }

        }

    var times =["0.00", "1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00",
        "10:00","11:00","12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

        for(let i = 0; i < timesAndPackets.length; i++){
            output.push({time: times[i], sentCount: timesAndPackets[i].sentCount, receivedCount: timesAndPackets[i].receivedCount })
        }
        return output;
}

/**
 * Function to convert unix timestamp into time format.
 * @param unixTime
 * @returns time
 */
function convertTimeToHr(unixTime: number){
    let time = new Date(unixTime * 1000);
    return time.getHours();
}

function checkCurrentDate(unixTime: number){
    let currentDate = new Date()
    let packetDate = new Date(unixTime * 1000);
    if(currentDate > packetDate ||packetDate > currentDate){
        return false
    }
    return true

}
