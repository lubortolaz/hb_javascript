"use strict";

/***
 *    ██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████
 *    ██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██
 *    ██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████
 *     ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██
 *      ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████
 */

const TRANSLATION = {
  firstName: "Prénom",
  phone: "Téléphone",
  title: "Titre",
  duration: "Durée",
  cover: "Affiche",
};

/***
 *    ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
 *    ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
 *    █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
 *    ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
 *    ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
 */

/**
 *
 * @param {*} key
 * @returns
 */
function getTranslation(key) {
  if (TRANSLATION.hasOwnProperty(key)) {
    return TRANSLATION[key];
  } else {
    return key;
  }
}

/**
 *
 * @param {*} htmlDatas
 */
function displayHTML(htmlDatas) {
  $("#target").html(htmlDatas);
}

/**
 * Afficher du JSON
 * @param {Array} aDatas
 */
function displayJSON(aDatas) {
  let html = "";

  aDatas.forEach((element) => {
    console.log(element);
    html += "<ul>";
    for (let prop in element) {
      console.log(prop + " : " + element[prop]);
      html += `<li><strong>${getTranslation(prop)}</strong> : ${
        element[prop]
      }</li>`;
    }
    html += "</ul>";
  });

  $("#target").html(html);
}

function displayMovies(datas) {
  let html = "";
  html = '<ul class="movie-list">';
  for (let i = 0; i < datas.length; i++) {
    html += `<li><img src="images/${datas[i].cover}"><p><strong>${datas[i].title}</strong> - <em>${datas[i].duration}</em></p></li>`;
  }
  $("#target").html(html);
}

/**
 * Fonction appelée lorsque l'utilisateur clique sur "Executer"
 *
 */
function onClickExecute() {
  let choice = $("input[name=what]:checked").val();

  switch (choice) {
    case "1":
      $.get("data/1-get-html-article.html", displayHTML);
      break;
    case "2":
      $.getJSON("data/2-get-contacts-list.json", displayJSON);
      break;
    case "3":
      $.get("data/3-get-html-movies.html", displayHTML);
      break;
    case "4":
      $.getJSON("data/4-get-json-movies.json", displayMovies);
      break;
    default:
      $("#target").text("Erreur");
      break;
  }
}

/***
 *     ██████  ██████  ██████  ███████
 *    ██      ██    ██ ██   ██ ██
 *    ██      ██    ██ ██   ██ █████
 *    ██      ██    ██ ██   ██ ██
 *     ██████  ██████  ██████  ███████
 */

$(document).ready(function () {
  // événement : clic sur le bouton "exécuter"
  $("#run").on("click", onClickExecute);
});
