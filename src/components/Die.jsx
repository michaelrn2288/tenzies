import React from 'react'
import './Die.css'

export default function Die (props) {
    return (
        <div
            className={`die ${props.isHeld && 'held'}`}
            onClick={props.holdDie}
        >
            {props.value}
        </div>
    )
}