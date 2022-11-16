import React from 'react'
import Die from './components/Die'
import Scores from './components/Scores'
import Records from './components/Records'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(generateDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCounter, setRollCounter] = React.useState(0)
    const [rollCountRecord, setRollCountRecord] = React.useState(
        localStorage.getItem('rollCountRecord') || 0
    )
    const [initialGameTime, setInitialGameTime] = React.useState()
    const [currentGameTime, setCurrentGameTime] = React.useState()


    function updateTime() {
        const dateNow = Date.now()
        const elapsedTime = dateNow - initialGameTime
        setCurrentGameTime(elapsedTime)
        clearInterval(gameTimeCount)
    }
    const gameTimeCount = !tenzies && setInterval(updateTime, 100)

    React.useEffect(() => {
        const areDiceEqual = dice.every(die => die.value === dice[0].value)
        areDiceEqual ? setTenzies(true) : setTenzies(false)
    }, [dice])

    React.useEffect(() => {
        if (!tenzies) return
        if (!rollCounter) return
        !rollCountRecord && localStorage.setItem('rollCountRecord', rollCounter)
        rollCounter < rollCountRecord && localStorage.setItem('rollCountRecord', rollCounter)
    }, [tenzies])

    function generateDice() {
        let dice = []
        for (let i = 0; i < 10; i++) {
            const die = {
                value: randomDieNum(),
                isHeld: false,
                id: i,
            }
            dice = [...dice, die]
        }
        return dice
    }

    function rollDice() {
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : { ...die, value: randomDieNum() }
        }))
        setRollCounter(prevCounter => prevCounter + 1)
    }

    function randomDieNum() {
        return Math.ceil(Math.random() * 6)
    }

    function holdDie(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    function newGame() {
        setDice(generateDice())
        setRollCountRecord(localStorage.getItem('rollCountRecord'))
        setRollCounter(0)
        setInitialGameTime()
    }


    const diceElements = dice.map((die, index) => {
        return (
            <Die
                value={die.value}
                key={index}
                isHeld={die.isHeld}
                holdDie={() => {
                    holdDie(die.id)
                    !initialGameTime && setInitialGameTime(Date.now())
                }}
            />
        )
    }
    )

    return (
        <main>
            {tenzies && <Confetti />}
            <Scores
                rollCounter={rollCounter}
                currentGameTime={currentGameTime}
            />
            <Records
                rollCountRecord={rollCountRecord}
                initialGameTime={initialGameTime}
            />
            <h1>{tenzies ? 'You Won!' : 'Tenzies'}</h1>
            <p className="instructions">
                {tenzies ? '' : `Roll untill all dice are the same value.
                    Click each die to freeze it at its current value between rolls.`}
            </p>

            <div className="dice-container">
                {diceElements}
            </div>
            <button
                onClick={() => {
                    tenzies ? newGame() : rollDice()
                    !initialGameTime && setInitialGameTime(Date.now())

                }}
            >
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}