import React from "react";
import '../../style/Master.css'
import { BarGraph } from "./GraphLogic";


const data_name = ["123.45.678.90", "321.54.876.9", "34.263.165.2", "172.33.26.212"];
const data_nums = [20,22,15,18];

type graph_props = {
    address: string[],
    packet: number[]
}

const Graph = ({address, packet}: graph_props) => {
  return (
    <div style={{marginTop: 30, marginBottom: 20}}>
      <BarGraph packets={packet} names={address}/>
    </div>
  );
}

export default Graph;