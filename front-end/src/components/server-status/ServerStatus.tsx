import {useState, useEffect} from "react";
import '../../style/Master.css';
import Collapsible from "react-collapsible";
import { getName, getUserServers, renderServerList, getServersInSubnet, checkServerStatus } from "./ServerStatusLogic";

interface ServerStatusComponentProps {
    name: string;
    email: string;
    subnetAddress: string;
}

interface ServerAndStatus {
    server: string;
    status: string;
}

export default function ServerStatus({name, email, subnetAddress}: ServerStatusComponentProps){

    const [serversWithStatus, setServersWithStatus] = useState([] as ServerAndStatus[]); // list of servers and their status
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want

    useEffect(() => {
        const getServersWithStatus = async () => {
            var servers = await getUserServers(email);
            var serversInSubnet = Array.from(new Set(getServersInSubnet(servers, subnetAddress)));  
            var serversWithStatusLocal = [] as ServerAndStatus[];
            serversInSubnet.forEach(async (server: string) => {
                var serverStatus = await checkServerStatus(server);
                serversWithStatusLocal.push({
                    server: server,
                    status: serverStatus
                })
            });
            setServersWithStatus(serversWithStatusLocal);
        }
        setTimeout(() => setCurrentTime(new Date()), 10000)
        getServersWithStatus();
    }, [currentTime]);

    return (
        <>
        <Collapsible trigger={getName(name, subnetAddress)} transitionTime={100}>
            <br />
            {renderServerList(serversWithStatus)}
        </Collapsible>
        <br/>
        </>
    );
}
