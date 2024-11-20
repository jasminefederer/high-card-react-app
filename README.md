// high card react app


*description*

the computer's card selection is uniquely influenced by the moon phase at the player's current location. By utilizing the Geolocation API to determine the user's position and integrating with the Open-Meteo API for real-time moon phase data, the game introduces a celestial element to randomness, appending it to natural phenomena. Each moon phase corresponds to specific card ranges and thematic statements.


*to do list / notes to self:*

- add keys for and add to README.md and upload to vercel

- add instructions to run react app locally on README.md

- add pseudo celestial about page


*moon phase to card value mapping*

New Moon:

Card Range: 2, 3, 4, 5
Explanation: The New Moon represents beginnings and potential, so the computer draws from the lower end of the card spectrum.

Waxing Crescent:

Card Range: 6, 7
Explanation: As the moon begins to grow, it symbolizes growth and progress, thus the computer draws mid-range cards.

First Quarter:

Card Range: 8, 9
Explanation: At this phase, balance and decision-making are key, so the computer draws from a balanced middle range.

Waxing Gibbous:

Card Range: 10, J
Explanation: The nearly full moon suggests ambition and near-completion, leading to higher-value cards.

Full Moon:

Card Range: Q, K
Explanation: The Full Moon signifies fullness and culmination, so the computer has access to high-value cards.

Waning Gibbous (and other waning phases):

Card Range: A
Explanation: As the moon begins to wane, reflecting on past achievements, the computer draws the highest card, representing reflection and mastery.
