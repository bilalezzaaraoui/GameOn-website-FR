"use strict";
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

/* --Entrée du formulaire-- */

// Séléction de l'élément du DOM
const form = document.getElementById("form-validation");
const checkAttribut = document.querySelector(".formData");
let firstName = document.getElementById("first");
let lastName = document.getElementById("last");
let email = document.getElementById("email");
let birthday = document.getElementById("birthdate");
let tournament = document.getElementById("quantity");
let radioBtn = document.querySelector("input[name='location']");
const rulesBtn = document.getElementById("checkbox1");
const paragraph = document.querySelector(".text-label");
const btnSubmit = document.querySelector(".btn-submit");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkForm();
  checkValidation();
  process();
});

// Ajout de l'erreur
function setError(input, message) {
  const formError = input.parentElement;
  formError.setAttribute("data-error", message);
  formError.setAttribute("data-error-visible", "true");
}

// Suppression de l'erreur
function deleteError(input) {
  const errorDeleted = input.parentElement;
  errorDeleted.removeAttribute("data-error");
  errorDeleted.removeAttribute("data-error-visible");
}

// Fonction Verification de l'email
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Capture de la valeur des elements du DOM

// La date d'aujourd'hui
const d = new Date();
const fullYear = d.getFullYear();
let month = d.getMonth() + 1;
let day = d.getDate();

if (month <= 9) {
  month = "0" + month;
}

if (day <= 9) {
  day = "0" + day;
}

let dateNow = fullYear + "-" + month + "-" + day;
console.log(dateNow);
console.log(typeof dateNow);

function checkForm() {
  const firstNameValue = document.getElementById("first").value.trim();
  const lastNameValue = document.getElementById("last").value.trim();
  const emailValue = document.getElementById("email").value.trim();
  const birthdayValue = document.getElementById("birthdate").value;
  const tournamentValue = document.getElementById("quantity").value;
  const radioBtnAll = document.querySelectorAll("input[name='location']");
  const rulesBtnChecked = document.getElementById("checkbox1").checked;
  // Les conditions demandées

  // Si le champ Prénom à 2 caractères et n'est pas vide.
  if (firstNameValue === "" || firstNameValue.length < 2) {
    setError(firstName, "Votre prénom doit contenir minimum 2 caractères");
  } else {
    deleteError(firstName);
  }
  // Si le champ Nom de famille à 2 caractères et n'est pas vide.
  if (lastNameValue === "" || lastNameValue.length < 2) {
    setError(
      lastName,
      "Votre nom de famille doit contenir minimum 2 caractères"
    );
  } else {
    deleteError(lastName);
  }

  // Si l'adresse email est bien valide.
  if (emailValue === "" || !emailIsValid(emailValue)) {
    setError(email, "Votre adresse électronique n'est pas valide.");
  } else {
    deleteError(email);
  }

  // Optionnel: Vérification de la date de naissance.
  if (birthdayValue >= dateNow || !birthdayValue) {
    setError(birthday, "Votre date de naissance n'est pas valide.");
  } else {
    deleteError(birthday);
    console.log(birthdayValue);
    console.log(typeof birthdayValue);
  }

  // Si une valeur numérique est saisie.
  if (tournamentValue === "") {
    setError(
      tournament,
      "Veuillez indiquer à combien de tournois vous avez déja participé."
    );
  } else {
    deleteError(tournament);
  }

  // Si un bouton radio est sélectionné.
  let btnTrue;
  for (let i = 0; i < radioBtnAll.length; i++) {
    if (radioBtnAll[i].checked) {
      btnTrue = radioBtnAll[i].value;
      break;
    }
  }

  if (btnTrue === undefined) {
    setError(radioBtn, "Veuillez indiquer la ville où vous residez.");
  } else {
    deleteError(radioBtn);
  }

  // Si la case des conditions générales est cochée
  if (!rulesBtnChecked) {
    setError(
      rulesBtn,
      "Veuillez accepter les conditions générales pour vous inscrire."
    );
  } else {
    deleteError(rulesBtn);
  }
}

let formValidation;

function checkValidation() {
  for (let i = 0; i < formData.length; i++) {
    if (
      formData[i].hasAttribute("data-error") &&
      formData[i].hasAttribute("data-error-visible")
    ) {
      formValidation = false;
      break;
    }
    // Si "i" est supérieur ou égal au dernier alors cela devient true
    else if (i >= formData.length - 1) {
      formValidation = true;
      break;
    } else {
      continue;
    }
  }
}

function process() {
  // Selection des élements du dom

  // Si le formulaire est valide
  if (formValidation === true) {
    // Disparition de toutes les entrées du formulaire  sauf de la dernière DIV
    for (let i = 0; i < formData.length - 1; i++) {
      formData[i].style.display = "none";
    }
    paragraph.style.display = "none";

    // Disparition du contenu de la dernière DIV
    document.getElementById("checkbox1").style.display = "none";
    document.getElementById("checkbox2").style.display = "none";

    const checkboxAll = document.querySelectorAll(".checkbox2-label");
    for (let i = 0; i < checkboxAll.length; i++) {
      checkboxAll[i].style.display = "none";
    }

    // Modication du CSS et ajout du paragraphe de confirmation dans la dernière DIV
    for (let i = 0; i < formData.length; i++) {
      if (i === formData.length - 1) {
        formData[i].style.height = "70vh";
        formData[i].style.display = "flex";
        formData[i].style.justifyContent = "center";
        formData[i].style.alignItems = "center";

        const tag = document.createElement("p");
        const text = document.createTextNode(
          "Thank you for submitting your registration details"
        );
        tag.appendChild(text);
        tag.classList.add("winning-line");
        formData[i].appendChild(tag);

        // Style du paragraphe
        const winning = document.querySelector(".winning-line");
        winning.style.textAlign = "center";
        winning.style.fontSize = "2rem";

        // Bouton "close" du formulaire
        btnSubmit.value = "Close";

        btnSubmit.addEventListener("click", function () {
          firstName.value = ""; //string
          lastName.value = ""; //string
          email.value = ""; //string
          birthday.value = "jj/mm/aaaa"; //string
          tournament.value = ""; //string
          radioBtn.value = undefined; //btnTrue

          closeModal();
          location.reload();
        });
      }
    }
  }
}

/* --Fermeture de la modal-- */

// Séléction de l'élément du DOM
const closeBtn = document.querySelector(".close");

// Fonction de fermeture de la modal
function closeModal() {
  modalbg.style.display = "none";
}
// Ajout de l'event
closeBtn.addEventListener("click", closeModal);
