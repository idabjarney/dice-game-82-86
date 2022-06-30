'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El =  document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function() {
  // Starting conditions
  
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  
  // Reset Score 
  score0El.textContent = 0;
  score1El.textContent = 0;
  
  // Reset current score
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  // Reset the UI back to the normal state
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  
  // Switch to active player = player 1#
  activePlayer = 0;
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // If active player is 0, switch to 1/ if 1 then switch to 0
    activePlayer = activePlayer === 0 
    ? 1 
    : 0; 
    // Toggles the active class on the player background so it will stitch off on whichever is active and switch on the inactive one
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1:
    if (dice !== 1) {
      // Add number to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});



btnHold.addEventListener('click', function() {
  console.log('button pressed');
  if (playing) {
    // 1 Add current score to score of active player
    scores[activePlayer] += currentScore;  
    
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false; // Stops the game 
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // If not - Switch to next player
      switchPlayer();
    }
  }
});

// Reset game logic
btnNew.addEventListener('click', init);