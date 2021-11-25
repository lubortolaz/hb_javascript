'use strict';

/**
 * Demande à l'utilisateur d'entrer un nombre entre min et max
 * @param {*} min 
 * @param {*} max 
 * @param {*} msg 
 * @returns nombre saisi
 */
function askNumber(min, max, msg = `Choisissez un nombre entre ${min} et ${max}`){
    let answer;
    do{
        answer = parseInt(prompt(`${msg}`, min));
    } while (isNaN(answer) || answer < min || answer > max)
    return answer;
}

/**
 * Genère un entier aléatoire entre min et max
 * @param {*} min 
 * @param {*} max 
 * @returns un entier entre min et max
 */
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}