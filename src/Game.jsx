import React, { Component } from "react";
import shuffle from "./shuffle";

var phraseCollection = [
  "what this sentence supposed to mean?",
  "My name is Jeff.",
  "Theory of Computation",
];

const phrase =
  phraseCollection[Math.floor(Math.random() * phraseCollection.length)];

var word = "";

var wordArray = [];
var phraseArray = [];

for (let i = 0; i < phrase.length; i++) {
  if (i < phrase.length - 1 && phrase.charAt(i) !== " ") {
    word += "_";
    wordArray[i] = "_";
  }
  if (i < phrase.length - 1 && phrase.charAt(i) === " ") {
    word += " ";
    wordArray[i] = " ";
  }
  if (i === phrase.length - 1 && phrase.endsWith("?")) {
    word += "?";
    wordArray[i] = "?";
  }
  if (i === phrase.length - 1 && !phrase.endsWith("?")) {
    word += "";
    wordArray[i] = "";
  }

  phraseArray[i] = phrase.charAt(i);
}

function guessing(letter) {
  word = "";
  for (let i = 0; i < phraseArray.length; i++) {
    if (phraseArray[i].toUpperCase() === letter.toUpperCase()) {
      wordArray[i] = letter.toUpperCase();
    }
    word += wordArray[i];
  }
  return word;
}

setTimeout(() => {
  const guess = document.getElementById("guess");
  guess.innerHTML = word;
  const tryBtn = document.getElementById("try");
  tryBtn.addEventListener("click", () => {
    const letter = document.getElementById("letter").value;
    guess.innerHTML = guessing(letter);
  });
}, 1000);

class Game extends Component {
  state = {};

  render() {
    return (
      <div style={{ marginTop: 100 }}>

        <p>Guess:</p>
        <p id="guess"></p>
        <p id="result"></p>
        <input
          id="letter"
          type="text"
          pattern="[A-Za-z]{1}"
          maxLength="1"
        ></input>
        <button id="try">Try!</button>
      </div>
    );
  }
}

export default Game;
