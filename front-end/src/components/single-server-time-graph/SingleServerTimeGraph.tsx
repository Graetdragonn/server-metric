import React, {useState, useEffect} from "react";
import '../../style/Master.css';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {getPacketsSentAndReceived} from "./SingleServerTimeGraphLogic";


interface SingleServerTimeGraphProps {
    address: string;
}
export default function SingleServerTimeGraph({address}: SingleServerTimeGraphProps){
    const [currentTime, setCurrentTime] = useState(new Date())

    const [data, setData] = useState([] as any[])
    useEffect(() => {
        async function getData(){
           let data = await getPacketsSentAndReceived(address);
           setData(data)
        }
        getData();
        setTimeout(() => setCurrentTime(new Date()), 10000)

    },[currentTime]);

    return (
        <div>
                <AreaChart width={1300} height={540} data={data} margin={{top: 10, right: 50, left: 0, bottom: 10,}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <defs>
                        <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--orange_wheel)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="var(--orange_wheel)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--some_purple)" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="var(--some_purple)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis  dataKey="time" />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Area name= "Sent Packets" type="monotone" dataKey="sentCount" strokeWidth = {3} stroke="var(--orange_wheel)" fillOpacity={10} fill="url(#color1)" />
                    <Area name= "Received Packets" type="monotone" dataKey="receivedCount" strokeWidth = {3} stroke="var(--some_purple)" fillOpacity={10} fill="url(#color2)" />
                </AreaChart>
        </div>
    );
}
