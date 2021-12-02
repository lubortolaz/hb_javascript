"use strict";

/***********************
 * FONCTIONS APPELEES VIA AJAX
 ***********************/
function ajaxGetHtml(htmlDatas) {
  // La réponse HTTP contient du HTML que l'on insère donc dans la page.
  document.querySelector("#target").innerHTML = htmlDatas;
}

function ajaxGetJsonData(contactList) {
  // Création d'une liste HTML dans la page.
  document.querySelector("#target").innerHTML = "<ul>";

  for (let index = 0; index < contactList.length; index++) {
    // Insertion d'un contact dans la liste HTML.
    document.querySelector(
      "#target ul"
    ).innerHTML += `<li><p><strong>Prénom</strong> : ${contactList[index].firstName}</p>
      <p><em>Téléphone</em> : ${contactList[index].phone}</p></li>`;
  }
}

function ajaxGetJsonMovies(jsonMovies) {
  // Création d'une liste HTML dans la page.
  document.querySelector("#target").innerHTML = '<ul class="movie-list">';
  for (let i = 0; i < jsonMovies.length; i++) {
    document.querySelector(
      "#target ul"
    ).innerHTML += `<li><img src="images/${jsonMovies[i].cover}"><p><strong>${jsonMovies[i].title}</strong> - <em>${jsonMovies[i].duration}</em></p></li>`;
  }
}

/***********************
 * APPELS AJAX
 ***********************/

/**
 * Fonction qui exécute un appel AJAX grâce à l'API Fetch et attend un retour HTML du serveur.
 *
 * @param {string} url : l'URL du serveur
 * @param {function} callback : la fonction qui sera appelée en cas de succès
 * https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
 */
function ajaxCallHtml(url, callback) {
  fetch(url)
    .then(function (response) {
      //response contient la réponse brute du serveur et retourne le body en texte
      return response.text();
    })
    .then(function (datas) {
      //datas contient ce que renvoit response.text() donc le contenu du retour du serveur
      //appel de la fonction dont le nom est passé en paramètre
      callback(datas);
    })
    .catch(function (error) {
      //au cas où une erreur surviendrait à moment donné, notamment dans la fonction callback
      console.log(`Une erreur est survenue : ${error}`);
    });
}

/**
 * Fonction qui exécute un appel AJAX grâce à l'API Fetch et attend un retour JSON du serveur.
 *
 * @param {string} url : l'URL du serveur
 * @param {function} callback : la fonction qui sera appelée en cas de succès
 * https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
 */
function ajaxCallJSON(url, callback) {
  fetch(url)
    .then(function (response) {
      //response contient la réponse brute du serveur et retourne le body en JSON
      return response.json();
    })
    .then(function (datas) {
      //datas contient ce que renvoit response.json() donc le contenu du retour du serveur
      //appel de la fonction dont le nom est passé en paramètre
      callback(datas);
    })
    .catch(function (error) {
      //au cas où une erreur surviendrait à moment donné, notamment dans la fonction callback
      console.log(`Une erreur est survenue : ${error}`);
    });
}

/***********************
 * FONCTIONS
 ***********************/

/**
 * Gestion du choix utilisateur
 */
function onClickExecute() {
  // Récupération de la valeur du bouton radio qui a été sélectionné.
  let radioChoice = document.querySelector("input[name=what]:checked").value;

  // Exécution d'une requête AJAX différente selon le bouton radio.
  switch (radioChoice) {
    case "1": // Récupération d'un article HTML venant du serveur.
      ajaxCallHtml("data/1-get-html-article.html", ajaxGetHtml);
      break;

    // Récupération de données JSON venant du serveur.
    case "2":
      ajaxCallJSON("data/2-get-contacts-list.json", ajaxGetJsonData);
      break;

    // Récupération d'un template HTML venant du serveur.
    case "3":
      ajaxCallHtml("data/3-get-html-movies.html", ajaxGetHtml);
      break;

    // Récupération d'un template HTML venant du serveur.
    case "4":
      ajaxCallJSON("data/4-get-json-movies.json", ajaxGetJsonMovies);
      break;
  }
}

/***********************
 * CODE PRINCIPAL
 ***********************/

/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera totalement construit
 * par le navigateur.
 *
 * Lorsque l'on donne en argument une fonction à jQuery, elle est utilisée comme gestionnaire
 * d'évènements pour l'évènement JavaScript natif DOMContentLoaded.
 */
document.addEventListener("click", function () {
  document.querySelector("#run").addEventListener("click", onClickExecute);
});
