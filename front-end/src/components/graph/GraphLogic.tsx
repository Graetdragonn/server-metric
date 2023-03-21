import * as d3 from "d3";

//https://www.react-graph-gallery.com/histogram
//https://www.react-graph-gallery.com/build-axis-with-react
//https://d3-graph-gallery.com/graph/barplot_basic.html


// set the dimensions and margins of the graph
const margin = {top: 20, right: 30, bottom: 75, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#bar_graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

type dataProps = {
    packets: number[]
    names: string[]
}

export const BarGraph = ({packets, names}: dataProps) =>{
    var data = [];
    var i = 0;
    for(i = 0; i < packets.length; i++){
        const obj = {address: names[i], packets: packets[i]};
        data.push(obj);
    }

    // Set up the X axis
    var x_axis = d3.scaleBand()
        .range([ 0, width ])
        //  .domain(data.map(function(d) { return d.Country; }))
        .domain(data.map(function(val) {return val.address;}))
        .padding(0.25);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_axis))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Set up Y axis
    var y_axis = d3.scaleLinear()
        .domain([0, Math.max(...packets)])
        .range([ height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y_axis));
    

    // Create bars
    svg.selectAll("mybar")
        .data(data)
        .enter() 
        .append("rect")
        .attr("x", function(d) { return x_axis(d.address)!;})
        .attr("y", function(d) { return y_axis(d.packets)!;})
        .attr("width", x_axis.bandwidth())
        .attr("height", function(d) { return height - y_axis(d.packets)!;}) //height - y_axis(packets.length)
        .attr("fill", "#619E57")

    return(
        <div id="bar_graph"></div>
    );
}

