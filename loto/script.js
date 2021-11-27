'use strict';

/**
 * Génère un entier entre min et max
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Génère les chiffres gagnants avec des nombres aléatoires entre 1 et 50 et un numéro complémentaire entre 1 et 10
 * Stockage des chiffres dans loto.set et loto.bonus
 */
function initLoto(){
    let nb;
    for(let i=1;i<=5;i++){
        do {
            nb = getRandomInt(1, 50);
        } while (loto.set.has(nb))
        loto.set.add(nb);
    }
    loto.bonus = getRandomInt(1, 10);
}


/**
 * Récupère les chiffres choisis et vérifie qu'il n'y a pas de doublons
 */
function initBet(){

    // reset
    bets.set.clear();
    bets.bonus = null;

    // réponse
    let bReturn = true;

    let betsInput = document.querySelectorAll('#choix div input');

    betsInput.forEach((bet , index) => { 
        bet.classList.remove('warning', 'win');
        if(index !== betsInput.length - 1 ){
            let iBet = parseInt(bet.value);
            if(bets.set.has(iBet)){
                console.warn(`doublon sur ${iBet}`);
                bet.classList.add('warning');
                //console.warn('return FALSE');
                bReturn = false;
            } else{
                bets.set.add(iBet);
            }
        }
        else{
            bets.bonus = parseInt(bet.value);
        }  
    });
    return bReturn;
}

/**
 * Toggle de la classe 
 * @param {*} index 
 */
function addWinClass(index){
    let betsInput = document.querySelectorAll('#choix div input');
    betsInput[index].classList.add('win');
}

/**
 * Affichage des résultats
 * @param {*} win montant des gains
 */
function displayResult(win){

    // masquage des choix
    document.querySelector('#choix').classList.add('hide');

    let codeHTML = '';
    let txtHTML = '';

    // rappel des numéors choisis
    for (let item of bets.set){
        txtHTML += item + ', ';
    }
    
    // préparation de l'affichage des numéros gagnants
    for (let item of loto.set){
        let classe = '';
        if(bets.set.has(item)) classe = 'win';
        codeHTML += `<input type="number" style="background-color: #d7dbdd;" class="nombres ${classe}" value="${item}" readonly></input>`
    }
    let classe = '';
    if(loto.bonus == bets.bonus) classe = 'win';
    codeHTML += `<input type="number" style="background-color: #d7dbdd;" class="nombres ${classe}" value="${loto.bonus}" readonly></input>`

    // affichage des numéros gagnants
    document.querySelector('#result .generate').innerHTML = codeHTML;

    // affichage des numéros saisis
    document.querySelector('#result .saisi').textContent = `Vos numéro étaient : ${txtHTML}et le numéro complémentaire ${bets.bonus}`

    // affichage des gains
    if(win==0){
        document.querySelector('#result h3').textContent = "Vous n'avez rien gagné, mais vous pouvez retenter votre chance !";
    } else{
        document.querySelector('#result h3 span').textContent = win;
    }
    
    // affichage global des résultats
    document.querySelector('#result').classList.remove('hide');
}

/**
 * Vérification si la saisie est ok, et si oui, comparaison et calcul des gains
 */
function check(){
    // on récupère les chiffres choisis par le joueur
    // et on instancie l'objet bets
    if(initBet() === true){
        
        // les chiffres sont ok
        // on compare avec les chiffres du loto
        let nbOk = 0;
        let win = 0;

        let i=0;
        for (let item of bets.set) {
            if(loto.set.has(item)){
                nbOk++;
                // on affiche le chiffre en vert
                addWinClass(i);
            }
            i++;    
        }

        // on enregistre les gains en fonction du nombre de chiffres ok
        switch(nbOk){
            case 0:
            case 1:
                win = 0;
                break;
            case 2:
                win = 1000;
                break;
            case 3:
                win = 5000;
                break;
            case 4:
                win = 10000;
                break;
            case 5:
                win = 100000;
                break;
        }

        // on ajoute 2000 si le numéro complémentaire à été trouvé
        if(bets.bonus == loto.bonus) win += 2000;

        // on affiche les résultats
        displayResult(win);
    }
}

const MAX = 5;

let loto = new Object();
loto.set = new Set();
loto.bonus = null;

let bets = new Object();
bets.set = new Set();
bets.bonus = null;


document.addEventListener("DOMContentLoaded", function(){

    initLoto();
    console.info('loto');console.table(loto.set);console.table(loto.bonus);

    document.querySelector('#choix button').addEventListener('click', check);


});