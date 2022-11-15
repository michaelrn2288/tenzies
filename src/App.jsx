import React from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(generateDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCounter, setRollCounter] = React.useState(0)

    React.useEffect(()=>{
        const areDiceEqual = dice.every(die => die.value === dice[0].value)
        areDiceEqual ? setTenzies(true) :setTenzies(false)
    }, [dice])

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
        setDice(prevDice => prevDice.map( die => {
            return die.isHeld ? die : {...die, value: randomDieNum()}
        }))
        setRollCounter(prevCounter => prevCounter + 1 )
    }

    function randomDieNum() {
        return Math.ceil(Math.random() * 6)
    }

    function holdDie (id) {
        setDice(prevDice => prevDice.map ( die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function newGame () {
        setDice(generateDice())
        setRollCounter(0)
    }


    const diceElements = dice.map((die, index) => {
        return (
            <Die
                value={die.value}
                key={index}
                isHeld={die.isHeld}
                holdDie={()=>holdDie(die.id)}
            />
        )
    }
    )

    return (
        <main>
            {tenzies && <Confetti /> }
            <div className="current-score">
                <div className="rolls-tracker">
                    {`number of rolls: ${rollCounter}`}
                </div>
            </div>
            <h1>{tenzies ? 'You Won!': 'Tenzies'}</h1>
            <p className="instructions">
                {tenzies ? '' : `Roll untill all dice are the same value.
                    Click each die to freeze it at its current value between rolls.`}
                </p>

            <div className="dice-container">
                {diceElements}
            </div>
            <button
                onClick={tenzies ? newGame : rollDice}
            >
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}