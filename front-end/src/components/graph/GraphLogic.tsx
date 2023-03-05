import * as d3 from "d3";

type dataProps = {
    width: number;
    height: number;
    data: number[];
}

export const HistogramGraph = ({width, height, data}: dataProps)=> {
    return(
        <div>
            <svg width={width} height={height}>
            // will render here
            </svg>
        </div>
    );
}