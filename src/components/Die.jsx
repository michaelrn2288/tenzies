import React from 'react'
import './Die.css'

export default function Die (props) {
    return (
        <div className="die">
            {props.value}
        </div>
    )
}