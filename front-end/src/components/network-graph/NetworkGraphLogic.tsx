import TrafficService from "../../requests/TrafficService";

function addressInNodeList(address: string, addresses: [{id: number; label: string}]){
    for(let i = 0; i < addresses.length; i++){
        // @ts-ignore
        if(address === addresses[i]["label"]){
            return true;
        }
    }
    return false;
}


function addressInUserAddress(address: string, addresses: string[]){
    for(let i = 0; i < addresses.length; i++){
        // @ts-ignore
        if(address === addresses[i]){
            return true;
        }
    }
    return false;
}

export async function generateNodesForNetworkGraph(userAddresses: string[]){
    const res = await TrafficService.getAllTraffic();
    const trafficList = JSON.parse(res);
    let lengthOfUserAddresses = userAddresses.length;
    let lengthOfTrafficList = trafficList.length;
    // @ts-ignore
    let nodeList: [{id: number; label: string, color: string}] = [];

    for(let i = 0; i < lengthOfUserAddresses; i++){
        nodeList.push({id: i, label: userAddresses[i], color: " #ee8434"})

    }

    for(let j = 0; j < lengthOfUserAddresses; j++){
        let foundConnections = 0;
        for(let n = 0; n <lengthOfTrafficList; n++){
            const addrRec = trafficList[n]["dstIP"];
            const addrSnt = trafficList[n]["srcIP"];

                    if(addressInUserAddress(addrRec, userAddresses)){

                        if(!addressInNodeList(addrSnt, nodeList)){
                            nodeList.push({id: n + lengthOfUserAddresses, label: addrSnt, color: "#94579E"})
                            foundConnections++
                        }
                    }else if(addressInUserAddress(addrSnt, userAddresses)){

                        if(!addressInNodeList(addrRec, nodeList)){
                            nodeList.push({id: n + lengthOfUserAddresses, label: addrRec, color: "#94579E"})
                            foundConnections++
                        }
                    }

                    if(foundConnections == 4){
                        foundConnections = 0;
                        break;
                    }
        }
    }
    return nodeList
}

function getIDFromNodeList(address: string, nodeList: any[]){
    for(let i = 0; i < nodeList.length; i++){
        if(nodeList[i]["label"] === address){
            return nodeList[i]["id"];
        }
    }
    return null;
}

export async function generateEdgesForNetworkGraph(nodeList: any[], userAddressesLength: number){
    const res = await TrafficService.getAllTraffic();
    const trafficList = JSON.parse(res);
    const edgeList = [] as any[]

    for(let i = 0; i < userAddressesLength; i++){
        for(let j = i + 1; j < userAddressesLength; j++){
            edgeList.push({from: nodeList[i]["id"], to: nodeList[j]["id"]})
        }
    }

    for(let i = 0; i < nodeList.length; i++){
        let addressToFindConnection = nodeList[i]["label"];
        for(let j = 0; j < trafficList.length; j++){

            const addrRec = trafficList[j]["dstIP"];
            const addrSnt = trafficList[j]["srcIP"];

            if(addrRec === addressToFindConnection){
                edgeList.push({from: getIDFromNodeList(addrSnt, nodeList), to: nodeList[i]["id"]})
            }else if(addrSnt === addressToFindConnection){
                edgeList.push({from: nodeList[i]["id"], to: getIDFromNodeList(addrRec, nodeList)})
            }
        }
    }

    return edgeList;
}