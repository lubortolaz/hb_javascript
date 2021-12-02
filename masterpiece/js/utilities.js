"use strict";

/**
 * Obtenir un nombre aléatoire entre min et max
 * @param {number} min
 * @param {number} max
 * @returns
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Obtenir une couleur aléatoire
 * @returns {String}
 */
function getRandomColor() {
  let color = `rgba(${getRandomInt(0, 255)},${getRandomInt(
    0,
    255
  )},${getRandomInt(0, 255)},${Math.random()})`;
  return color;
}
