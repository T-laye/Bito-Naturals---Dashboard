"use strict";const btnViewForm=document.querySelector(".profile-btn-view"),btnExitForm=document.querySelector(".profile-btn-exit"),profileForm=document.querySelector(".profile-form"),profilePic=document.querySelector(".profile-pic-main"),greeting=document.querySelector(".greeting"),profileInputs=Array.from(document.querySelectorAll(".editProfile"));btnViewForm.addEventListener("click",(()=>{profileForm.classList.remove("hide-form"),btnViewForm.classList.add("hide-form"),profilePic.classList.add("hide-form"),greeting.classList.add("hide-form"),btnExitForm.classList.remove("hide-form")})),btnExitForm.addEventListener("click",(e=>{e.preventDefault(),btnViewForm.classList.toggle("hide-form"),btnExitForm.classList.toggle("hide-form"),profileForm.classList.toggle("hide-form"),profilePic.classList.toggle("hide-form"),greeting.classList.toggle("hide-form")}));const imgDiv=document.querySelector(".profile-pic-div"),img=document.querySelector("#photo"),file=document.querySelector("#file"),uploadBtn=document.querySelector("#uploadBtn"),dispImg=document.querySelector("#profile-display-image"),miniProImg=document.querySelector("#miniImg");imgDiv.addEventListener("mouseenter",(function(){uploadBtn.style.display="block"})),imgDiv.addEventListener("mouseleave",(function(){uploadBtn.style.display="none"})),file.addEventListener("change",(function(){const e=this.files[0];if(e){const o=new FileReader;o.addEventListener("load",(function(e){e.preventDefault(),img.setAttribute("src",o.result)})),o.readAsDataURL(e)}}));const bookNow=document.querySelectorAll(".btn-book"),bookForm=document.querySelector(".booking-form"),closeIcon=document.querySelector(".close-icon");bookNow.forEach((e=>e.addEventListener("click",(function(){bookForm.classList.toggle("hidden-form")})))),closeIcon.addEventListener("click",(function(){console.log("closed"),bookForm.classList.remove("hidden-form")}));
//# sourceMappingURL=index.e460c65b.js.map