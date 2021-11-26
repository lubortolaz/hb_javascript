'use strict';

const BTN_ADD = document.querySelector('#submit');
const BTN_DEL_ALL = document.querySelector('#delete');
const BTN_DEL_ONE = document.querySelector('#deleteOne');
const TO_ADD = document.querySelector('#toAdd');
const TO_DEL = document.querySelector('#toDelete');
const BTN_TO_DEL_ONE = document.querySelector('#btnDelete');
const POPUP = document.querySelector('#popup');
const UL = document.querySelector('ul.list');
const H2 = document.querySelector('h2');

let items = [];

/**
 * Ajoute l'item entré en paramètre dans la liste ul et dans le tableau items
 * @param {*} item 
 */
function addItem(item){
    items.push(item);
    var newElement = document.createElement('li');
    newElement.appendChild(document.createTextNode(item));
    UL.insertAdjacentElement('beforeend', newElement);
    displayList();
}

/**
 * Fonction appelée lorsqu'on clique sur "Ajouter"
 */
function btnAddClick(){
    let item = TO_ADD.value;
    if(item !== '' && !items.includes(item)){
        addItem(item);
        TO_ADD.value = '';
    }
}

/**
 * Fonction appelée lorsqu'on clique sur "Vider"
 */
function btnDeleteAll(){
    UL.innerHTML = '';
    items = [];
    displayList();
}

/**
 * Supprime un item de la liste
 */
function deleteOneItem(){
    let item = items.indexOf(TO_DEL.value);
    if (item > -1){ //items.includes(item)
        items.splice(item, 1);
        UL.removeChild(UL.childNodes[item+1]);
        displayList();
    }
    else{
        alert('Item absent !');
    }
}

/**
 * Fonction appelée lorsqu'on clique sur "Supprimer 1 aliment"
 */
function btnDeleteOne(){
    togglePopup();
    BTN_TO_DEL_ONE.addEventListener('click', deleteOneItem);
    document.querySelector('h3 span').addEventListener('click', togglePopup);
    displayList();
}

/**
 * Afficher/masquer la popou
 */
function togglePopup(){
    POPUP.classList.toggle('hide');
}

/**
 * Mise à jour du compteur d'aliment
 */
function displayList(){
    H2.textContent = `La liste contient ${items.length} produit(s)`;
}

// Déclencher le code une fois la page HTML chargée
document.addEventListener("DOMContentLoaded", function(){
    // click sur le bouton "Ajouter"
    BTN_ADD.addEventListener('click', btnAddClick);

    // click sur le bouton "Vider"
    BTN_DEL_ALL.addEventListener('click', btnDeleteAll); 

    // click sur le bouton "Supprimer un aliment"
    BTN_DEL_ONE.addEventListener('click', btnDeleteOne); 

    // Affichage du nombre d'éléments
    displayList();

});

