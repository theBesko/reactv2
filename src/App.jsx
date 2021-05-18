import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "./cfg";

firebase.initializeApp(config);
const auth = firebase.auth();

class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <div>
          <button className="bckmm" id="logout">
            Logout
          </button>
        </div>

        <h2 id="kiir">.</h2>
        <div id="menuContainer">
          <div id="menu">
            <h1 className="titleMenu">English-Learninator</h1>
            <button className="btnMenu" id="btnGuess">
              What's on the picture?
            </button>
            <br />
            <button className="btnMenu" id="btnHangman">
              Letter-o-guess
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

  function kiir() {
    var score;
    var level = 1;
    var next = 50;
    var limit;

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

        kiirdiv.innerHTML =
          "Welcome, " +
          auth.currentUser.displayName +
          " (" +
          level +
          ")<br><h3>Your score: " +
          score +
          "/" +
          next +
          "</h3>";
      });
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      kiir();
    }
  });
}, 500);

export default App;
