import React, { Component } from "react";
import shuffle from "./shuffle";
import questionColletcion from "./GameLadderQArray";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var gameArray = shuffle(questionColletcion);

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
    if (isHalve) btnHalve.style.display = "";
    if (isHelp) btnHelp.style.display = "";
    bt1.style.display = "";
    bt2.style.display = "";
    bt3.style.display = "";
    bt4.style.display = "";
    document.getElementById("question").innerHTML =
      "Round " +
      (currentRound + 1) +
      " <small>(+" +
      (currentRound + 1) +
      "pts)</small><br> " +
      gameArray[round]["q"];
    shuffle(gameArray[round]["a"]);
    goodOption = gameArray[round]["c"];

    // document.getElementById("isCorrect").innerHTML = goodOption;

    for (let j = 0; j < 4; j++) {
      document.getElementById("btn" + (j + 1)).innerHTML =
        gameArray[round]["a"][j];
    }

    [bt1, bt2, bt3, bt4].forEach((e) => {
      e.addEventListener("click", () => {
        if (e.innerHTML === goodOption) {
          isCorrect = true;
          var xyz = gameArray[round]["q"];
          var zyx =
            goodOption === "---"
              ? xyz.replace("___ ", "")
              : xyz.replace("___", goodOption);
          document.getElementById("question").innerHTML =
            "Correct: '" + zyx + "'";
          document.getElementById("btnLeave").style.display = "";
          document.getElementById("btnLeave").innerHTML =
            "Leave and Take your " + (point + currentRound + 1) + " points!";
        } else {
          document.getElementById("gamecontent").style.display = "none";
          var t =
            "Wrong, the answer was '" +
            goodOption +
            "'! Better luck next time!<br>" +
            "Returning to Main Menu in ";

          var so = document.getElementById("sendoff");
          so.style.display = "";

          so.innerHTML = t + 5 + "...";
          setTimeout(() => {
            so.innerHTML = t + 4 + "...";
          }, 1000);

          setTimeout(() => {
            so.innerHTML = t + 3 + "...";
          }, 2000);

          setTimeout(() => {
            so.innerHTML = t + 2 + "...";
          }, 3000);

          setTimeout(() => {
            so.innerHTML = t + 1 + "...";
          }, 4000);

          setTimeout(() => {
            document.location.reload();
          }, 5200);
        }

        btNext.style.display = "";
        btnHalve.style.display = "none";
        btnHelp.style.display = "none";
        bt1.style.display = "none";
        bt2.style.display = "none";
        bt3.style.display = "none";
        bt4.style.display = "none";
      });
    });
  }

  btLeave.addEventListener("click", () => {
    pointToDB(point + currentRound + 1);
  });

  btNext.addEventListener("click", () => {
    document.getElementById("isCorrect").innerHTML = "";

    if (currentRound < finalRound-1) {
      if (isCorrect) {
        currentRound++;
        point += currentRound;
      }
      btNext.style.display = "none";
      btLeave.style.display = "none";
      round(currentRound);
    } else {
      btNext.style.display = "none";
      btLeave.style.display = "";
    }
  });

  btnHelp.addEventListener("click", () => {
    if (isHelp) {
      bt1.style.display =
        bt1.innerHTML === gameArray[currentRound]["c"] ? "" : "none";
      bt2.style.display =
        bt2.innerHTML === gameArray[currentRound]["c"] ? "" : "none";
      bt3.style.display =
        bt3.innerHTML === gameArray[currentRound]["c"] ? "" : "none";
      bt4.style.display =
        bt4.innerHTML === gameArray[currentRound]["c"] ? "" : "none";
      isHelp = false;
    } else {
    }
  });

  btnHalve.addEventListener("click", () => {
    if (isHalve) {
      btnHalve.style.display = "none";
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
        <div id="ladderTbtn">
          <div>
            <div id="gamecontent">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button className="optionBtn" id="btnHalve">
                        50/50
                      </button>
                    </td>
                    <td>
                      <button className="optionBtn" id="btnHelp">
                        Help!
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <h1 style={{ paddingTop: "75px" }} id="question">
                        .
                      </h1>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button className="optionBtn" id="btn1"></button>
                    </td>
                    <td>
                      <button className="optionBtn" id="btn2"></button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="optionBtn" id="btn3"></button>
                    </td>
                    <td>
                      <button className="optionBtn" id="btn4"></button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <h1 id="isCorrect" style={{ display: "none" }}>
                        .
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button
                        className="btnMenu"
                        id="btnNext"
                        style={{ display: "none" }}
                      >
                        Next Round
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button
                        className="btnMenu"
                        id="btnLeave"
                        style={{ display: "none" }}
                      >
                        Leave
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h1 id="sendoff" style={{ display: "none" }}>
              .
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default GameLadder;
