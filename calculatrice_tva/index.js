"use strict";

const TAUX_TVA = 20;

let mttHT = parseFloat(prompt('Veuillez saisir le montant hors taxe'));

console.log("mttHt : " + mttHT);

let mttTVA = mttHT * TAUX_TVA / 100;
let mttTTC = mttHT + mttTVA;

//document.querySelector("#content").textContent = "Pour un montant HT de " + mttHT + " €, il y a " + mttTVA + " € de TVA. Le montant TTC est donc de " + mttTTC + "€." ;

document.querySelector("#content").innerHTML = "<p>Pour un montant HT de " + mttHT + " €, il y a " + mttTVA + " € de TVA. Le montant TTC est donc de " + mttTTC + "€.</p>" ;
