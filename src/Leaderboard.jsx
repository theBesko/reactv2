import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const orderedDB = firebase.database().ref().orderByChild("score");
var dbArray = [];

setTimeout(() => {
  function load() {
    var level = 1;
    var next = 50;
    var score;
    orderedDB.on("value", (snap) => {
      dbArray = null;
      dbArray = [];
      snap.forEach((data) => {
        var value = data.val();
        score = value.score;
        while (next < score) {
          next += 50 + level * 10;
          level++;
        }

        dbArray.push({ username: data.key, score: value.score, level: level });
        level = 1;
        next = 50;
      });

      var table = "<table>";
      let j = 0;
      for (let i = dbArray.length - 1; i >= 0; i--) {
        j++;
        table +=
          "<tr><td>" +
          j +
          ". " +
          dbArray[i]["username"] +
          "</td><td>" +
          dbArray[i]["score"] +
          "</td><td>" +
          dbArray[i]["level"] +
          "</td></tr>";
      }
      table += "</table>";
      document.getElementById("leadertable").innerHTML = table;
    });
  }
  load();

  document.getElementById("mainmenu2").addEventListener("click", () => {
    document.location.reload();
  });
}, 100);

class Leaderboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <div id="leadertable"></div>
        <button id="mainmenu2">Back</button>
      </div>
    );
  }
}

export default Leaderboard;
