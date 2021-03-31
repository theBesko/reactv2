import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

var config = {
  apiKey: "AIzaSyARLrRx5a6svIkXpQ-nsYNum5VvXSnBjiM",
  authDomain: "digszamgang.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://digszamgang-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "gs://digszamgang.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

database.child("proba_acc").get().then(function(snapshot) {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  }
  else {
    console.log("No data available");
  }
}).catch(function(error) {
  console.error(error);
});

class App extends Component {
  state = {}; 
  render() {
    return <h1>v10</h1>;
  }
}

export default App;
