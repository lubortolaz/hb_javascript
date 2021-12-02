"use strict";

let canvas = null;

/***
 *    ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
 *    ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
 *    █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
 *    ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
 *    ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
 */

/**
 * Fonction appelée lors du clic sur le canvas
 * @param {Event} event
 */
function onClickCanvas(event) {
  let forme = new Disk(event.offsetX, event.offsetY);
  forme.draw();
}

/***
 *     ██████  ██████  ██████  ███████
 *    ██      ██    ██ ██   ██ ██
 *    ██      ██    ██ ██   ██ █████
 *    ██      ██    ██ ██   ██ ██
 *     ██████  ██████  ██████  ███████
 */

// après le chargement du HTML
document.addEventListener("DOMContentLoaded", function () {
  // ciblage du canvas
  canvas = document.querySelector("#masterpiece");

  // évènement : clic sur le canvas
  canvas.addEventListener("click", onClickCanvas);
});
