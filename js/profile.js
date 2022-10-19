"use strict";

const btnEditForm = document.querySelector(".profile-btn-edit");
const btnSaveForm = document.querySelector(".profile-btn-save");
const profileForm = document.querySelector(".profile-form");
const profilePic = document.querySelector(".profile-pic-main");
const greeting = document.querySelector(".greeting");
const profileInputs = Array.from(document.querySelectorAll(".editProfile"));

// console.log(profileInputs);

btnEditForm.addEventListener("click", () => {
  profileForm.classList.toggle("hide-form");
  // btnSaveForm.classList.toggle("hide-form");

  btnEditForm.classList.toggle("hide-form");
  profilePic.classList.toggle("hide-form");
  greeting.classList.toggle("hide-form");
});

btnSaveForm.addEventListener("click", (e) => {
  e.preventDefault();
  profileInputs.forEach((inp) => {
    if (inp.value === "") {
      return;
    } else {
      btnEditForm.classList.toggle("hide-form");
      profileForm.classList.toggle("hide-form");
      // btnSaveForm.classList.toggle("hide-form");
      profilePic.classList.toggle("hide-form");
      greeting.classList.toggle("hide-form");
      // inp.value = "";
    }
  });
});

////////////////////////////////////////////////
/////////Profile pic Upload
const imgDiv = document.querySelector(".profile-pic-div");
const img = document.querySelector("#photo");
const file = document.querySelector("#file");
const uploadBtn = document.querySelector("#uploadBtn");
const dispImg = document.querySelector("#profile-display-image");
const miniProImg = document.querySelector("#miniImg");

// hover effect
imgDiv.addEventListener("mouseenter", function () {
  uploadBtn.style.display = "block";
});

imgDiv.addEventListener("mouseleave", function () {
  uploadBtn.style.display = "none";
});

//Image showing functionality
file.addEventListener("change", function () {
  const chooseFile = this.files[0];

  if (chooseFile) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      e.preventDefault();
      img.setAttribute("src", reader.result);
      miniProImg.setAttribute("src", reader.result);
      dispImg.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(chooseFile);
  }
});

// alert("I am hungry sha");
// Profilebooknow/////////////////

const bookNow = document.querySelectorAll(".btn-book");
const bookForm = document.querySelector(".booking-form");
const closeIcon = document.querySelector(".close-icon");

// console.log(bookNow);

bookNow.forEach((btns) =>
  btns.addEventListener("click", function () {
    // console.log("jane");

    bookForm.classList.toggle("hidden-form");
  })
);

closeIcon.addEventListener("click", function () {
  console.log("closed");
  bookForm.classList.remove("hidden-form");
});
