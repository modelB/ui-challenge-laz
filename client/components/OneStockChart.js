import React, { Component } from 'react'
import { csv } from 'd3-request'
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { timeParse } from 'd3-time-format'

import io from 'socket.io-client'





// Optional: to render with React
class OneStockChart extends Component {
    constructor(props) {
        super(props);
    }
    // Build D3 Chart

// create svg
// const margin = {top: 10, right: 30, bottom: 30, left: 60},
// width = 460 - margin.left - margin.right,
// height = 400 - margin.top - margin.bottom;

// const svg = select('#chart')
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform",
//       "translate(" + margin.left + "," + margin.top + ")");

// // Load historical data
// // csv('/market-history', (error, data) => console.log('History', error || data))
// csv('/market-history',
// // When reading the csv, I must format variables:
// function(d){
// return { date : timeParse("%Q")(d.timestamp), ticker: d.ticker, price : d.price }
// },

// function(data) {
// data = data.filter(el => el.ticker === 'FB');
// console.log('data', data);
// // Add X axis --> it is a date format
// var x = scaleTime()
//   .domain(extent(data, function(d) { return d.date; }))
//   .range([ 0, width ]);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(axisBottom(x));

// // Add Y axis
// var y = scaleLinear()
//   .domain([min(data, function(d) { return +d.price; }), max(data, function(d) { return +d.price; })])
//   .range([ height, 0 ]);
// svg.append("g")
//   .call(axisLeft(y));

// // Add the line
// svg.append("path")
//   .datum(data)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr("d", line()
//     .x(function(d) { return x(d.date) })
//     .y(function(d) { return y(d.price) })
//     )

// });

  render() {
    const { margin, width, height, selected, data } = this.props.state;
    
    return (
      <div id="oneStockChart">
          {JSON.stringify(selected)}
      </div>
    )
  }
}

export default OneStockChart
