import React from 'react'
import Die from './components/Die'

export default function App() {

    const [dice, setDice] = React.useState(generateDice())

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
            <h1>Tenzies</h1>
            <p>Roll untill all dice are the same value.
                Click each die to freeze it at its current value between rolls.</p>

            <div className="dice-container">
                {diceElements}
            </div>
            <button
                onClick={()=>setDice(generateDice())}
            >Roll</button>
        </main>
    )
}