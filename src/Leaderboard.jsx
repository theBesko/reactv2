import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const orderedDB = firebase.database().ref().orderByChild("score");
var dbArray = [];

const auth = firebase.auth();

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

      //

      // var arrrrr = [
      //   "Josh",
      //   "Alex",
      //   "András",
      //   "Tamás",
      //   "Dr. Digszám",
      //   "Büntetöző Krisz",
      //   "Sehonnai bitang ember",
      //   "Ősi vad kit rettenet űz",
      //   "John",
      //   "Steve",
      //   "Sam",
      //   "newGuy",
      //   "Noobmaster69",
      //   "Ki ez az Nber",
      //   "New Profile #2223",
      //   "abc",
      //   "Digszámvizsga",
      //   "Centered Div",
      //   "NincsHosszabító",
      //   "banTikTok",
      //   "asda",
      // ];

      // var szkor = 3420;
      // var szintecske = 23;

      // dbArray = null;
      // dbArray = [];
      // for (let i = 0; i < 21; i++) {
      //   dbArray.push({ username: arrrrr[i], score: szkor, level: szintecske });
      //   szkor -= 23;
      //   if (szkor < 3200) szintecske = 22;
      // }

      //

      var table =
        "<table><tr id='firstrow'><td>No.</td><td class='ply'>Player</td><td>Score</td><td class='nopad'>Level</td></tr>";
      let j = 0;
      for (
        let i = dbArray.length - 1;
        i >= (dbArray.length > 20 ? dbArray.length - 20 : 0);
        i--
      ) {
        // for(let i =0;i<20;i++){
        j++;
        table +=
          "<tr><td>" +
          j +
          ". </td><td class='ply'>" +
          dbArray[i]["username"] +
          "</td><td>" +
          dbArray[i]["score"] +
          "</td><td class='nopad'>" +
          dbArray[i]["level"] +
          "</td></tr>";
      }
      // j = 0;
      // for (let i = dbArray.length - 1; i >= 0; i--) {
      //   j++;
      //   if (dbArray[i]["username"] === auth.currentUser.displayName) {
      //     table +=
      //       "<tr><td>" +
      //       j +
      //       ". </td><td class='ply'>" +
      //       dbArray[i]["username"] +
      //       "</td><td>" +
      //       dbArray[i]["score"] +
      //       "</td><td class='nopad'>" +
      //       dbArray[i]["level"] +
      //       "</td></tr>";
      //   }
      // }
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
        <button className="bckmm" id="mainmenu2">
          Back
        </button>
        <div id="lbtable">
          <div id="leadertable"></div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
