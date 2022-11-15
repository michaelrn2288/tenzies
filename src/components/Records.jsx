import React from 'react'

export default function Records(props) {
    return (
        <div className="record-container">
            <h2>{props.rollCountRecord ? 'Records' : ''}</h2>
            <div className="roll-record">
                {props.rollCountRecord ? `lowest number of rolls: ${props.rollCountRecord}` : ''}
            </div>
        </div>
    )
}
