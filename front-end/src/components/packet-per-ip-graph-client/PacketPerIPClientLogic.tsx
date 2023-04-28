import TrafficService from "../../requests/TrafficService";
import UserService from "../../requests/UserService";

function getSubnetFromFullAddress(fullAddress: string){
    const regExp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}/;
    // @ts-ignore
    return fullAddress.match(regExp).toString()
}

/**
 * Function to check unix date with current date
 * @param unixTime
 * @returns boolean
 */
function checkCurrentDate(unixTime: number){
    let currentDate = new Date()
    let packetDate = new Date(unixTime * 1000);
    return currentDate.getDate() === packetDate.getDate();
}

/**
 * @function to get a list of addresses with number of packets sent and received
 * @param userAddresses
 * @param subnetAddress
 */
export async function getNumPacketsSentAndReceivedClient(userAddresses: string[], subnetAddress: string){
    try{
        const res = await TrafficService.getAllTraffic();
        const trafficList = JSON.parse(res);
        const packetsPerIp = [] as any[];


        userAddresses.forEach((address: string) => {
            if(subnetAddress === getSubnetFromFullAddress(address)){
                packetsPerIp.push({ address: address, numPacketsSent: 0, numPacketsReceived: 0 });
            }


        });

        for (let i = 0; i < trafficList.length; i++) {
            if(checkCurrentDate(trafficList[i]["time"])){
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
        }
        return packetsPerIp;
    }
    catch {
        return [];
    }


}

/**
 * @function sends a Json request to get all servers for a specific user
 * @param email
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