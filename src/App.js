import React from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameVlue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameVlue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }
  function rollDeis() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((prev) => {
          return prev.isHeld ? prev : generateDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((prev) => {
        return prev.id === id ? { ...prev, isHeld: !prev.isHeld } : prev;
      })
    );
  }
  const dieElement = dice.map((dei) => (
    <Die
      key={dei.id}
      value={dei.value}
      isHeld={dei.isHeld}
      handleClick={() => holdDice(dei.id)}
    />
  ));
  return (
    <main className="App">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{dieElement}</div>
      <button onClick={rollDeis}>{tenzies ? "New Game" : "Roll"} </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
