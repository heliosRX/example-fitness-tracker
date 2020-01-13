// file: src/firebase.js

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
// import "@firebase/auth";
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

/*
console.log("This build is for deploy target:", process.env.VUE_APP_DEPLOY_TARGET);

const firebaseConfig = {
  apiKey:             process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain:         process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:        process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId:          process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket:      process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:              process.env.VUE_APP_FIREBASE_APP_ID
}
*/

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime DB
export const rtdb = firebase.database();

// Initialize Auth
export const auth = firebase.auth();
