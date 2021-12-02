"use strict";

/***
 *     __   ___   ___ ___   _   ___ _    ___ ___
 *     \ \ / /_\ | _ \_ _| /_\ | _ ) |  | __/ __|
 *      \ V / _ \|   /| | / _ \| _ \ |__| _|\__ \
 *       \_/_/ \_\_|_\___/_/ \_\___/____|___|___/
 *
 */

const API_URL =
  "http://api.openweathermap.org/data/2.5/weather?q={city-name}&appid=1d99c54a7976a863efef8472f0acf47b&units=metric";

const TRAD_FR = {
  "01d": "ciel clair",
  "02d": "quelques nuages",
  "03d": "nuages éparses",
  "04d": "nuages",
  "09d": "pluie éparse",
  "10d": "pluie",
  "11d": "orage",
  "13d": "neige",
  "50d": "brouillard",
};
/***
 *      ___ _   _ _  _  ___ _____ ___ ___  _  _ ___
 *     | __| | | | \| |/ __|_   _|_ _/ _ \| \| / __|
 *     | _|| |_| | .` | (__  | |  | | (_) | .` \__ \
 *     |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|___/
 *
 */

/**
 * Fonction appelée au clic sur "Valider"
 * @param {Event} e
 */
function onClickSubmit(e) {
  e.preventDefault();

  // récupérer le contenu de l'input
  let datas = document.querySelector("#ville").value;
  // le changer en tableau
  let aDatas = datas.split(",");
  // récupérer le tableau [0]
  let city = aDatas[0].trim();
  // remplacer les espaces par des tirets
  city = city.replaceAll(" ", "-");

  // appeler l'api avec le nom de la ville
  apiCall(city, aDatas[1]);

  console.log(city);
}

/**
 * Appel de l'API avec la ville passée en paramètre
 * Possibilité de préciser le pays avec le code (2-letter country code (ISO3166))
 * @param {String} city
 * @param {String} country
 */
function apiCall(city, country = "") {
  if (country !== "") city += "," + country;
  let url = API_URL.replace("{city-name}", city);
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      callback(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Callback suivant l'appel AJAX de l'API OpenWeatherMap
 * @param {*} data
 */
function callback(data) {
  // si cod retour = 200, pas d'erreur
  if (data.hasOwnProperty("cod") && data.cod == 200) {
    let icon = data.weather[0].icon;
    icon = icon.replace("n", "d");
    document.querySelector("article h2 strong").textContent = data.name;
    document.querySelector("article h2 sup").textContent = data.sys.country;
    document.querySelector("article p strong").textContent = data.main.temp;
    document
      .querySelector("article div img")
      .setAttribute("src", "img/" + icon + ".png");
    document.querySelector("article div small").textContent = TRAD_FR[icon];
    document.querySelector("article").classList.remove("hide");
  } else {
    // sinon on affiche l'erreur
    switch (data.cod) {
      case "404":
        alert("Ville introuvable !");
        break;
      default:
        alert("Erreur : " + data.cod + " " + data.message);
        break;
    }
  }
}

/***
 *       ___ ___  ___  ___
 *      / __/ _ \|   \| __|
 *     | (_| (_) | |) | _|
 *      \___\___/|___/|___|
 *
 */

// après le chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  // évènement : clic sur le bouton submit
  document.querySelector("#submit").addEventListener("click", onClickSubmit);
});
