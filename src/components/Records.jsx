import React from 'react'
import './Records.css'

export default function Records(props) {

    const recordsStyle = props.rollCountRecord ? {
        border: '1px solid rgba(111,111,111, 0.7)',
        borderRadius: '5px',
    } : {}

    return (
        <div className="record-container" style={recordsStyle}>
            <h2 className="record-title">{props.rollCountRecord || props.gameTimeRecord ? 'Records' : ''}</h2>

            <section className="records">
                <div className="roll-record">
                    {props.rollCountRecord ? `lowest number of rolls: ${props.rollCountRecord}` : ''}
                </div>

                <div className="time-record">
                    {props.gameTimeRecord ? `lowest time: ${props.gameTimeRecord}` : ''}
                </div>
            </section>
        </div>
    )
}
