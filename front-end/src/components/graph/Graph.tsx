import React from "react";
import '../../style/Master.css'
import { BarGraph } from "./GraphLogic";


const data_name = ["123.45.678.90", "321.54.876.9", "34.263.165.2", "172.33.26.212"];
const data_nums = [20,22,15,18];

type graph_props = {
    x_axis: string[],
    y_axis: number[]
}

const Graph = ({x_axis, y_axis}: graph_props) => {
  return (
    <div style={{marginTop: 30, marginBottom: 20}}>
      <BarGraph names={x_axis} values={y_axis}/>
    </div>
  );
}

export default Graph;