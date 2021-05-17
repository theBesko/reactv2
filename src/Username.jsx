import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

setTimeout(() => {
  const addNameBtn = document.getElementById("setusername");
  addNameBtn.addEventListener("click", (e) => {
    const username = document.getElementById("usernameinput").value;
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: username,
      })
      .then(() => {
        // document.getElementById("username").style.display="none";
        // document.getElementById("app").style.display="";
        document.location.reload();
      })
      .catch((e) => console.log(e.message));
    firebase.database().ref().child(username).update({ score: 0 });
  });
}, 2000);

class Username extends Component {
  state = {};
  render() {
    return (
      <div>
        <label htmlFor="usernameinput">Username</label>
        <input id="usernameinput"></input>
        <button id="setusername">My Name!</button>
      </div>
    );
  }
}

export default Username;