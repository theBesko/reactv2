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
      })
      .catch((event) => {
        document.getElementById("logerror").innerHTML =
           event.message;
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
  });
}, 1000);

class Login extends Component {
  state = {};

  render() {
    return (
      <div id="loginParent">
        <div id="loginCenter">
          <input
            className="inputfield"
            type="text"
            id="email"
            placeholder="e-mail"
          ></input>
          <br />
          <input
            className="inputfield"
            type="password"
            id="password"
            placeholder="password (min. 6)"
          ></input>
          <br />
          <button className="loginButtons" id="login">
            Login
          </button>
          <button className="loginButtons" id="register">
            Register
          </button>
          <p id="logerror" style={{paddingTop: '300px', fontSize: '20px'}}></p>
        </div>
      </div>
    );
  }
}

export default Login;
