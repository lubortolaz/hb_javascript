'use strict';

const shows = [
    { date: '2021-12-10', city: 'Lyon', group: 'Lofofora', price: 16.50 },
    { date: '2022-12-12', city: 'Paris', group: 'Ultra Vomit', price: 15 },
    { date: '2021-12-22', city: 'Rouen', group: 'Myrkur', price: 18.50 },
    { date: '2022-01-02', city: 'Caen', group: 'Powerwolf', price: 22 },
    { date: '2022-01-09', city: 'Clermont-Ferrand', group: 'Pantera', price: 50 },
    { date: '2022-02-12', city: 'Nice', group: 'Kreator', price: 13  },
    { date: '2022-02-23', city: 'Dijon', group: 'Clutch', price: 17 },
    { date: '2022-03-07', city: 'Marseille', group: 'Sepultura', price: 16.50 },
    { date: '2022-04-10', city: 'Brest', group: 'Uncommonmenfrommars', price: 14.50 },
    { date: '2022-04-21', city: 'Nîmes', group: '1914', price: 18 }
];

console.log(shows.length-1 + ' entrées dans le tableau');

const CONTENT = document.querySelector('#content');
let last = 0;

/**
 * Affiche toutes les dates de concert
 */
function displayAll(){
    shows.forEach(show => {
        CONTENT.innerHTML += `<li>
        <h2>${show.group}</h2>
        <p>à ${show.city} le ${show.date}</p>
        <span>${show.price}€</span>
        </li>`;
    });
}

/**
 * Affiche les dates de concert 3 par 3
 */
function displayNext(){
    let nbDisplay = 0;
    for(let i=last; i<last+3; i++){
        if(i<shows.length){
            console.log(`i = ${i}`);
            CONTENT.innerHTML += `<li>
            <h2>${shows[i].group}</h2>
            <p>à ${shows[i].city} le ${niceDate(shows[i].date)}</p>
            <span>${shows[i].price}€</span>
            </li>`;
            nbDisplay++;
        }
        else{
            document.querySelector('button').style.display = "none";
        }
    }
    last += nbDisplay;
}

/**
 * Retourne la date passée en paramètre en (J)J mois AAAA
 * @param {*} date 
 * @returns date
 */
function niceDate(date) {
    date = new Date(date);
    let months = [ "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"] ; 
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}


document.addEventListener("DOMContentLoaded", function(){

    // écoute du bouton afficher plus
    document.querySelector('button').addEventListener('click', displayNext);

});
