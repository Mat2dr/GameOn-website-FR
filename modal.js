function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*--------- DOM ELEMENTS ---------*/

const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll("#close");
const messageValid = document.querySelector(".message-valid");
// form elements
const form = document.getElementById ('reserve');
const firstName = document.getElementById ('first');
const lastName = document.getElementById ('last');
const email = document.getElementById ('email');
const birthdate = document.getElementById ('birthdate');
const quantity = document.getElementById ('quantity');
const villes = document.getElementById ('location6');
const CGV = document.getElementById ('checkbox1');

let maxDate;


/*--------- EVENTS ---------*/

// birthdate max date
document.addEventListener('DOMContentLoaded', maxBirthdate);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// form submit
reserve.addEventListener('submit', (e) => {
  e.preventDefault();

  validate();

  if (validFirstName() == true && validLastName() == true && validEmail() == true && validBirthdate() == true && validQuantity() == true && validLocation() == true && validCGV() == true) {
    sendForm();
    sendFormMessage();
  }
})

// close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

/*--------- FUNCTIONS ---------*/

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Form validation
function validate() {

  validFirstName();
  validLastName();
  validEmail();
  validBirthdate();
  validQuantity();
  validLocation();
  validCGV();
}

// FirstName validation
function validFirstName() {
  if (!firstName.value) {
    setErreur(firstName, "Veuillez renseigner un prénom.");
    return false;
  } else if (firstName.value.length <= 1){
    setErreur(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du prenom.");
    return false;
  } else if (firstName.value.match(/^ *$/)) {
    setErreur(firstName, "Veuillez entrer un prénom valide.");
    return false;
  } else {
    setValid(firstName);
    return true;
  }
}
// LastName validation
function validLastName() {
  if (!lastName.value) {
    setErreur(lastName, "Veuillez renseigner un nom.");
    return false;
  } else if (lastName.value.length <= 1){
    setErreur(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    return false;
  } else if (lastName.value.match(/^ *$/)) {
    setErreur(lastName, "Veuillez entrer un nom valide.");
    return false;
  } else {
    setValid(lastName);
    return true;
  }
}
// email validation
function validEmail() {
   // Regex Pattern: /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/
  let mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
  if (!email.value) {
    setErreur(email, "Veuillez renseigner un E-mail.");
    return false;
  } else {
    if(email.value.match(mailRegex)){
      setValid(email);
      return true;
    } else {
      setErreur(email, "Veuillez renseigner un E-mail valide.");
      return false;
    }
  }
}
// Birthdate validation
function maxBirthdate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() +1;
  let year = date.getUTCFullYear();
  if (day < 10) {
    day = '0' + day;
  } 
  if (month < 10) {
    month = '0' + month;
  }
  maxDate = year + "-" + month + "-" + day;
  maxDate = maxDate;
  document.getElementById("birthdate").setAttribute('max', maxDate);
}
function validBirthdate() {
  if (!birthdate.value) {
    setErreur(birthdate, "Veuillez renseigner une date de naissance.");
    return false;
  } else {
      setValid(birthdate);
      return true;
  }
}
// Quantity validation
function validQuantity() {
  if (!quantity.value) {
    setErreur(quantity, "Veuillez renseigner a combien de tournois GameOn avez-vous déjà participé.");
    return false;
  } else {
    setValid(quantity);
    return true;
  }
}
// Radio validation
function validLocation() {
  let radioCheck = document.querySelector('input[name = "location"]:checked');

  if(radioCheck != null){  //Test if something was checked
    setValidCheckbox(villes);
    return true;
    } else {
      setErreurCheckbox(villes, "Veuillez renseigner une localisation.");
      return false;
  }
}
// CGV validation
function validCGV() {
  if (CGV.checked) {
    setValidCheckbox(CGV);
    return true;
  } else {
    setErreurCheckbox(CGV, "Veuillez accepter les CGV.");
    return false;
  }
}

// SetErreur validation
function setErreur(input, message) {
  // Form elements for error and validation
  const formDataInput = input.parentElement; // Select input
  const small = formDataInput.querySelector('small'); // Select div for error message

  small.innerText = message;
  input.className = 'text-control input-error';
}
// SetErreur validation pour les checkboxs
function setErreurCheckbox(input, message) {
  // Form elements for error and validation
  const formDataInput = input.parentElement; // Select input
  const small = formDataInput.querySelector('small'); // Select div for error message

  small.innerText = message;
}
// SetValid validation
function setValid(input) {
  // Form elements for error and validation
  const formDataInput = input.parentElement; // Select input
  const small = formDataInput.querySelector('small'); // Select div for error message

  small.innerText = " "; // Reset error message
  input.className = 'text-control input-valid';
}
// SetValid validation pour les checkboxs
function setValidCheckbox(input) {
  // Form elements for error and validation
  const formDataInput = input.parentElement; // Select input
  const small = formDataInput.querySelector('small'); // Select div for error message

  small.innerText = " "; // Reset error message
}
// Form sent
function sendForm() {
  modalBody.classList.add('not-active');
}
// Message form sent
function sendFormMessage() {
  messageValid.innerHTML = "<p>Merci d'avoir soumis vos informations d'inscription</p>" + '<button class="btn-close" onclick="closeModal()" class="button">Fermer</button>';
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}