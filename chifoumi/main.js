'use strict';

let userChoice, iaChoice;
let tabGame = ['pierre', 'feuille', 'ciseaux'];
const DIV_HTML = document.querySelector('#content');

// demander pierre, feuille ou ciseaux?
do{
    userChoice = prompt('pierre, feuille ou ciseaux?', 'pierre').toLowerCase();
    //userChoice = tabGame[Math.floor(Math.random() * (tabGame.length))];
} while (userChoice != 'pierre' && userChoice != 'feuille' && userChoice != 'ciseaux')


// selection aléatoire de l'IA
iaChoice = tabGame[Math.floor(Math.random() * (tabGame.length-1))];
console.log(`userChoice ${userChoice} | iaChoice ${iaChoice}`);


// afficharge html
DIV_HTML.innerHTML = `
<div style="display:flex;">
    <figure>
    <img src="img/${userChoice}.png"
        width="120" height="120" >
    <figcaption>Votre choix</figcaption>
    </figure>
    <figure>
    <img src="img/${iaChoice}.png"
        width="120" height="120" >
    <figcaption>Choix de l'ordinateur</figcaption>
    </figure> 
</div>
`;

// comparaison et affichage du résultat
if(userChoice === iaChoice){
    // égalité
    DIV_HTML.innerHTML += '<p>Il y a égalité !</p>';
} else if( (userChoice === 'ciseaux' && iaChoice === 'pierre') 
        || (userChoice === 'feuille' && iaChoice === 'ciseaux') 
        || (userChoice === 'pierre' && iaChoice === 'feuille')){
    // l'ia gagne
    DIV_HTML.innerHTML += '<p>Vous avez perdu :(</p>';
} else {
    // user gagne
    DIV_HTML.innerHTML += '<p>Vous avez gagné !</p>';
}

