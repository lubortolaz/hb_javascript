/* Lucie BORTOLAZZO */

'use strict';

/***
 *     __   ___   ___ ___   _   ___ _    ___ ___
 *     \ \ / /_\ | _ \_ _| /_\ | _ ) |  | __/ __|
 *      \ V / _ \|   /| | / _ \| _ \ |__| _|\__ \
 *       \_/_/ \_\_|_\___/_/ \_\___/____|___|___/
 *
 */

// tableau de base contenant 10 plats
let meals = [
    'tartiflette',
    'coq au vin',
    'pot au feu',
    'quiche lorraine',
    'crêpe',
    'steak tartare',
    'cassoulet',
    'bouillabaisse',
    'gratin dauphinois',
    'lasagnes',
];

// sélecteur de l'input text contenant la saisie utilisateur
const INPUT_MEAL = document.querySelector('#prompt');

// sélecteur du div contenant la liste des plats
const DIV_MEALS = document.querySelector('#meals');

/***
 *      _   _ _____ ___ _    ___
 *     | | | |_   _|_ _| |  / __|
 *     | |_| | | |  | || |__\__ \
 *      \___/  |_| |___|____|___/
 *
 */

/**
 * Supprime les espaces en trop dans une chaine passée en paramètre
 * @param {String} text
 * @returns {String}
 */
function removeExtraSpace(text) {
    text = text.replace(/[\s]{2,}/g, ' '); // enlève les espaces doubles, triples, etc...
    return text.trim();
}

/***
 *      ___ ___  _  _  ___ _____ ___ ___  _  _ ___
 *     | __/ _ \| \| |/ __|_   _|_ _/ _ \| \| / __|
 *     | _| (_) | .` | (__  | |  | | (_) | .` \__ \
 *     |_| \___/|_|\_|\___| |_| |___\___/|_|\_|___/
 *
 */

/**
 * Génère le code pour l'affichage des plats et l'injecte dans le HTML
 */
function showMeals() {
    // générer l'affichage du nombre de plats dans un titre
    let html = `<h3>Il y a ${meals.length} plat(s) au menu</h3>`;

    // générer la liste des plats
    html += '<ul>';

    // si le tableau contient des plats
    if (meals.length > 0) {
        // pour chaque plat
        meals.forEach((meal) => {
            // forcer la première lettre en majuscule (c'est plus joli)
            meal = meal.charAt(0).toUpperCase() + meal.slice(1);
            // l'ajouter dans une balise <li>
            html += `<li>${meal}</li>`;
        });
    }
    html += '</ul>';

    // afficher dans le HTML
    DIV_MEALS.innerHTML = html;
}

/**
 * Fonction appelée lors de l'évènement : clic sur "Ajouter".
 * Elle va vérifier que le plat saisi n'est pas dans le tableau pour ensuite l'ajouter
 * @param {Event} event
 */
function onClickSubmit(event) {
    // annulation du comportement par défaut
    event.preventDefault();

    // booléen servant à faire l'ajout ou non
    let bOk = true;

    // récupérer le contenu du input text et enlever les espaces en trop
    let newMeal = removeExtraSpace(INPUT_MEAL.value);

    // vérifier que celui-ci n'est pas une chaîne vide
    if (newMeal == '') {
        // alerter l'utilisateur et passer le booléen à false pour ne pas faire l'ajout
        alert('❌ Erreur : veuillez saisir un plat avant de valider.');
        bOk = false;
    } else {
        // vérifier que le plat saisi n'est pas déjà enregistré dans la liste
        meals.forEach((meal) => {
            if (newMeal.toLowerCase() == meal.toLowerCase()) {
                // alerter l'utilisateur et passer le booléen à false pour ne pas faire l'ajout
                alert(`❌ Erreur : le plat "${newMeal}" est déjà au menu.`);
                bOk = false;
            }
        });
    }

    // si il n'y a pas eu d'erreurs
    if (bOk === true) {
        // ajouter le plat au tableau
        meals.push(newMeal);

        // alerter l'utilisateur
        alert(`🆗 Le plat "${newMeal}" a bien été ajouté à la liste !`);

        // rafraichir le HTML
        showMeals();
    }

    // dans tous les cas, vider l'input text
    INPUT_MEAL.value = '';
}

/***
 *       ___ ___  ___  ___   ___ ___ ___ _  _  ___ ___ ___  _   _
 *      / __/ _ \|   \| __| | _ \ _ \_ _| \| |/ __|_ _| _ \/_\ | |
 *     | (_| (_) | |) | _|  |  _/   /| || .` | (__ | ||  _/ _ \| |__
 *      \___\___/|___/|___| |_| |_|_\___|_|\_|\___|___|_|/_/ \_\____|
 *
 */

// évènement : fin du chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    // afficher la liste des plats
    showMeals();

    // évènement : clic sur le bouton "Ajouter"
    document.querySelector('#submit').addEventListener('click', onClickSubmit);
});
