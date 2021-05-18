import React, { Component } from "react";
import shuffle from "./shuffle";
import optionCollection from "./GameGuessWordArray";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var gameArray = shuffle(optionCollection);

var goodOption, bt1, bt2, bt3, bt4, btNext, btLeave;
var currentRound = 0;
const finalRound = 15;
const auth = firebase.auth();

setTimeout(() => {
  var point = 0;
  bt1 = document.getElementById("bt1");
  bt2 = document.getElementById("bt2");
  bt3 = document.getElementById("bt3");
  bt4 = document.getElementById("bt4");
  btNext = document.getElementById("btNext");
  btLeave = document.getElementById("btLeave");
  var isCorrect = false;

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
          setTimeout(() => {
            document.location.reload();
          }, 200);
        }, 100);
      }
    });
  }

  function round(round) {
    isCorrect = false;
    bt1.style.display = "";
    bt2.style.display = "";
    bt3.style.display = "";
    bt4.style.display = "";

    shuffle(gameArray[round]);
    goodOption = gameArray[round][Math.floor(Math.random() * 4)];

    document.getElementById("correct").innerHTML = goodOption;

    for (let j = 0; j < 4; j++) {
      document.getElementById("bt" + (j + 1)).innerHTML = gameArray[round][j];
    }

    [bt1, bt2, bt3, bt4].forEach((e) => {
      e.addEventListener("click", () => {
        if (e.innerHTML === goodOption) {
          document.getElementById("temp").innerHTML = "CORRECT";
          isCorrect = true;
        } else {
          document.getElementById("temp").innerHTML =
            "WRONG, the answer is " + goodOption;
        }
        btNext.style.display = "";
        bt1.style.display = "none";
        bt2.style.display = "none";
        bt3.style.display = "none";
        bt4.style.display = "none";
      });
    });
  }

  btLeave.addEventListener("click", () => {
    pointToDB(point);
  });

  btNext.addEventListener("click", () => {
    if (isCorrect) {
      if (currentRound < 5) point += 1;
      if (currentRound >= 5 && currentRound < 10) point += 2;
      if (currentRound >= 10 && currentRound < 15) point += 5;
    }
    currentRound++;
    document.getElementById("temp").innerHTML = "";
    if (currentRound < finalRound) {
      btNext.style.display = "none";
      round(currentRound);
    } else {
      btNext.style.display = "none";
      btLeave.style.display = "";
    }
    console.log(currentRound);
    console.log(point);
  });

  document.getElementById("mainmenu").addEventListener("click", () => {
    document.location.reload();
  });

  round(0);
}, 200);

class GameGuess extends Component {
  state = {};
  render() {
    return (
      <div>
        <button className="bckmm" id="mainmenu">Back</button>
        <div>
          <img
            height={200}
            width={200}
            src="//live.staticflickr.com/5238/5913452967_2c1cde583b_b.jpg"
            id="rndimg"
            alt="kép helye"
          ></img>
          <p id="correct"></p>
          <p id="temp"></p>
          <button id="bt1"></button>
          <button id="bt2"></button>
          <button id="bt3"></button>
          <button id="bt4"></button>
          <button id="btNext" style={{ display: "none" }}>
            Next
          </button>
          <button id="btLeave" style={{ display: "none" }}>
            Leave
          </button>
        </div>
      </div>
    );
  }
}

export default GameGuess;
