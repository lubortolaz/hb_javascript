'use strict';

let game = new Object();
const PLAYER = 1;
const DRAGON = 2;

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


/**
 * Initialisation du jeu "dragon attack"
 * @returns objet game{level, armor, sword, hpPlayer, hpDragon}
 */
function initializeGame(){
    const armors = new Object();
    armors[1] = {type: 'cuivre', ratio: 1};
    armors[2] = {type: 'fer', ratio: 1.25};
    armors[3] = {type: 'magique', ratio: 2};

    const swords = new Object();
    swords[1] = {type: 'bois', ratio: 0.5};
    swords[2] = {type: 'acier', ratio: 1};
    swords[3] = {type: 'excalibur', ratio: 2};

    //let game = new Object();
    // saisie de la difficulté
    game.level = askNumber(1, 3, 'Quel niveau de difficulté ? \n 1 : facile | 2 : moyen | 3 : difficile');
    // saisie du type d'épée
    game.armor = askNumber(1, 3, 'Quel type d\'armure ? \n 1 : cuivre | 2 : fer | 3 : magique');
    game.armorRatio = armors[game.armor].ratio;
    // saisie du type d'armure
    game.sword = askNumber(1, 3, 'Quel type d\'épée ? \n 1 : bois | 2 : acier  | 3 : Excalibur');
    game.swordRatio = swords[game.sword].ratio;

    switch(game.level){
        case 1 :
            game.hpPlayer = getRandomInt(200, 250);
            game.hpDragon = getRandomInt(150, 200);
            break;
        case 2 :
            game.hpPlayer = getRandomInt(200, 250);
            game.hpDragon = getRandomInt(200, 250);
            break;
        case 3 :
            game.hpPlayer = getRandomInt(150, 200);
            game.hpDragon = getRandomInt(200, 250);
            break;
    }
}

/**
 * Calcule le montant des dégats infligés lors d'une attaque du dragon
 * @param {*} level 
 * @param {*} armorRatio 
 * @returns int
 */
function computeDragonDamagePoint(level, armorRatio){
    let damage;
    switch(level){
        case 1 :
            damage = getRandomInt(10, 20);
            break;
        case 2 :
            damage = getRandomInt(20, 30);
            break;
        case 3 :
            damage = getRandomInt(20, 30);
            break;
    }
    damage *= armorRatio;
    console.log(`chevalier -${damage} PV`);
    return Math.floor(damage);
}

/**
 * Calcule le montant des dégats infligés lors d'une attaque du chevalier
 * @param {*} level 
 * @param {*} swordRatio 
 * @returns int
 */
function computeKnightDamagePoint(level, swordRatio){
    let damage;
    switch(level){
        case 1 :
            damage = getRandomInt(25, 30);
            break;
        case 2 :
            damage = getRandomInt(15, 20);
            break;
        case 3 :
            damage = getRandomInt(5, 10);
            break;
    }
    damage *= swordRatio;
    console.log(`dragon -${damage} PV`);
    return Math.floor(damage);
}

/**
 * Génère le code HTML nécessaire pour afficher un tableau contenant les PV des joueurs
 * @param {*} pv1 
 * @param {*} pv2 
 * @returns string
 */
function getTableHTML(pv1, pv2){
    return `<table>
        <tr>    
            <th>Personnage</th>
            <th>PV</th>
        </tr>
        <tr>
            <td>Chevalier</td>
            <td>${pv1}</td>
        </tr>
        <tr>
            <td>Dragon</td>
            <td>${pv2}</td>
        </tr>
    </table>`;
}

/**
 * 
 * @returns du code html pour gérer l'affichage
 */
function loopGame(){
    let nbRound = 0;
    let codeHTML = '';
    codeHTML = `<h2>Points de vie de départ</h2>`;
    codeHTML += getTableHTML(game.hpPlayer, game.hpDragon);
    do{
        let damage;

        nbRound++;

        codeHTML += `<h2>··· Tour n° ${nbRound} ···</h2>`;

        if(getRandomInt(1, 2) == PLAYER){
            damage = computeKnightDamagePoint(game.level, game.swordRatio);
            game.hpDragon -= damage;
            codeHTML += `<p>Vous êtes plus rapide et frappez le dragon avec votre épée, vous lui enlevez ${damage} PV 🗡🗡🗡 </p>`;
        }
        else{
            damage = computeDragonDamagePoint(game.level, game.armorRatio);
            game.hpPlayer -= damage;
            codeHTML += `<p>Le dragon est plus rapide et vous brûle, vous perdez ${damage} PV 🔥🔥🔥 </p>`;
        }

        console.log(`game.hpPlayer ${game.hpPlayer}`);
        console.log(`game.hpDragon ${game.hpDragon}`);

        codeHTML += getTableHTML(game.hpPlayer, game.hpDragon);

    } while(game.hpPlayer > 0 && game.hpDragon > 0)

    // gestion de l'affichage du vainqueur
    if(game.hpPlayer < 0){
        codeHTML += `<p>Vous êtes mort :( </p>`;
        codeHTML = `<article>
        <img class="fit-picture" src="img/dragon.png" width="" height=""  alt="texte alternatif">
        <p><strong>Vous êtes mort...</strong></p>
        <p>Il reste <strong>${game.hpDragon}</strong> PV au dragon</p>
        </article>` + codeHTML;
    }
    else{
        codeHTML += `<p>Vous gagnez ! </p>`;
        codeHTML = `<article>
        <img class="fit-picture" src="img/knight.png" width="" height=""  alt="texte alternatif">
        <p><strong>Vous avez gagné en ${nbRound} tours, vous êtes vraiment fort !</strong></p>
        <p>Il vous reste <strong>${game.hpPlayer}</strong> PV</p>
        </article>` + codeHTML;
    }

    return codeHTML;
}