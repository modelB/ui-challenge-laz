import 'index.html'
import 'style.css'
import 'favicon.ico'
import Selection from './Selection'
import OneStockChart from './OneStockChart';
// import ManyStockChart from './ManyStockChart';
import React, { Component, setState } from 'react'
import ReactDOM from 'react-dom'
import { csv } from 'd3-request'
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { timeParse } from 'd3-time-format'

import io from 'socket.io-client'





// Optional: to render with React
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            margin: {top: 10, right: 30, bottom: 30, left: 60},
            width: 370,
            height: 360,
            selected: {
                FB: true,
                GOOG: false,
                AAPL: false,
                MSFT: false
            },
            data: []
        }
        this.checkTheBox = this.checkTheBox.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    checkTheBox(ticker) {
        this.state.selected[ticker] = !this.state.selected[ticker];
    }
    // Build D3 Chart

// create svg
    

    // svg = select('#chart')
// .append("svg")
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// .append("g")
// .attr("transform",
//       "translate(" + margin.left + "," + margin.top + ")");

// Load historical data
    componentDidMount() {
        csv('/market-history', (error, data) => {
            // csv('/market-history',
    // // When reading the csv, I must format variables:
    // function(d){
            // const formattedData = { date : timeParse("%Q")(data.timestamp), ticker: data.ticker, price : data.price };
            data = data.map(el => {
                return { ...el, date: timeParse("%Q")(el.timestamp) } 
                })
            this.setState({ ...this.state, data: data })
            console.log('History', error || this.state.data);
        });
    }

    
    
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

// // Subscribe to updates

  render() {
    // const socket = io()
    // socket.on('market events', function (data) { console.log('Change', data) })
    // socket.on('start new day', function (data) { console.log('NewDay', data) })
    let tickerCount = Object.entries(this.state.selected).reduce((a,c)=> {
        return c[1] ? a+1 : a;
    },0);
    return (
      <div id="app">
          <Selection selected={this.state.selected} checkTheBox={this.checkTheBox} />
          {(this.state.chartType === "single") ? <OneStockChart state={this.state} /> : null}
      </div>
    )
  }
}

export default App
