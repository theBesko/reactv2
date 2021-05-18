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
        
        <button id="logout">LOGOUT</button>
        <div style={{display: "none"}} className="progress">
          <span id="progress-value">60%</span>
          <div className="progress-bar" id="pb" style={{width: "60%"}}></div>
        </div>
       
        <div id="menuContainer">
          <div id="menu">
          <h1 id="titleMenu">SzegziGameszko</h1>
            <button className="btnMenu" id="btnGuess">
              Guess the Word
            </button>
            <br />
            <button className="btnMenu" id="btnHangman">
              Guess the Letters
            </button>
            <br />
            <button className="btnMenu" id="btnLadder">
              Climb the Ladder
            </button>
            <br />
            <button className="btnMenu" id="btnLeader">
              Leaderboard
            </button>
          </div>
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
  const pbval = document.getElementById("progress-value");

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
          limit = 50 + level * 10;
          next += limit;
          level++;
        }

        scoreLevel = limit - (next - score);
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
        //  console.log(scoreLevel);
        pbdiv.ariaValueNow = scoreLevel;
        // pbdiv.innerHTML = "Level " + level + "(" + score + " / " + next + ")";
        pbval.innerHTML = "Level " + level + "(" + score + " / " + next + ")";
        pbdiv.style.width = (scoreLevel / limit) * 100 + "%";
      });
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      kiir();
    }
  });
}, 500);

export default App;
