function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/* --Fermeture de la modal-- */

// Séléction de l'élément du DOM
const closeBtn = document.querySelector(".close");

// Fonction de fermeture de la modal
const closeModal = function () {
  modalbg.style.display = "none";
};
// Ajout de l'event
closeBtn.addEventListener("click", closeModal);
