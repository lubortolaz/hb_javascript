"use strict";

// jours de la semaine
let weekDays = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];

// mois de l'année
let months = ["janvier","février","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","décembre"];

// crée un objet date avec la date du jour
let today = new Date();

// affichage
document.querySelector('#content').innerHTML = "<p>Nous sommes le " + weekDays[today.getDay()] + " " + today.getDate() + " " + months[today.getMonth()] + " " 
+ today.getFullYear() + ".</p><p>Il est " + (today.getUTCHours() - today.getTimezoneOffset()/60)  + "h" + today.getUTCMinutes() + ".</p>" ;


// autre méthode
let dateFR = today.toLocaleDateString('fr-FR', {
    weekday : "long",
    day : "2-digit",
    month : "long",
    year : "numeric"
});
document.querySelector('#content2').innerHTML = `<p>Nous sommes le ${dateFR}</p>`;
