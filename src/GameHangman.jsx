import React, { Component } from "react";
import shuffle from "./shuffle";
import phraseCollection from "./GameHangmanPhrase";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const auth = firebase.auth();

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
    document.getElementById("ending").style.display = "";
    document.getElementById("ending").innerHTML = "Congrats, you solved it!";

    document.getElementById("leavehm").style.display = "";
    pointToDB(50 - 5 * Math.abs(steps - 10));
  }
  if (steps === 0) {
    document.getElementById("hangmanscreen").style.display = "none";
    document.getElementById("leavehm").style.display = "";
    document.getElementById("ending").style.display = "";
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
      "Correct! (+" +
      (50 - 5 * Math.abs(steps - 10)) +
      "/50pts)<br>Remaining mistakes: " +
      steps;
  } else {
    steps--;
    document.getElementById("err").innerHTML =
      "Wrong! (+" +
      (50 - 5 * Math.abs(steps - 10)) +
      "/50pts)<br>Remaining mistakes: " +
      steps;
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
        <button className="bckmm" id="mainmenu4">
          Back
        </button>

        <div id="hangmanscreen">
          <h2 id="err">Remaining mistakes: 10</h2>
          <div id="guessWord"></div>
          <div id="letters"></div>
        </div>
        <div id="ldbcenter">
          <div>
            <h1 className="titleMenu" id="ending" style={{ display: "none" }}>
              .
            </h1>
            <button
              style={{ display: "none" }}
              className="btnMenu"
              id="leavehm"
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameHangman;
