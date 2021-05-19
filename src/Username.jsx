import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

setTimeout(() => {
  const addNameBtn = document.getElementById("setusername");
  addNameBtn.addEventListener("click", (e) => {
    const username = document.getElementById("usernameinput").value;
    firebase
      .database()
      .ref()
      .once("value")
      .then((snap) => {
        if (snap.hasChild(username)) {
          document.getElementById("exist").style.display = "";
          document.getElementById("exist").innerHTML =
            "User with such name already registered!<br>Please choose a different one!";
        } else {
          if (username === "") {
            document.getElementById("exist").style.display = "";
            document.getElementById("exist").innerHTML =
              "You must have a name!";
          } else {
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: username,
              })
              .then(() => {
                document.location.reload();
              })
              .catch((e) => console.log(e.message));
            firebase.database().ref().child(username).update({ score: 0 });
          }
        }
      });
  });
}, 2000);

class Username extends Component {
  state = {};
  render() {
    return (
      <div id="uNameParent">
        <div id="uNameChild">
          <input
            className="inputfield"
            id="usernameinput"
            placeholder="username"
          ></input>
          <button className="uNameBtn" id="setusername">
            My Name!
          </button>
          <h2 id="exist" style={{ display: "none" }}>
            .
          </h2>
        </div>
      </div>
    );
  }
}

export default Username;
