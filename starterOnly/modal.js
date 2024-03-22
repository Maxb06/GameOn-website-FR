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
const closeBtn = document.querySelector(".close");
const form = document.querySelector("form");
const prenom = document.getElementById("first");
const nom = document.getElementById("last");   
const email = document.getElementById("email");     
const birthday = document.getElementById('birthdate');
const quantite = document.getElementById("quantity");  
const locations = document.querySelectorAll("input[name=location]");                                                  
const checkbox = document.querySelectorAll("input[type=checkbox]");  

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// étape 1 écouter l'evenement au clic
closeBtn.addEventListener("click", closeModal);

// étape 1 fonction qui permet de fermer la modale
function closeModal() {
  modalbg.style.display = "none";
}

// Fonction qui permet de vérifier si un champ obligatoire est valide
/** 
*  @param {string} balise : élément input du formulaire sur lequel on effectue la validation 
*/ 
function verifierPrenom(balise) {
  if (balise.value.length >= 2) { // Vérifie si le champ contient au moins 2 caractères
      balise.classList.remove("error");
      afficherMessageErreur(balise, "");
      return true;
  } else {
      balise.classList.add("error");
      afficherMessageErreur(balise, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
      return false;
  }
}

/**
 * Fonction qui permet de vérifier si un champ obligatoire est valide
 * @param {string} balise : élément input du formulaire sur lequel on effectue la validation
 * @returns 
 */
function verifierNom(balise) {
  // Vérifie si le champ contient au moins 2 caractères
  if (balise.value.length >= 2) { 
      balise.classList.remove("error");
      // Si le champ est valide, efface le message d'erreur
      afficherMessageErreur(balise, "");
      return true;
  } else {
      balise.classList.add("error");
      afficherMessageErreur(balise, "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
      return false;
  }
}

// Fonction qui permet de valider une adresse mail avec une expression régulière 
/** 
*  @param {string} balise : élément input du formulaire sur lequel on effectue la validation
*/
function verifierEmail(balise) {
  let emailRegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (emailRegExp.test(balise.value)) { // Vérifie si l'adresse e-mail est valide
      balise.classList.remove("error");
      afficherMessageErreur(balise, "");
      return true;
  } else {
      balise.classList.add("error");
      afficherMessageErreur(balise, "Veuillez entrer votre adresse email.")
      return false;
  }
}

// Fonction qui permet de valider et ajouter message d'erreur
/** 
*  @param {string} champ : élément input du formulaire sur lequel on effectue la validation
*/
// Fonction qui permet de vérifier si la date de naissance est renseignée
function verifierDateDeNaissance(champ) {
  if (champ.value !== "") { 
    afficherMessageErreur(champ, ""); // Efface le message d'erreur 
    champ.classList.remove("error");  
    return true;   
  } else {
    champ.classList.add("error");
    afficherMessageErreur(champ, "Vous devez entrer votre date de naissance.");   
    return false;   
  }
}

// Fonction qui permet de vérifier si la quantité n'est pas vide
/** 
*  @param {string} balise : élément input du formulaire sur lequel on effectue la validation
*/
function verifierQuantite(balise) {
  if (balise.value !== "") { // Vérifie si le champ n'est pas vide  GERER FONCTION AVEC VALEUR NUMERIQUE
    balise.classList.remove("error");
    afficherMessageErreur(balise, "");
    return true;
  } else {
    balise.classList.add("error");
    afficherMessageErreur(balise, "Veuillez renseigner vos participations.");
    return false;
  }
}

// Fonction pour vérifier si au moins un bouton radio est sélectionné
/** 
*  @param {string} locations : élément radio du formulaire sur lequel on effectue la validation
*/
function verifierLocation(locations) {
  // Initialise la variable boutonRadio à false
  let boutonRadio = false;
  // boucle for pour tous les boutons radio
  for (let i = 0; i < locations.length; i++) {
    // Vérif si le bouton actuel est sélectionné
    if (locations[i].checked) {
      // Si un bouton est sélectionné, on met boutonRadio à true et on arrête la boucle
      boutonRadio = true;
      break;
    }
  }
  if (!boutonRadio) {
    afficherMessageErreur(locations[0], "Vous devez choisir une option.");
  } else {
    afficherMessageErreur(locations[0], "");
  }
  console.log("Validation de l'emplacement :", boutonRadio);
  // Retourne true si un bouton est sélectionné, sinon false
  return boutonRadio;
}

// Fonction de validation pour la case à cocher obligatoire checkbox
function verifierConditions() {
  const checkbox1 = document.getElementById("checkbox1");
  // Vérifie si le premier bouton est coché
  const premierBoutonCoche = checkbox1.checked;
  const conditionsValide = premierBoutonCoche;

  if (!conditionsValide) {
    afficherMessageErreur(checkbox1, "Vous devez vérifier que vous acceptez les termes et conditions.");
  } else {
    afficherMessageErreur(checkbox1, "");
  }
  return conditionsValide;
}

// Fonction qui permet de créer le span qui affichera le message d'erreur sous le champ
function afficherMessageErreur(champ, message) {
  let conteneurChamp = champ.closest(".formData");
  let spanErreurMessage = conteneurChamp.querySelector(".erreurMessage");
  // Créez l'élément span
  if (!spanErreurMessage) {
      spanErreurMessage = document.createElement("span");
      spanErreurMessage.classList.add("erreurMessage");
      conteneurChamp.appendChild(spanErreurMessage);
  }
  // le texte du message d'erreur
  spanErreurMessage.innerText = message;
}

// Fonction qui permet de valider le formulaire
function validate() {  
  // Logique de validation du formulaire
  const prenomValide = verifierPrenom(prenom);
  const nomValide = verifierNom(nom);
  const emailValide = verifierEmail(email);
  const quantiteValide = verifierQuantite(quantite);
  const locationValide = verifierLocation(locations);
  const conditionsValide = verifierConditions();
  const dateDeNaissanceValide = verifierDateDeNaissance(birthday); // Ajout validation pour la date de naissance
  
  if (prenomValide && nomValide && emailValide && quantiteValide && locationValide && conditionsValide && dateDeNaissanceValide) {
      // Envoyer le formulaire si toutes les validations sont correctes    
      return true;
  } else {
      // retour console si la validation est incorrecte
      console.log("Le formulaire n'est pas valide");
      return false;
  }
}

/*
// Fonction qui permet d'afficher le message de validation du formulaire
function afficherConfirmationMessage() {
  const confirmationMessage = document.createElement('div');
  confirmationMessage.textContent = "Merci ! Votre réservation a été reçue.";
  confirmationMessage.classList.add('confirmationMessage');
  confirmationMessage.style.cssText = "display: flex; align-items: center; justify-content: center; background-color: #232323;";
  document.body.appendChild(confirmationMessage);
}
*/

// Ajout d'un écouteur d'événements sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    // Appel de la fonction de validation
    if (validate()) {
      // Si le formulaire est valide, le soumettre
      form.submit();
    }
});
