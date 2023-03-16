import React from "react";
import '../../style/Master.css'
import { HistogramGraph } from "./GraphLogic";

const tempFakeData = [1,2,3,3,5,4,6,7,8,5,6,8,9]

const Graph = ({width = 700, height = 400}) => {
  return (
    <div style={{marginTop: 30, marginBottom: 20}}>
      <HistogramGraph width={width} height={height-20} data={tempFakeData}/>
    </div>
  );
}

export default Graph;