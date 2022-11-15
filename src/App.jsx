import React from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(generateDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{
        const areDiceEqual = dice.every(die => die.value === dice[0].value)
        console.log(areDiceEqual)
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
                onClick={rollDice}
            >Roll</button>
        </main>
    )
}