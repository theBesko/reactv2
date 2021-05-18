import React, { Component } from "react";
import shuffle from "./shuffle";
import optionCollection from "./GameGuessWordArray";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const auth = firebase.auth();

var phraseCollection = [
  "what this sentence supposed to mean",
  "My name is Jeff",
  "Theory of Computation",
];

var steps = 10;
var found = false;

const phrase =
  phraseCollection[Math.floor(Math.random() * phraseCollection.length)];

var word = "";

var wordArray = [];
var phraseArray = [];

for (let i = 0; i < phrase.length; i++) {
  if (i < phrase.length && phrase.charAt(i) !== " ") {
    word += "_";
    wordArray[i] = "_";
  }
  if (i < phrase.length && phrase.charAt(i) === " ") {
    word += " ";
    wordArray[i] = " ";
  }

  phraseArray[i] = phrase.charAt(i);
}

function endgame() {
  if (!word.includes("_")) {
    document.getElementById("hangmanscreen").style.display = "none";
    document.getElementById("ending").innerHTML = "Congrats, you solved it!";

    document.getElementById("leavehm").style.display = "";
    pointToDB(50 - 5 * Math.abs(steps - 10));
  }
  if (steps === 0) {
    document.getElementById("hangmanscreen").style.display = "none";
    document.getElementById("leavehm").style.display = "";
    document.getElementById("ending").innerHTML = "Better luck next time!";
  }
}

function pointToDB(par) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      var szam;

      const userdb = firebase
        .database()
        .ref()
        .child(auth.currentUser.displayName);
      userdb.child("score").once("value", (snap) => {
        szam = snap.val();
        szam += par;
        console.log(szam);
      });

      setTimeout(() => {
        userdb.update({ score: szam });
      }, 100);
    }
  });
}

function guessing(letter) {
  word = "";
  for (let i = 0; i < phraseArray.length; i++) {
    if (phraseArray[i].toUpperCase() === letter.toUpperCase()) {
      wordArray[i] = letter.toUpperCase();
      found = true;
    }
    word += wordArray[i];
  }
  if (found) {
    document.getElementById("err").innerHTML =
      "Correct.." + steps + " steps remaining.";
  } else {
    steps--;
    document.getElementById("err").innerHTML =
      "Wrong.." + steps + " steps remaining.";
  }

  document.getElementById("letter" + letter).style.display = "none";
  document.getElementById("guessWord").innerHTML = word;
  found = false;
  endgame();
}

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var arrLet = letters.split("");
shuffle(arrLet);

function renderLetters() {
  var wordX = "";

  for (let i = 0; i < arrLet.length; i++) {
    wordX +=
      '<button class="hangBtn" id="letter' +
      arrLet[i] +
      '">' +
      arrLet[i] +
      "</button>";
  }

  document.getElementById("letters").innerHTML = wordX;
}

setTimeout(() => {
  renderLetters();
  document.getElementById("tmp").innerHTML = phrase;
  const guess = document.getElementById("guessWord");
  guess.innerHTML = word;
  document.getElementById("leavehm").addEventListener("click", () => {
    document.location.reload();
  });

  for (let i = 0; i < arrLet.length; i++) {
    document
      .getElementById("letter" + arrLet[i])
      .addEventListener("click", () => {
        guessing(arrLet[i]);
      });
  }

  document.getElementById("mainmenu4").addEventListener("click", () => {
    document.location.reload();
  });
}, 1000);

class GameHangman extends Component {
  state = {};
  render() {
    return (
      <div>
        <button id="mainmenu4">Back</button>
        <p id="tmp"></p>
        <p id="err"></p>
        <div id="hangmanscreen">
          <div id="guessWord"></div>
          <div id="letters"></div>
        </div>
        <p id="ending"></p>
        <button style={{ display: "none" }} id="leavehm">
          Leave
        </button>
      </div>
    );
  }
}

export default GameHangman;
