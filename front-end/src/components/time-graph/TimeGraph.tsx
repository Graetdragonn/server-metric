import React, {useState} from "react";
import '../../style/Master.css';
import { TimeGraph, getAllClientServers} from "./TimeGraphLogic";

const LineGraph = () => {
    // get user email
    const email = JSON.parse(localStorage.getItem('email') || '');
    console.log(email);
    
    // server list for user
    const [serverList, setServerList] = useState([] as any[]);

    // get all servers
    const getServerList = async () => {
        var servers = await getAllClientServers(email);
        setServerList(servers);
        console.log(servers);
    }
    getServerList();
    

    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph/>
        </div>
    );
}


export default LineGraph;
