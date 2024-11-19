import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [playerCard, setPlayerCard] = useState('');
  const [computerCard, setComputerCard] = useState('');
  const [result, setResult] = useState('');
  const [moonPhaseExplanation, setMoonPhaseExplanation] = useState('');

  // Function to draw a random card for the player
  const drawRandomCard = () => {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[Math.floor(Math.random() * cards.length)];
  };

  // Function to determine the winner
  const determineWinner = (playerCard, computerCard) => {
    const cardValues = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
    const playerValue = cardValues[playerCard];
    const computerValue = cardValues[computerCard];

    if (playerValue > computerValue) {
      setResult("You win!");
    } else if (playerValue < computerValue) {
      setResult("Computer wins!");
    } else {
      setResult("It's a tie!");
    }
  };

  // Function to handle drawing cards
  const handleDrawCards = async () => {
    const playerCard = drawRandomCard();
    setPlayerCard(playerCard);

    try {
      // Update the API request to use London's coordinates and timezone
      const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&daily=moon_phase&timezone=Europe/London');
      const moonPhase = response.data.daily.moon_phase[0];

      let cardRange;
      let explanation;
      switch (moonPhase) {
        case "new":
          cardRange = ['2', '3', '4', '5'];
          explanation = "The New Moon whispers secrets of modest beginnings.";
          break;
        case "waxing_crescent":
          cardRange = ['6', '7'];
          explanation = "The Waxing Crescent hints at growing fortunes.";
          break;
        case "first_quarter":
          cardRange = ['8', '9'];
          explanation = "The First Quarter suggests a balanced approach.";
          break;
        case "waxing_gibbous":
          cardRange = ['10', 'J'];
          explanation = "The Waxing Gibbous predicts ambitious endeavors.";
          break;
        case "full":
          cardRange = ['Q', 'K'];
          explanation = "The Full Moon shines brightly on grand opportunities.";
          break;
        default:
          cardRange = ['A'];
          explanation = "The Waning Gibbous reflects on past triumphs.";
          break;
      }

      const computerCard = cardRange[Math.floor(Math.random() * cardRange.length)];
      setComputerCard(computerCard);
      setMoonPhaseExplanation(explanation);
    } catch (error) {
      console.error("Error fetching moon phase:", error);
      const fallbackCard = drawRandomCard(); // Fallback to random card if API fails
      setComputerCard(fallbackCard);
      setMoonPhaseExplanation("The stars are clouded; randomness prevails.");
    }

    determineWinner(playerCard, computerCard);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>High Card Game</h1>
      {/* <p>
        In this game, the computer's card is influenced by the current moon phase over London.
        The mystical powers of the moon guide its choices, adding an astronomical twist to your match!
      </p> */}
      <button onClick={handleDrawCards}>Draw Your Card</button>
      <div>Your card: {playerCard}</div>
      <div>Computer's card: {computerCard}</div>
      <div>{result}</div>
      <div style={{ marginTop: '20px', fontStyle: 'italic' }}>{moonPhaseExplanation}</div>
    </div>
  );
}

export default App;