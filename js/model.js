"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getAuth,
  // connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// import { firestore } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuvqd5vY9lr6hw3UiXwOlAy7odt-YGN4A",
  authDomain: "bito-naturals-13fc2.firebaseapp.com",
  projectId: "bito-naturals-13fc2",
  storageBucket: "bito-naturals-13fc2.appspot.com",
  messagingSenderId: "577214822635",
  appId: "1:577214822635:web:04841fb91a9d876c33a6ae",
  measurementId: "G-MR134BFF88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const greeting = document.querySelector(".user");
const consultName = document.querySelector(".consultName");
const consultEmail = document.querySelector(".consultEmail");
const customerName = document.querySelector(".customerName");
const customerPhone = document.querySelector(".customerNumber");
const profileName = document.querySelector(".proUserName");
const profileEmail = document.querySelector(".proEmail");
const profilePhone = document.querySelector(".proPhone");

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    // alert("good");
    // console.log(user);
    greeting.textContent = user.displayName;
    consultName.value = user.displayName;
    profileName.value = user.displayName;
    customerName.value = user.displayName;
    customerPhone.value = user.phoneNumber;
    consultEmail.value = user.email;
    profileEmail.value = user.email;
    profilePhone.value = user.phoneNumber;
    // customerEmail.value = user.email;
  } else {
    // alert("bad");
  }
});

// alert("hi");

const cartBtn = document.querySelectorAll(".btn--cart");
const products = document.querySelectorAll(".products");

const prodContainer = document.querySelector(".products-container");

cartBtn.forEach((btn, c) => {
  btn.addEventListener("click", (e) => {
    products.forEach((prod, p) => {
      if (c === p) {
        const productDetails =
          document.querySelector(".product-details").textContent;
        const productTitle = document.querySelector(".title").textContent;
        const productPrice = document.querySelector(".price").textContent;

        try {
          const docRef = addDoc(collection(db, "cart"), {
            productname: productDetails,
            title: productTitle,
            price: productPrice,
          });
        } catch (e) {
          alert("Error adding document: ", e);
        }
      }
    });
  });
});

prodContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn--cart");
  if (!clicked) return;
});

console.log(prodContainer.childNodes);
