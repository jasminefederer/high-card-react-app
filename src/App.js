import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [result, setResult] = useState("");

  const cardValues = {
    1: "Ace",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "Jack",
    12: "Queen",
    13: "King",
  };

  const playGame = () => {
    const player = Math.floor(Math.random() * 13) + 1;
    const computer = Math.floor(Math.random() * 13) + 1;

    setPlayerCard(player);
    setComputerCard(computer);

    if (player > computer) {
      setResult("You Win!");
    } else if (player < computer) {
      setResult("Computer Wins!");
    } else {
      setResult("It's a Tie!");
    }
  };

  return (
    <div className="App">
      <h1>High Card Game</h1>
      <button onClick={playGame}>Draw Card</button>
      {playerCard && computerCard && (
        <div>
          <h2>Your Card: {cardValues[playerCard]}</h2>
          <h2>Computer's Card: {cardValues[computerCard]}</h2>
          <h3>{result}</h3>
        </div>
      )}
    </div>
  );
};

export default App;