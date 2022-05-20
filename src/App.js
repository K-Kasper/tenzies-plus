import { useState, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  const [gameData, setGameData] = useState({ timer: 'no', rolls: 0 });
  const getHighscore = JSON.parse(localStorage.getItem('highscore'));
  const [currHighscore, setCurrHighscore] = useState(getHighscore);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      dataUpdate();
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      dataUpdate();
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function checkIfHighscore() {
    if (gameData.rolls < currHighscore || getHighscore == null) {
      localStorage.setItem('highscore', JSON.stringify(gameData.rolls));
      setCurrHighscore(gameData.rolls);
    }
  }

  function dataUpdate() {
    if (!tenzies) {
      setGameData((prevGameData) => ({
        ...prevGameData,
        rolls: prevGameData.rolls + 1,
      }));
    } else {
      checkIfHighscore();
      setGameData({ timer: 0, rolls: 0 });
    }
  }

  function clearHighscore() {
    localStorage.removeItem('highscore');
    setCurrHighscore(null);
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="top">
        {currHighscore && (
          <div className="highscore">
            <button className="danger-btn" onClick={clearHighscore}>
              Clear highscore
            </button>
            <h3 className="highscore-text">Highscore: {currHighscore}</h3>
          </div>
        )}
        <h1 className="title">Tenzies</h1>
        <div id="gameData">
          <h3 id="timer">Timer: {gameData.timer}</h3>
          <h3 id="rolls">Rolls: {gameData.rolls}</h3>
        </div>
      </div>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
