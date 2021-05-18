import React, { Component } from "react";
import shuffle from "./shuffle";
import questionColletcion from "./GameLadderQArray";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var gameArray = questionColletcion; // shuffle(questionColletcion);

var goodOption, bt1, bt2, bt3, bt4, btNext, btLeave, btnHelp, btnHalve;
var currentRound = 0;
const finalRound = 15;
var isHelp = true;
var isHalve = true;
const auth = firebase.auth();

setTimeout(() => {
  var point = 0;
  bt1 = document.getElementById("btn1");
  bt2 = document.getElementById("btn2");
  bt3 = document.getElementById("btn3");
  bt4 = document.getElementById("btn4");
  btNext = document.getElementById("btnNext");
  btLeave = document.getElementById("btnLeave");
  btnHelp = document.getElementById("btnHelp");
  btnHalve = document.getElementById("btnHalve");
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
    document.getElementById("question").innerHTML = gameArray[round]["q"];
    shuffle(gameArray[round]["a"]);
    goodOption = gameArray[round]["c"];

    document.getElementById("isCorrect").innerHTML = goodOption;

    for (let j = 0; j < 4; j++) {
      document.getElementById("btn" + (j + 1)).innerHTML =
        gameArray[round]["a"][j];
    }

    [bt1, bt2, bt3, bt4].forEach((e) => {
      e.addEventListener("click", () => {
        if (e.innerHTML === goodOption) {
          document.getElementById("isCorrect").innerHTML = "CORRECT";
          isCorrect = true;
        } else {
          document.getElementById("isCorrect").innerHTML =
            "WRONG, the answer was " + goodOption + "Better luck next time!";
          document.getElementById("gamecontent").style.display = "none";

          btLeave.style.display = "";
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
    currentRound++;
    if (isCorrect) {
      point += currentRound;
    }
    document.getElementById("isCorrect").innerHTML = "";
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

  btnHelp.addEventListener("click", () => {
    if (isHelp) {
      document.getElementById("help").innerHTML = gameArray[currentRound]["c"];
      isHelp = false;
    } else {
      document.getElementById("help").innerHTML =
        "No more help from the crowd!";
    }
  });

  btnHalve.addEventListener("click", () => {
    if (isHalve) {
      if (bt1.innerHTML === goodOption) {
        bt2.style.display = "none";
        bt3.style.display = "none";
        bt4.style.display = "none";
        var a = [bt2, bt3, bt4];
        a[Math.floor(Math.random() * 3)].style.display = "";
      }
      if (bt2.innerHTML === goodOption) {
        bt1.style.display = "none";
        bt3.style.display = "none";
        bt4.style.display = "none";
        var b = [bt1, bt3, bt4];
        b[Math.floor(Math.random() * 3)].style.display = "";
      }
      if (bt3.innerHTML === goodOption) {
        bt2.style.display = "none";
        bt1.style.display = "none";
        bt4.style.display = "none";
        var c = [bt2, bt1, bt4];
        c[Math.floor(Math.random() * 3)].style.display = "";
      }
      if (bt4.innerHTML === goodOption) {
        bt2.style.display = "none";
        bt3.style.display = "none";
        bt1.style.display = "none";
        var d = [bt2, bt3, bt1];
        d[Math.floor(Math.random() * 3)].style.display = "";
      }
      isHalve = false;
    } else {
      document.getElementById("help").innerHTML = "No more help!";
    }
  });

  document.getElementById("mainmenu3").addEventListener("click", () => {
    document.location.reload();
  });

  round(0);
}, 100);

class GameLadder extends Component {
  state = {};
  render() {
    return (
      <div>
        <button className="bckmm" id="mainmenu3">
          Back
        </button>

        <p id="isCorrect"></p>
        <div id="gamecontent">
          <button id="btnHalve">Felezz</button>
          <button id="btnHelp">Közönség</button>
          <p id="help"></p>
          <p id="question">asd</p>
          <button id="btn1"></button>
          <button id="btn2"></button>
          <button id="btn3"></button>
          <button id="btn4"></button>
          <button id="btnNext" style={{ display: "none" }}>
            Next
          </button>
        </div>
        <button id="btnLeave" style={{ display: "none" }}>
          Leave
        </button>
      </div>
    );
  }
}

export default GameLadder;
