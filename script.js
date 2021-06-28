'use strict';
let scores, current;
let activePlayer;
let winningPoint;
let playing; //game state

//selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.querySelector('#score--1');

const currentPlayer0El = document.querySelector('#current--0');
const currentPlayer1El = document.querySelector('#current--1');

const diceImage = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//reset initial values
const reset = function () {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  winningPoint = 100;
  playing = true;

  scorePlayer0El.textContent = scores[0];
  scorePlayer1El.textContent = scores[1];
  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;
  diceImage.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

reset();

const switchPlayer = function () {
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  if (playing) {
    //generate random number
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //show dice image
    diceImage.src = `dice-${diceNumber}.png`;
    diceImage.classList.remove('hidden');

    //if dice equals 1 switch player
    if (diceNumber === 1) {
      current = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      switchPlayer();
    } else {
      current += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    }
  }
};

const hold = function () {
  if (playing) {
    scores[activePlayer] += current;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    current = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    //check if player has won
    if (scores[activePlayer] >= winningPoint) {
      let activePlayerEl = document.querySelector(`.player--${activePlayer}`);

      activePlayerEl.classList.add('player--winner');
      activePlayerEl.classList.remove('player--active');

      diceImage.classList.add('hidden');

      //set game state to false
      playing = false;
    } else {
      switchPlayer();
    }
  }
};

btnNewGame.addEventListener('click', reset);
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
