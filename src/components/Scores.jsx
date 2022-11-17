import React from 'react'
import './Scores.css'

export default function Scores(props) {

    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000)
        let seconds = ((millis % 60000) / 1000).toFixed(0)
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                `${minutes < 10 ? '0' : ''}${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`
        )
    }
    const gameElapsedTime = millisToMinutesAndSeconds(props.currentGameTime)

    return (
        <div className="score-container">
            <div className="roll-track-container">
                rolls: {props.rollCounter}
            </div>

            <div className="time-track-container">
                time: {props.currentGameTime ?
                    gameElapsedTime :
                    '00:00'
                }

            </div>
        </div>
    )
}