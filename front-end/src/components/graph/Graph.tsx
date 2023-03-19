import React from "react";
import '../../style/Master.css'
import { HistogramGraph } from "./GraphLogic";

const tempFakeData = [0,2,3,7,10,11,20,18,17,16,22,24,16]

const Graph = ({width = 700, height = 400}) => {
  return (
    <div style={{marginTop: 30, marginBottom: 20}}>
      <HistogramGraph width={width} height={height-20} data={tempFakeData}/>
    </div>
  );
}

export default Graph;