import React from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./app.scss";
import App from "./App";
import Login from "./Login";
import Username from "./Username";
import Game from "./Game"

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";



const auth = firebase.auth();

const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");
const unDiv = document.getElementById("username");
const gameDiv = document.getElementById("game1");

auth.onAuthStateChanged((user) => {
  if (user) {
    if (auth.currentUser.displayName !== null) {
      appDiv.style = "display:block";
      loginDiv.style = "display:none";
      unDiv.style = "display:none";
    } else {
      loginDiv.style = "display:none";
      appDiv.style = "display:none";
      unDiv.style = "display:block";
    }
  } else {
    loginDiv.style = "display:block";
    appDiv.style = "display:none";
    unDiv.style = "display:none";
  }
});

ReactDom.render(<App />, appDiv);
ReactDom.render(<Login />, loginDiv);
ReactDom.render(<Username />, unDiv);
ReactDom.render(<Game />, gameDiv);
