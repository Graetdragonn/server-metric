import * as d3 from "d3";
import { useMemo } from "react";

//https://www.react-graph-gallery.com/histogram

type dataProps = {
    width: number;
    height: number;
    data: number[];
}

const tempFakeData = [3,1,3,2,2,5,2,1,3]

export const HistogramGraph = ({width, height, data}: dataProps)=> {
    const bucketGen = d3
        .bin()
        .value((d) => d)
        .domain([0,5])
        .thresholds([0,1,2,3,4,5]);

   // var buckets = bucketGen(data)

    const xDimension = d3
        .scaleLinear()
        .domain([0,10])
        .range([10, width - 10]);

    const buckets = useMemo(()=> {
        const bucketGen = d3
            .bin()
            .value((d) => d)
            .domain([0,10])
            .thresholds([0,1,2,3,4,5]);
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