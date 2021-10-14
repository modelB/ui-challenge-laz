import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Selection = () => {
    return (
        <div id="selection">
                <p>Select the stocks to display:</p>
                <div>
                    <input type="checkbox" id="goog" name="GOOG" value="GOOG"/>
                    <label for="GOOG">GOOG</label>
                </div>
                <div>
                    <input type="checkbox" id="FB" name="FB" value="FB"/>
                    <label for="FB">FB</label>
                </div>
                <div>
                    <input type="checkbox" id="AAPL" name="AAPL" value="AAPL"/>
                    <label for="AAPL">AAPL</label>
                </div>
                <div>
                    <input type="checkbox" id="MSFT" name="MSFT" value="MSFT"/>
                    <label for="MSFT">MSFT</label>
                </div>
        </div>
    )
}

export default Selection