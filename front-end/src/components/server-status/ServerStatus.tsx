import {useState, useEffect} from "react";
import '../../style/Master.css';
import Collapsible from "react-collapsible";
import { getName, getUserServers, renderServerList, getServersInSubnet } from "./ServerStatusLogic";

interface ServerStatusComponentProps {
    name: string;
    email: string;
    subnetAddress: string;
}

export default function ServerStatus({name, email, subnetAddress}: ServerStatusComponentProps){

    const [serverList, setServerList] = useState([] as string[]); // server list to be displayed
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want

    // CURRENTLY TRYING TO GET FULL SERVER IP TO RENDER UNDERNEATH EACH SUBNET
    // TODO: call backend route to check last time stamp for that address, display "DOWN" if longer than certain time specified in constants file
    // send email for servers that are down

    useEffect(() => {
        const getServerList = async () => {
            var servers = await getUserServers(email);
            var serversInSubnet = getServersInSubnet(servers, subnetAddress);            
            setServerList(Array.from(new Set(serversInSubnet)));
        }
        setTimeout(() => setCurrentTime(new Date()), 10000)
        getServerList();
    }, [currentTime]);

    return (
        <>
        <Collapsible trigger={getName(name, subnetAddress)} transitionTime={100}>
            <br />
            {renderServerList(serverList)}
        </Collapsible>
        <br/>
        </>
    );
}
