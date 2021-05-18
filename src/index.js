import React from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./app.scss";
import App from "./App";
import Login from "./Login";
import Username from "./Username";
import GameGuess from "./GameGuess";
import Leaderboard from "./Leaderboard";
import GameLadder from "./GameLadder";
import GameHangman from "./GameHangman";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const auth = firebase.auth();

document.getElementById("root").style.display = "none";

setTimeout(() => {
  document.getElementById("root").style.display = "";
}, 500);

const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");
const unDiv = document.getElementById("username");
const game1Div = document.getElementById("game1");
const game2Div = document.getElementById("game2");
const game3Div = document.getElementById("game3");
const leaderboard = document.getElementById("leaderboard");

auth.onAuthStateChanged((user) => {
  if (user) {
    if (auth.currentUser.displayName !== null) {
      appDiv.style.display = "block";
      loginDiv.style.display = "none";
      unDiv.style.display = "none";
    } else {
      loginDiv.style.display = "none";
      appDiv.style.display = "none";
      unDiv.style.display = "block";
    }
  } else {
    loginDiv.style.display = "block";
    appDiv.style.display = "none";
    unDiv.style.display = "none";
  }
});

setTimeout(() => {
  game1Div.style.display = "none";
  game2Div.style.display = "none";
  game3Div.style.display = "none";
  leaderboard.style.display = "none";

  const btnGame1 = document.getElementById("btnGuess");
  const btnGame2 = document.getElementById("btnHangman");
  const btnGame3 = document.getElementById("btnLadder");
  const btnLeader = document.getElementById("btnLeader");

  btnGame1.addEventListener("click", () => {
    hideElse(game1Div);
  });

  btnGame2.addEventListener("click", () => {
    hideElse(game2Div);
  });
  btnGame3.addEventListener("click", () => {
    hideElse(game3Div);
  });
  btnLeader.addEventListener("click", () => {
    hideElse(leaderboard);
  });

  function hideElse(parDiv) {
    var x = [appDiv, btnGame1, btnGame2, btnGame3, btnLeader];
    for (let e in x) {
      x[e].style.display = "none";
    }
    parDiv.style.display = "block";
  }
}, 100);

ReactDom.render(<App />, appDiv);
ReactDom.render(<Login />, loginDiv);
ReactDom.render(<Username />, unDiv);
ReactDom.render(<GameGuess />, game1Div);
ReactDom.render(<GameHangman />, game2Div);
ReactDom.render(<GameLadder />, game3Div);
ReactDom.render(<Leaderboard />, leaderboard);
