import 'index.html'
import 'style.css'
import 'favicon.ico'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { csv } from 'd3-xhr'
import io from 'socket.io-client'

// Load historical data
csv('/market-history', (error, data) => console.log('History', error || data))

// Subscribe to updates
const socket = io()
socket.on('market events', function (data) { console.log('Change', data) })
socket.on('start new day', function (data) { console.log('NewDay', data) })



// Optional: to render with React
class MyComponent extends Component {
  render() {
    const { text } = this.props
    return <div>{text}</div>
  }
}
ReactDOM.render(
  <MyComponent text='Hello Component' />,
  document.body.appendChild(document.createElement('div'))
)
