import React, {useState, useEffect} from "react";
import '../../style/Master.css';
import Collapsible from "react-collapsible";
import { getName, getUserServers } from "./ServerStatusLogic";
import {  sortServers } from "../server-list/ServerListLogic";

interface ServerStatusComponentProps {
    name: string;
    email: string;
    subnetAddress: string;
}

export default function ServerStatus({name, email, subnetAddress}: ServerStatusComponentProps){

    const [serverList, setServerList] = useState([] as any[]); // server list to be displayed
    const [currentTime, setCurrentTime] = useState(new Date()) // default value can be anything you want


    useEffect(() => {
        const getServerList = async () => {
            var servers = await getUserServers(email);
            servers = sortServers(servers);
            setServerList(Array.from(new Set(servers)));
        }
        setTimeout(() => setCurrentTime(new Date()), 10000)
        getServerList();
    }, [currentTime]);

    return (
        <>
        <Collapsible trigger={getName(name, subnetAddress)} transitionTime={100}>
            {/* {serverList.map((server:) => {
            return (
                <div>
                
                </div>
            )
            })} */}
        </Collapsible>
        <br/>
        </>
    );
}

// within collapsable, need to get list of addresses that fall under the subnet, do this by getting all of a client's servers?