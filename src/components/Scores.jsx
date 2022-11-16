import React from 'react'

export default function Scores (props) {
    return (
        <div className="score-container">
                <div className="roll-tracker">
                    {`number of rolls: ${props.rollCounter}`}
                </div>

                <div className="time-container">
                    elapsed time: {props.currentGameTime ? 
                        `${parseInt(props.currentGameTime / 600)} : ${parseInt(props.currentGameTime % 60)}` :
                        0
                    }
                </div>
            </div>
    )
}