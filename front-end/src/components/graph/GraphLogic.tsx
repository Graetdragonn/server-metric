import * as d3 from "d3";
import { useMemo, useRef, useEffect } from "react";

//https://www.react-graph-gallery.com/histogram
//https://www.react-graph-gallery.com/build-axis-with-react

type dataProps = {
    width: number;
    height: number;
    data: number[];
}

const GRAPH_MARGINS = {top: 20, bottom: 20, left: 30, right:30};


export const HistogramGraph = ({width, height, data}: dataProps)=> {
    const axesReference = useRef(null);
    const axesHeight = height - GRAPH_MARGINS.top - GRAPH_MARGINS.bottom;
    const axesWidth = width - GRAPH_MARGINS.right - GRAPH_MARGINS.left;

    const xDimension = d3
        .scaleLinear()
        .domain([0,25])
        .range([25, axesWidth]);

    const buckets = useMemo(()=> {
        const bucketGen = d3
            .bin()
            .value((d) => d)
            .domain([0,25])
            .thresholds([0,5,10,15,20,25]);
        return bucketGen(data);
    }, [xDimension]);


    const yDimension = useMemo(() =>{
        const maxHeight = Math.max(...buckets.map((bucket)=> bucket?.length));
        return d3.scaleLinear()
            .range([height, 0])
            .domain([0, maxHeight]);            
    }, [data, height]);

    const makeRectangles = buckets.map((bucket, i) => {
        return(
            <rect 
                key={i}
                fill="#008000"
                stroke="black"
                x = {xDimension(bucket.x0 as number) + 2}
                width = {xDimension(bucket.x1 as number) - xDimension(bucket.x0 as number) - 2}
                y = {yDimension(bucket.length)}
                height = {height - yDimension(bucket.length)}
            />
        );
    });

    return(
        <div>
            <svg width={width} height={height}>
                {makeRectangles}
            </svg>
        </div>
    );
}