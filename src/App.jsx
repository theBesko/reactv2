import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyARLrRx5a6svIkXpQ-nsYNum5VvXSnBjiM",
  authDomain: "digszamgang.firebaseapp.com",
  databaseURL:
    "https://digszamgang-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "digszamgang.appspot.com",
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database().ref();

database.on("value", (snap) => console.log(snap.val()));

/* database.on("value", (snap) => {
  document.getElementById("temp").innerHTML = JSON.stringify(
    snap.val(),
    null,
    3
  );
});
 */

database.on("value", function (snap) {
  var table = "<table>";
  snap.forEach(function (data) {
    var val = data.val();
    table +=
      "<tr><td>" +
      val.username +
      "</td><td>" +
      val.password +
      "</td><td>" +
      val.point +
      "</td></tr>";
  });
  document.getElementById("table").innerHTML = table;
});

//database.on("value", (snap) => (lista = JSON.parse(snap.val())));

/* function novel(id) {
  var szam;
  const child = firebase.database().ref().child(id).child("point");
  child.on("value", function (snap) {
    szam = snap.val();
  });
  console.log(szam);
  //child.set({ point: (szam + 1) });
} */

class App extends Component {
  state = {};

  novel(id) {
    var szam;
    const leker = firebase.database().ref().child(id).child("point");
    leker.on("value", function (snap) {
      szam = snap.val();
    });
    szam++;
    console.log(szam);
    const upd = firebase.database().ref().child(id);
    upd.update({point:(szam)});
  }

  render() {
    return (
      <div>
        <table id="table"></table>
        <button onClick={() => this.novel("proba")}>elso</button>
        <button onClick={() => this.novel("proba_acc")}>masik</button>
      </div>
    );
  }
}

export default App;
