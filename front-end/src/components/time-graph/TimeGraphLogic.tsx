import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//https://recharts.org/en-US/examples

type dataProps = {
    time: string[]
    values: number[][]
    server_names: string[]
}

export const TimeGraph = ({time, values, server_names}: dataProps)=>{
    var data : any = [];
    var servers = server_names;
    
    var i = 0;
    var j = 0;
    for(i = 0; i < time.length; i++){
        const obj = {times: time[i], server1: values[i][j], server2: values[i][j+1]};
        data.push(obj);
    }
    
    //console.log(servers);
    //console.log("Data");
    //console.log(data);

    return (
        <ResponsiveContainer width="100%" height="100%">
        <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{top: 5, right: 30, left: 150, bottom: 5,}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="times" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={server_names[0]} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={server_names[1]} stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
        </ResponsiveContainer>

    );     
}