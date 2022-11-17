import React from 'react'
import './Scores.css'

export default function Scores(props) {

    const gameElapsedTime = millisToMinutesAndSeconds(props.currentGameTime)

    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000)
        let seconds = ((millis % 60000) / 1000).toFixed(0)
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                `${minutes < 10 ? '0' : ''}${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`
        )
    }

    React.useEffect(() => {
        if (!props.tenzies) return
        if (!props.currentGameTime) return
        !props.gameTimeRecord && localStorage.setItem(
            'gameTimeRecord', millisToMinutesAndSeconds(props.currentGameTime)
        )
        props.currentGameTime < props.gameTimeRecord && localStorage.setItem(
            'gameTimeRecord', millisToMinutesAndSeconds(props.currentGameTime)
        )
    }, [props.tenzies])


    return (
        <div className="score-container">
            <div className="roll-track-container">
                current rolls: {props.rollCounter}
            </div>

            <div className="time-track-container">
                current time: {props.currentGameTime ?
                    gameElapsedTime :
                    '00:00'
                }

            </div>
        </div>
    )
}