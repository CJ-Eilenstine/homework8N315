import * as Model from "./model";
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDg8Svv86IusSrtQNPvcvJm_FOl1ztE7_A",
  authDomain: "m315-cje.firebaseapp.com",
  projectId: "m315-cje",
  storageBucket: "m315-cje.appspot.com",
  messagingSenderId: "940701497831",
  appId: "1:940701497831:web:08d6fe9a4863558dbfa542",
  measurementId: "G-06PR9LSKCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the authentication instance
const auth = getAuth(app);

// URL Listener

function initURLListener() {
  $(window).on("hashchange", Model.changeRoute);
  Model.changeRoute();
}

$(document).on("click", "#createAcctBtn", function (e) {
  e.preventDefault();
  console.log("You have signed up");
  let fName = $("#fNameC").val();
  let lName = $("#lNameC").val();
  let email = $("#emailC").val();
  let pw = $("#pwC").val();

  createUserWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      $(".logBtn").addClass("signBtn");
      $(".logBtn").html("Logout");
      alert("Sign up successful!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
});

$(document).on("click", "#loginBtn", function (e) {
  e.preventDefault();
  console.log("You have logged in");
  let email = $("#email").val();
  let pw = $("#pw").val();

  signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      $(".logBtn").addClass("signBtn");
      $(".logBtn").html("Logout");
      alert("Login successful!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
});

$(document).on("click", ".signBtn", function (e) {
  signOut(auth)
    .then(() => {
      console.log("signed out");
      $(".logBtn").removeClass("signBtn");
      $(".logBtn").html("Login");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Message: " + errorMessage);
    });
});

$(document).ready(function () {
  initURLListener();
});

$("#app").on("click", ".hamburger", function () {
  $(this).toggleClass("open");
});
