"use strict";

const TAUX_TVA = 20;
const MA_DIV = document.querySelector("#content");

// demande du montant hors taxe à l'utilisateur
let mttHT;
do{
    mttHT = parseFloat(prompt('Veuillez saisir le montant hors taxe').replace(',','.'));
    console.log(`mttHT ${typeof mttHT}`);
} while(isNaN(mttHT))

// y-a-t-il une remise?
let remise = prompt('Bénéficiez-vous d\'une remise?');
let montantRemise = 0;
if (remise === 'yes' || remise == 'oui'){
    // quel est le montant de la remise ?
    do{
        montantRemise = parseInt(prompt('Quel est le montant de la remise ?'));
        console.log(`mttHT ${typeof montantRemise}`);
    } while(isNaN(montantRemise))
    // application sur le montant ht
    mttHT -= mttHT*montantRemise/100;
}

// calcul et application de la tva
let mttTVA = mttHT * TAUX_TVA / 100;
let mttTTC = mttHT + mttTVA;

// affichage html
MA_DIV.innerHTML = `<p>Pour un montant HT de ${mttHT} €, il y a ${mttTVA}€ de TVA.</p> <p>Le montant TTC est donc de ${mttTTC}€.</p>`;

if(montantRemise > 0){
    MA_DIV.innerHTML += `<p>Une remise de ${montantRemise}% a été appliquée sur le montant HT.</p>`;
} else {
    MA_DIV.innerHTML += '<p>Aucune remise n\'a été appliquée</p>';
}