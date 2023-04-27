import {useState, useEffect} from "react";
import '../../style/Master.css';
import Collapsible from "react-collapsible";
import { getName, getServersFromSubnet, getUserServers, renderServerList } from "./ServerStatusLogic";
import {  sortServers } from "../server-list/ServerListLogic";

interface ServerStatusComponentProps {
    name: string;
    email: string;
    subnetAddress: string;
}

export default function ServerStatus({name, email, subnetAddress}: ServerStatusComponentProps){

    const [serverList, setServerList] = useState([] as any[]); // server list to be displayed
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want

    // CURRENTLY TRYING TO GET FULL SERVER IP TO RENDER UNDERNEATH EACH SUBNET

    useEffect(() => {
        const getServerList = async () => {
            var servers = await getUserServers(email);
            //servers = sortServers(servers);
            var serversInSubnet = [] as string[];
            for (var i = 0; i < servers.length; i++) {
                if (subnetAddress === servers[i]["address"].toString().substring(subnetAddress.length)) {
                    serversInSubnet.push(servers[i]["address"].toString());
                }
            };
            console.log("Subnet: " + subnetAddress + "  Servers: " + serversInSubnet);
            setServerList(Array.from(new Set(servers)));
        }
        setTimeout(() => setCurrentTime(new Date()), 10000)
        getServerList();
    }, [currentTime]);

    return (
        <>
        <Collapsible trigger={getName(name, subnetAddress)} transitionTime={100}>
            {renderServerList(serverList, subnetAddress)}
        </Collapsible>
        <br/>
        </>
    );
}

// within collapsable, need to get list of addresses that fall under the subnet, do this by getting all of a client's servers?

//{serverList.map((subnetAndFullIP: {firstThree: string, addresses: string[]}) => {
//     console.log()
//     if (subnetAndFullIP["firstThree"] === subnetAddress) {
//         subnetAndFullIP["addresses"].map((address: string) => {
//             return(
//                 <div>Server {address}: {checkServerStatus(address)}</div>
//             )
//         });
//     }
// return(<br/>)
// })}