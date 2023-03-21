import React from "react";
import '../../style/Master.css'
import { BarGraph } from "./GraphLogic";


const data_name = ["123.45.678.90", "321.54.876.9", "34.263.165.2", "172.33.26.212"];
const data_nums = [20,22,15,18];

const Graph = () => {
  return (
    <div style={{marginTop: 30, marginBottom: 20}}>
      <BarGraph packets={data_nums} names={data_name}/>
    </div>
  );
}

export default Graph;