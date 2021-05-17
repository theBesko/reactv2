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

  novel() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var szam;

        const userdb = firebase
          .database()
          .ref()
          .child(auth.currentUser.displayName);
        userdb.child("score").once("value", (snap) => {
          szam = snap.val();
          szam++;
        });

        setTimeout(() => {
          
          userdb.update({ score: szam });
          kiir();
        }, 100);
      }
    });
  }

  render() {
    return (
      <div>
        <p id="kiir"></p>

        <button onClick={this.novel}>+PONT</button>
        <br></br>

        <p id="hiba"></p>
        <button id="logout">LOGOUT</button>
      </div>
    );
  }
}

auth.onAuthStateChanged((user) => {
  if (user) {
    kiir();
  }
});

function kiir() {
  var score;

  firebase
    .database()
    .ref()
    .child(auth.currentUser.displayName)
    .child("score")
    .once("value")
    .then((snap) => {
      score = snap.val();
      document.getElementById("kiir").innerHTML =
        "currently signed in as: <b>" +
        auth.currentUser.displayName +
        "</b>    score: " +
        score +
        " pts";
    });
}

setTimeout(() => {
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", (event) => {
    firebase.auth().signOut();

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
}, 1000);

export default App;
