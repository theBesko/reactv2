import React, { Component } from "react";
import shuffle from "./shuffle";
import optionCollection from "./GameGuessWordArray";
import imageArr from "./GameGuessImageLinks";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var gameArray = shuffle(optionCollection);

var goodOption, bt1, bt2, bt3, bt4, btNext, btLeave;
var currentRound = 0;
const finalRound = 3;
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

    document.getElementById("imgsrc").src = imageArr[goodOption.toLowerCase()];

    for (let j = 0; j < 4; j++) {
      var u = gameArray[round][j];
      var uu = u.replaceAll("_", " ");
      document.getElementById("bt" + (j + 1)).innerHTML = uu;
    }

    [bt1, bt2, bt3, bt4].forEach((e) => {
      e.addEventListener("click", () => {
        document.getElementById("temp").style.display = "";
        if (e.innerHTML === goodOption) {
          document.getElementById("temp").innerHTML = "Correct!";
          isCorrect = true;
        } else {
          var o = goodOption;
          var oo = o.replaceAll("_", " ");
          document.getElementById("temp").innerHTML =
            "Wrong, the answer is " + oo + "!";
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
    document.getElementById("temp").style.display = "none";
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
        <button className="bckmm" id="mainmenu">
          Back
        </button>
        <div id="guessTbtn">
          <div>
            <h1 id="roundtitle">
              Round 1 <br /> What's on the picture?
            </h1>
            <h3>Choose from the following options!</h3>
            <table>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <img src="" id="imgsrc" alt="kép helye"></img>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className="optionBtn" id="bt1"></button>
                  </td>
                  <td>
                    <button className="optionBtn" id="bt2"></button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button className="optionBtn" id="bt3"></button>
                  </td>
                  <td>
                    <button className="optionBtn" id="bt4"></button>
                  </td>
                </tr>
              </tbody>
            </table>

            <h2 id="temp" style={{ display: "none" }}>
              .
            </h2>
            <button className="btnMenu" id="btNext" style={{ display: "none" }}>
              Next
            </button>
            <button
              className="btnMenu"
              id="btLeave"
              style={{ display: "none" }}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameGuess;
