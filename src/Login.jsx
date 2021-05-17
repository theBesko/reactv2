import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

setTimeout(() => {
  const login = document.getElementById("login");
  login.addEventListener("click", (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
      .then(() => {
       // document.location.reload();
      })
      .catch((event) => {
        console.log(event.message);
      });
  });

  const registerBtn = document.getElementById("register");
  registerBtn.addEventListener("click", (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then((user) => console.log(user))
      .catch((e) => console.log(e.message));

    // document.getElementById("reg").style = "display:block";
  });
}, 1000);

class Login extends Component {
  state = {};

  render() {
    return (
      <div>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email"></input>
        <br></br>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"></input>
        <br></br>
        <button id="login">Login</button>
        <br></br>
        <button id="register">Register</button>
      </div>
    );
  }
}

export default Login;
