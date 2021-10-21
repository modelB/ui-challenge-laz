import React, { Component } from 'react'
import { csv } from 'd3-request'
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { timeParse, timeFormat } from 'd3-time-format'

import io from 'socket.io-client'





// Optional: to render with React
class OneStockChart extends Component {
    constructor(props) {
        super(props);
        // this.state = this.props.state.selected
    }

    // componentDidMount() {
    //   const chart = document.getElementById("chart");
    //   console.log('childnoses', chart.childNodes);
    //   const svg = document.querySelector('svg');
    //   if (svg) svg.parentNode.removeChild(svg);
    //   // chart.removeChild(chart.childNodes[0]);
    // }

    // componentDidUpdate() {
    //   const svg = document.querySelector('svg');
    //   if (svg) svg.parentNode.removeChild(svg);
    // }
    //TODO: make svg removed when 2 tickers or 0 tickers selected


  render() {
    const { selected, margin, width, height, data } = this.props.state;
    // const selected = this.state;
        // Build D3 Chart
    let tickerId;
    let tickerCount = 0;
    for (let [key,val] of Object.entries(selected)) {
      if (val) {
        tickerId = key;
        tickerCount++;
      }
    }

    // create svg
    // let oldsvg = document.querySelector('svg');
    // if (oldsvg) oldsvg.parentNode.removeChild(oldsvg);

    const svg = select('#chart')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    
    const newData = data.filter(el => el.ticker === tickerId);
    // Add X axis --> it is a date format
    var x = scaleTime()
      .domain(extent(newData, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x).tickFormat(timeFormat("%H:%M")));

    // Add Y axis
    var y = scaleLinear()
      .domain([min(newData, function(d) { return +d.price; }), max(newData, function(d) { return +d.price; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(newData)
      .attr("fill", "none")
      .attr("stroke", "#FF7F0E")
      .attr("stroke-width", 1.5)
      .attr("d", line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.price) })
        )
    svg.select(".x.axis")
      .selectAll("text")
      .style("font-size","0.8em");

    //add gridlines
    
    return (
      <div  id="oneStockChart">
        {/* <div id="chart"></div> */}
      </div>
    )
  }
}

export default OneStockChart
