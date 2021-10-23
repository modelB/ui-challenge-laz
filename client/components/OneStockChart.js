import React, { Component } from 'react'
import { csv } from 'd3-request'
import { select } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, min } from 'd3-array';
import { axisBottom, axisRight } from 'd3-axis';
import { line } from 'd3-shape';
import { timeParse, timeFormat } from 'd3-time-format'
import { format } from "d3-format";

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
    console.log('newdata', newData);
    // Add X axis --> it is a date format
    var x = scaleTime()
      .domain(extent(newData, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + (height+3) + ")")
      .attr('style', 'font-weight: bold;')
      .call(axisBottom(x).tickSize(0).tickFormat(timeFormat("%H:%M")));

    //also append x axis on top
    svg.append("g")
      .attr("transform", "translate(0,-15)")
      .attr('style', 'font-weight: bold;')
      .call(axisBottom(x).tickSize(0).tickFormat(timeFormat("%H:%M")));

    // Add Y axis
    var y = scaleLinear()
      .domain([min(newData, function(d) { return +d.price }), max(newData, function(d) { return +d.price })])
      .range([ height, 0 ]);
    svg.append("g")
    .attr("transform", `translate(${width},-7)`)
    .attr("style", "font-size: 1.1em;")
      .call(axisRight(y).tickSize(0).ticks(5).tickFormat(format('.2f')));

    //add gridlines
    const gridlines = axisBottom()
      .tickFormat("")
      .tickSize(height)
      .scale(x);

    svg.append("g")
    .attr("class", "grid")
    .call(gridlines);

    const gridlines2 = axisRight()
    .ticks(5)
      .tickFormat("")
      .tickSize(width+43)
      .scale(y);

    svg.append("g")
    .attr("class", "grid")
    .attr('id','horizontalgrid')
    .call(gridlines2);


    //add border white line
    svg.append("path")
      .datum(newData)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 4)
      .attr("d", line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.price) })
        )

    // Add the line
    svg.append("path")
      .datum(newData)
      .attr("fill", "none")
      .attr('class', 'patharea')
      .attr("stroke", "#FF7F0E")
      .attr("stroke-width", 2)
      .attr("d", line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.price) })
        )
    svg.select(".x.axis")
      .selectAll("text")
      .style("font-size","0.8em");

    //add circle
    svg
            .append("svg:circle")
                .attr("cx", () => x(newData[newData.length-1].date))
                .attr("cy", () => y(newData[newData.length-1].price))
                .attr("stroke", "white")
                .attr("fill", "white")
                .attr("r", 5)
                .attr("class", "circle");

    svg
            .append("svg:circle")
                .attr("cx", () => x(newData[newData.length-1].date))
                .attr("cy", () => y(newData[newData.length-1].price))
                .attr("stroke", "#FF7F0E")
                .attr("fill", "#FF7F0E")
                .attr("r", 4)
                .attr("class", "circle");

    //give x axis id
    // svg.select('.x.axis')
    //   .attr("id", "xaxis")
    //legend
    svg.append("text")
            .attr("x", width+70)  // space legend
            .attr("y", 20)
            .attr('id','legendticker')
            .attr("class", "legend")    // style the legend
            .attr("fill", "#FF7F0E")
            .text(tickerId);
    
    svg.append("rect")
    .attr("x", width+62)  // space legend
    .attr("y", -7)
    .attr('width', 6)
    .attr('height', 48)
    .attr("class", "legend")    // style the legend
    .attr("fill", "#FF7F0E")
    .text(tickerId);

    // console.log(newData[newData.length-1])
    svg.append("text")
            .attr("x", width+70)  // space legend
            .attr("y", 36)
            .attr('id','legendsub')
            .attr("class", "legend")    // style the legend
            .attr("fill", "#FF7F0E")
            .text(() => "$"+newData[newData.length-1]['price'].slice(0, newData[newData.length-1]['price'].indexOf('.')+3));

    if (newData.length) {
      let chgPct = (Number(newData[newData.length-1]['price'])/Number(newData[0]['price'])-1)*100;
      let chgTot = Number(newData[newData.length-1]['price'])-Number(newData[0]['price']);
      if (chgPct >= 0) {
        chgPct = String(Math.round(chgPct*100)/100);
        chgTot = String(Math.round(chgTot*100)/100);
        svg.append("text")
            .attr("x", width+200)  // space legend
            .attr("y", 20)
            .attr('id','legendticker')
            .attr("class", "legend")    // style the legend
            .attr("fill", "#2CA02C")
            .text("+"+chgPct);

        svg.append("text")
        .attr("x", width+273) // space legend
        .attr("y", 20)
        .attr('id','legendpct')
        .attr("class", "legend")    // style the legend
        .attr("fill", "#2CA02C")
        .text("%");

        svg.append("text")
        .attr("x", width+240) // space legend
        .attr("y", 36)
        .attr('id','legendsub')
        .attr("class", "legend")    // style the legend
        .attr("fill", "#2CA02C")
        .text("+$"+chgTot);
            

      } else {
        chgPct = String(chgPct).slice(1,5);
        chgTot = String(chgTot).slice(1,5);
        svg.append("text")
            .attr("x", width+200)  // space legend
            .attr("y", 20)
            .attr('id','legendticker')
            .attr("class", "legend")    // style the legend
            .attr("fill", "#D62728")
            .text("-"+chgPct);

        svg.append("text")
        .attr("x", width+268) // space legend
        .attr("y", 20)
        .attr('id','legendpct')
        .attr("class", "legend")    // style the legend
        .attr("fill", "#D62728")
        .text("%");

        svg.append("text")
        .attr("x", width+240) // space legend
        .attr("y", 36)
        .attr('id','legendsub')
        .attr("class", "legend")    // style the legend
        .attr("fill", "#D62728")
        .text("-$"+chgTot);
      }
      console.log(chgPct);
      console.log(chgTot);
    }

    return (
      <div  id="oneStockChart">
        {/* <div id="chart"></div> */}
      </div>
    )
  }
}

export default OneStockChart
