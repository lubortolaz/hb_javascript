'use strict';

/*************************************************************************/
/* INITIALISATION ********************************************************/
/*************************************************************************/

const DIV_GAME = document.querySelector('#game');

/*************************************************************************/
/* DEROULEMENT ***********************************************************/
/*************************************************************************/

let codeHTML;
let winnerHTML = '';

initializeGame();
codeHTML = loopGame();

/*************************************************************************/
/* AFFICHAGE *************************************************************/
/*************************************************************************/

DIV_GAME.innerHTML = codeHTML;