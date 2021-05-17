import React, { Component } from "react";
import shuffle from "./shuffle"

var phraseCollection = [
  "what this sentence supposed to mean?",
  "My name is Jeff.",
  "Theory of Computation",
];

const phrase =  phraseCollection[Math.floor(Math.random() * phraseCollection.length)];

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

  var category = Math.floor(Math.random() * optionCollection.length);
  shuffle(optionCollection[category]);

  const goodOption = optionCollection[category][Math.floor(Math.random() * 4)];

  document.getElementById("correct").innerHTML = goodOption;

  for (let i = 0; i < 4; i++) {
    document.getElementById("bt" + (i + 1)).innerHTML =
      optionCollection[category][i];
  }

  const bt1 = document.getElementById("bt1");
  const bt2 = document.getElementById("bt2");
  const bt3 = document.getElementById("bt3");
  const bt4 = document.getElementById("bt4");

  [bt1, bt2, bt3, bt4].forEach((e) => {
    e.addEventListener("click", () => {
      if (e.innerHTML === goodOption) {
        document.getElementById("temp").innerHTML = "CORRECT";
      } else {
        document.getElementById("temp").innerHTML =
          "WRONG, the answer is " + goodOption;
      }
    });
  });
}, 1000);



var optionCollection = [
  ["English", "Hungarian", "German", "Irish"],
  ["Gyros", "Pizza", "Hamburger", "Stew"],
  ["PE", "History", "Literature", "Grammar"],
];
 
var imgs = {pizza: "//live.staticflickr.com/5238/5913452967_2c1cde583b_b.jpg"};

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

        <div style={{ marginTop: 100 }}>
          <img height={200} width={200} src={imgs["pizza"]} id="rndimg" alt="kép helye" ></img>
          <p id="correct"></p>
          <p id="temp"></p>
          <button id="bt1"></button>
          <button id="bt2"></button>
          <button id="bt3"></button>
          <button id="bt4"></button>
        </div>
      </div>
    );
  }
}

export default Game;
