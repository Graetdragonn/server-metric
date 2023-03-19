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
const NUM_BUCKETS = 5;


export const HistogramGraph = ({width, height, data}: dataProps)=> {
    const axisReference = useRef(null);
    const axisHeight = height - GRAPH_MARGINS.top - GRAPH_MARGINS.bottom;
    const axisWidth = width - GRAPH_MARGINS.right - GRAPH_MARGINS.left;

    const xDimension = d3
        .scaleLinear()
        .domain([0,25])
        .range([25, axisWidth]);

    const buckets = useMemo(()=> {
        const bucketGen = d3
            .bin()
            .value((d) => d)
            .domain([0,25])
            .thresholds(xDimension.ticks(NUM_BUCKETS));
        return bucketGen(data);
    }, [xDimension]);


    const yDimension = useMemo(() =>{
        const maxHeight = Math.max(...buckets.map((bucket)=> bucket?.length));
        return d3.scaleLinear()
            .range([axisHeight, 0])
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
                height = {axisHeight - yDimension(bucket.length)}
            />
        );
    });

    //Rendering X and Y axis.
    useEffect(() =>{
        const svg = d3.select(axisReference.current);
        //svg.selectAll("*").remove();

        const make_X_Axis = d3.axisBottom(xDimension);
        svg.append("g").attr("transform", "translate(0," + axisHeight + ")").call(make_X_Axis);

        const make_Y_Axis = d3.axisLeft(yDimension);
        svg.append("g").call(make_Y_Axis);
    }, [xDimension, yDimension, axisHeight]);

    return(
        <svg width={width} height={height}>
            <g width={axisWidth} height={axisHeight} transform={`translate(${[GRAPH_MARGINS.left, GRAPH_MARGINS.top].join(",")})`}>
                {makeRectangles}
            </g>
            <g width={axisWidth} height={axisHeight} ref={axisReference} transform={`translate(${[GRAPH_MARGINS.left, GRAPH_MARGINS.top].join(",")})`}>
            </g>
        </svg>
    );
}