import 'index.html'
import 'style.css'
import 'favicon.ico'
import Selection from './components/Selection'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { csv } from 'd3-request'
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { timeParse } from 'd3-time-format'

import io from 'socket.io-client'

// Build D3 Chart

// create svg
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
const svg = select('#chart')
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Load historical data
csv('/market-history', (error, data) => console.log('History', error || data))

// Subscribe to updates
const socket = io()
socket.on('market events', function (data) { console.log('Change', data) })
socket.on('start new day', function (data) { console.log('NewDay', data) })








//Read the data
csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {
    console.log('data', data);
    // Add X axis --> it is a date format
    var x = scaleTime()
      .domain(extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    // Add Y axis
    var y = scaleLinear()
      .domain([0, max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})

//END D3



// Optional: to render with React
class MyComponent extends Component {
  render() {
    const { text } = this.props
    return (
      <div>
        <div id="selection">
                <p>Select the stocks to display:</p>
                <div>
                    <input type="checkbox" id="goog" name="GOOG" value="GOOG"/>
                    <label htmlFor="GOOG">GOOG</label>
                </div>
                <div>
                    <input type="checkbox" id="FB" name="FB" value="FB"/>
                    <label htmlFor="FB">FB</label>
                </div>
                <div>
                    <input type="checkbox" id="AAPL" name="AAPL" value="AAPL"/>
                    <label htmlFor="AAPL">AAPL</label>
                </div>
                <div>
                    <input type="checkbox" id="MSFT" name="MSFT" value="MSFT"/>
                    <label htmlFor="MSFT">MSFT</label>
                </div>
        </div>
        
      </div>
    )
  }
}
ReactDOM.render(
  <MyComponent text='This is a placeholder React Component. Also, have a look in the dev console to see the data we loaded.' />,
  document.body.appendChild(document.createElement('div'))
)
