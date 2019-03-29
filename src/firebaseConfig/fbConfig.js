import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBhP0q8AYXU-4SfQ1npi_yS_tv_7U3U7BY",
  authDomain: "poll-manager-e3d17.firebaseapp.com",
  databaseURL: "https://poll-manager-e3d17.firebaseio.com",
  projectId: "poll-manager-e3d17",
  storageBucket: "poll-manager-e3d17.appspot.com",
  messagingSenderId: "940823658925"
};
firebase.initializeApp(config);

export default firebase;
