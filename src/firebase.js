// file: src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9K5TujOt-tIN7PD_1pqW0sCZ71mvOhBU",
  authDomain: "heliosrx-example-tracker.firebaseapp.com",
  databaseURL: "https://heliosrx-example-tracker.firebaseio.com",
  projectId: "heliosrx-example-tracker",
  storageBucket: "heliosrx-example-tracker.appspot.com",
  messagingSenderId: "980189815310",
  appId: "1:980189815310:web:34b23edeb371eb9d42925f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime DB
export const rtdb = firebase.database();
