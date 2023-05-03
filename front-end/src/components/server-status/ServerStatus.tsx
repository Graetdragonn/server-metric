import {useState, useEffect} from "react";
import '../../style/Master.css';
import Collapsible from "react-collapsible";
import { getName, getUserServers, renderServerList, getServersInSubnet, checkServerStatus } from "./ServerStatusLogic";

interface ServerStatusComponentProps {
    name: string;
    email: string;
    subnetAddress: string;
}

export interface ServerAndStatus {
    server: string;
    status: string;
    lastTimeNotified: number;
}

export default function ServerStatus({name, email, subnetAddress}: ServerStatusComponentProps){

    const [serversWithStatus, setServersWithStatus] = useState([] as ServerAndStatus[]); // list of servers and their status

    useEffect(() => {
        const getServersWithStatus = async () => {
            var servers = await getUserServers(email); // servers has type ServerAndStatus
            var serversInSubnet = getServersInSubnet(servers, subnetAddress);  // serversInSubnet has type ServerAndStatus
            var serversWithStatusLocal = [] as ServerAndStatus[];
            serversInSubnet.forEach(async (item: ServerAndStatus) => {
                var serverStatus = await checkServerStatus(item.server);
                serversWithStatusLocal.push({
                    server: item.server,
                    status: serverStatus,
                    lastTimeNotified: item.lastTimeNotified
                })
            });
            setServersWithStatus(serversWithStatusLocal);
        }
        getServersWithStatus();
    }, []);

    return (
        <>
        <Collapsible trigger={getName(name, subnetAddress)} transitionTime={100}>
            <br />
            {renderServerList(serversWithStatus, email)}
        </Collapsible>
        <br/>
        </>
    );
}
