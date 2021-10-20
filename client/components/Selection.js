import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Selection = ({ selected, checkTheBox }) => {

    return (
        <div id="selection">
                <p>Select the stocks to display:</p>
                <div>
                    <input type="checkbox" defaultChecked={selected.GOOGL} onClick={(event)=>checkTheBox(event.target.id)} id="GOOGL" name="GOOGL" value="GOOGL"/>
                    <label htmlFor="GOOGL">GOOGL</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={selected.FB} onClick={(event)=>checkTheBox(event.target.id)} id="FB" name="FB" value="FB"/>
                    <label htmlFor="FB">FB</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={selected.AAPL} onClick={(event)=>checkTheBox(event.target.id)} id="AAPL" name="AAPL" value="AAPL"/>
                    <label htmlFor="AAPL">AAPL</label>
                </div>
                <div>
                    <input type="checkbox" defaultChecked={selected.MSFT} onClick={(event)=>checkTheBox(event.target.id)} id="MSFT" name="MSFT" value="MSFT"/>
                    <label htmlFor="MSFT">MSFT</label>
                </div>
        </div>
    )
}

export default Selection