import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "./cfg";

firebase.initializeApp(config);

//const database = firebase.database().ref();
const auth = firebase.auth();

//database.on("value", (snap) => console.log(snap.val()));

class App extends Component {
  state = {};

  // novel() {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       var szam;

  //       const userdb = firebase
  //         .database()
  //         .ref()
  //         .child(auth.currentUser.displayName);
  //       userdb.child("score").once("value", (snap) => {
  //         szam = snap.val();
  //         szam++;
  //       });

  //       setTimeout(() => {
  //         userdb.update({ score: szam });
  //         kiir();
  //       }, 100);
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <p id="kiir"></p>
        <div className="progress">
          <div id="pb"  className="progress-bar" role="progressbar"></div>
        </div>

        <button id="logout">LOGOUT</button>

        <div>
          <button id="btnGuess">Guess the Word</button>
          <button id="btnHangman">Guess the Letters</button>
          <button id="btnLadder">Climb the Ladder</button>
          <button id="btnLeader">Leaderboard</button>
        </div>
      </div>
    );
  }
}

setTimeout(() => {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    firebase.auth().signOut();

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });

  const kiirdiv = document.getElementById("kiir");
  const pbdiv = document.getElementById("pb");

  function kiir() {
    var score;
    var level = 1;
    var next = 50;
    var limit;
    var scoreLevel;

    firebase
      .database()
      .ref()
      .child(auth.currentUser.displayName)
      .child("score")
      .once("value")
      .then((snap) => {
        score = snap.val();

        while (next < score) {
          limit = 50+(level*10);
          next += limit;
          level++;
        }

        scoreLevel=limit-(next-score);
        kiirdiv.innerHTML =
          "currently signed in as: <b>" +
          auth.currentUser.displayName +
          "</b> score: " +
          score +
          "/" +
          next +
          " pts LEVEL: " +
          level;

        pbdiv.ariaValueMin = limit - (50 + level * 10);
        pbdiv.ariaValueMax = limit;
        console.log(scoreLevel)
        pbdiv.ariaValueNow = scoreLevel;
        pbdiv.innerHTML = "Level " + level + "(" + score + " / " + next + ")";
        pbdiv.style.width = (scoreLevel/limit)*100+"%";
      });
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      kiir();
    }
  });
}, 500);

export default App;
