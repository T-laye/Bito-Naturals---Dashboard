"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  // connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
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

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    greeting.textContent = user.displayName;
    consultName.value = user.displayName;
    profileName.value = user.displayName;
    customerName.value = user.displayName;
    customerPhone.value = user.phoneNumber;
    consultEmail.value = user.email;
    profileEmail.value = user.email;

    const storage = getStorage(app);
    const storageRef = ref(storage, `profile-pic/`);
    const newRef = ref(storage, `update-pic/`);
    const photoId = document.querySelector("#miniImg");
    const bigPhotoId = document.querySelector("#profile-display-image");

    // const userId = userCredential.user.uid;
    // const prPhoto = document.querySelector("#photo");

    try {
      const fileInput = document.getElementById("file");

      // fileInput.addEventListener("change", function (e) {
      // console.log(file + "hi");

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const storageRef = ref(storage, `update-pic/${user.uid}`);
        uploadBytes(storageRef, file)
          .then((snapshot) => {
            // alert("Uploaded a blob or file!");
            alert("Refresh page");
          })
          .catch((e) => {
            alert(e);
          });
      });
      // });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    listAll(storageRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log(folderRef);
        });
        res.items.forEach((itemRef, i) => {
          const picId = itemRef._location.path_.slice(12);
          // console.log(picId);
          if (user.uid === picId)
            getDownloadURL(itemRef).then((url) => {
              // prPhoto.scr = url;
              photoId.src = url;
              bigPhotoId.src = url;
              // console.log(prPhoto.src);
            });
        });
      })
      .catch((error) => {
        // alert(error);
      });

    listAll(newRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          // console.log(folderRef);
        });
        res.items.forEach((itemRef, i) => {
          const picId = itemRef._location.path_.slice(11);
          // console.log(picId);
          if (user.uid === picId)
            getDownloadURL(itemRef).then((url) => {
              // prPhoto.scr = url;
              photoId.src = url;
              bigPhotoId.src = url;
              console.log(url);
            });
        });
      })
      .catch((error) => {
        // alert(error);
      });
  } else {
    // alert("bad");
  }
});

// alert("hi");

// const cartBtn = document.querySelectorAll(".btn--cart");
// const products = document.querySelectorAll(".products");

// // const prodContainer = document.querySelector(".products-container");

// cartBtn.forEach((btn, c) => {
//   btn.addEventListener("click", (e) => {
//     products.forEach((prod, p) => {
//       if (c === p) {
//         const productDetails =
//           document.querySelector(".product-details").textContent;
//         const productTitle = document.querySelector(".title").textContent;
//         const productPrice = document.querySelector(".price").textContent;

//         try {
//           const docRef = addDoc(collection(db, "cart"), {
//             productname: productDetails,
//             title: productTitle,
//             price: productPrice,
//           });
//         } catch (e) {
//           // alert("Error adding document: ", e);
//         }
//       }
//     });
//   });
// });
