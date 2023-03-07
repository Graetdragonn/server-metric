import React from "react";
import '../../style/Master.css'
import { HistogramGraph } from "./GraphLogic";

const tempFakeData = [3,1,3,2,2,5,2,1,3]


const Graph = () => {
  return (
    <div >
      <HistogramGraph data={tempFakeData} width={400} height={400}/>
    </div>
  );
}

export default Graph;