import React from "react";
import '../../style/Master.css';
import { TimeGraph } from "./TimeGraphLogic";



type graph_props = {
    x_axis: string[],
    y_axis: number[][],
    servers: string[]
}

const Graph = ({x_axis, y_axis, servers}: graph_props) => {
    return (
        <div style={{marginTop: 30, marginBottom: 20}}>
            <TimeGraph time={x_axis} values={y_axis} server_names={servers}/>
        </div>
    );
}


export default Graph;
