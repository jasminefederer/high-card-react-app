import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing card images
import card2 from './images/2.png';
import card3 from './images/3.png';
import card4 from './images/4.png';
import card5 from './images/5.png';
import card6 from './images/6.png';
import card7 from './images/7.png';
import card8 from './images/8.png';
import card9 from './images/9.png';
import card10 from './images/10.png';
import cardJ from './images/J.png';
import cardQ from './images/Q.png';
import cardK from './images/K.png';
import cardA from './images/A.png';

// Importing decal image for header and footer
import decal from './images/decal.png';

function App() {
  const [playerCard, setPlayerCard] = useState('');
  const [computerCard, setComputerCard] = useState('');
  const [result, setResult] = useState('');
  const [moonPhaseExplanation, setMoonPhaseExplanation] = useState('');
  const [location, setLocation] = useState({ latitude: 51.5074, longitude: -0.1278 }); // Default to London
  const [city, setCity] = useState(''); // Start with an empty city
  const [moonPhase, setMoonPhase] = useState('');

  // Map card values to images
  const cardImages = {
    '2': card2,
    '3': card3,
    '4': card4,
    '5': card5,
    '6': card6,
    '7': card7,
    '8': card8,
    '9': card9,
    '10': card10,
    'J': cardJ,
    'Q': cardQ,
    'K': cardK,
    'A': cardA,
  };

  // Function to draw a random card for the player
  const drawRandomCard = () => {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[Math.floor(Math.random() * cards.length)];
  };

  // Function to determine the winner
  const determineWinner = (playerCard, computerCard) => {
    // Define card values for comparison
    const cardValues = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
    const playerValue = cardValues[playerCard];
    const computerValue = cardValues[computerCard];

    // Compare card values to determine the result
    if (playerValue > computerValue) {
      setResult("You win!");
    } else if (playerValue < computerValue) {
      setResult("Computer wins!");
    } else {
      setResult("It's a tie!");
    }
  };

  // UseEffect hook to get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            // Fetch city name using reverse geocoding API (e.g., OpenCage Geocoding API)
            const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`);
            const cityName = geoResponse.data.results[0].components.city || geoResponse.data.results[0].components.town || geoResponse.data.results[0].components.village || '';
            setCity(cityName);
          } catch (error) {
            console.error("Error fetching city name:", error);
            setCity(''); // Keep city empty if there's an error
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to London if location access is denied
          setLocation({ latitude: 51.5074, longitude: -0.1278 });
          setCity(''); // Keep city empty if location access is denied
        }
      );
    }
  }, []);

  // Function to handle drawing cards
  const handleDrawCards = async () => {
    const playerCard = drawRandomCard();
    setPlayerCard(playerCard);

    try {
      // Fetch moon phase data based on user's location
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=moon_phase&timezone=auto`);
      const moonPhaseData = response.data.daily.moon_phase[0];
      setMoonPhase(moonPhaseData); // Set moon phase for display

      let cardRange;
      let explanation;
      switch (moonPhaseData) {
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

      // Determine the winner after both cards are drawn
      determineWinner(playerCard, computerCard);
    } catch (error) {
      console.error("Error fetching moon phase:", error);
      const fallbackCard = drawRandomCard(); // Fallback to random card if API fails
      setComputerCard(fallbackCard);
      setMoonPhaseExplanation("The stars are clouded; randomness prevails.");

      // Determine the winner even if the API call fails
      determineWinner(playerCard, fallbackCard);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '10px',
      position: 'relative' // Allows absolute positioning of elements
    }}>
      {/* Display user's coordinates in the top left */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '14px' }}>
        {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)} {city && `(${city})`}
      </div>

      {/* Display moon phase in the top right if available */}
      {moonPhase && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '14px' }}>
          Moon Phase: {moonPhase}
        </div>
      )}

      {/* Header Image */}
      <img src={decal} alt="Header Decal" style={{ width: '80%', maxWidth: '400px', marginBottom: '5px', height: '50px', objectFit: 'cover' }} />

      <h1 style={{ margin: '5px 0' }}>High Card Game</h1>
      <button onClick={handleDrawCards} style={{ marginBottom: '5px' }}>Draw Your Card</button>

      {/* Container for card images and numbers */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px' }}>
        {/* Player's card */}
        {playerCard && (
          <div style={{ margin: '0 10px', textAlign: 'center' }}>
            <h3>Your Card:</h3>
            <img src={cardImages[playerCard]} alt={`Player's card ${playerCard}`} style={{ width: '120px', height: '180px' }} />
            <p>{playerCard}</p>
          </div>
        )}

        {/* Computer's card */}
        {computerCard && (
          <div style={{ margin: '0 10px', textAlign: 'center' }}>
            <h3>Computer's Card:</h3>
            <img src={cardImages[computerCard]} alt={`Computer's card ${computerCard}`} style={{ width: '120px', height: '180px' }} />
            <p>{computerCard}</p>
          </div>
        )}
      </div>

      {/* Only show result message if there is a result */}
      {result && (
        <div style={{
          marginTop: '10px',
          fontStyle: 'italic',
          fontSize: '24px',
          padding: '5px 10px',
          animation: 'flash 1s infinite alternate'
        }}>{result}</div>
      )}

      <div style={{ marginTop: '5px', fontStyle: 'italic' }}>{moonPhaseExplanation}</div>

      {/* Footer Image */}
      <img src={decal} alt="Footer Decal" style={{ width: '80%', maxWidth: '400px', marginTop: '5px', height: '50px', objectFit: 'cover' }} />

      {/* CSS for flashing effect */}
      <style>
        {`
          @keyframes flash {
            from {
              color: #000;
              background-color: #fff;
              border: 2px solid #fff;
            }
            to {
              color: #fff;
              background-color: transparent;
              border: 2px solid #fff;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;