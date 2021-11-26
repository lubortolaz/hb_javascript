'use strict';

const ART_CONTENT = document.querySelector('#content');
const BTNS = document.querySelectorAll('aside button');
const BTN_EXPORT = document.querySelector('#export');
const POPUP = document.querySelector('#popup');

/**
 * Ajouter un élément éditable
 * @param {*} type 
 * @param {*} txt 
 */
function addElement2 (type, txt) {
    // crée un nouvel élément du type passé en paramètre
    var newElement = document.createElement(type);
    if (type !== 'hr'){
        // le rendre éditable
        newElement.setAttribute("contenteditable", "true");
        // et lui mettre un peu de contenu
        var newContent = document.createTextNode(txt);
        newElement.appendChild(newContent);
    }
    // ajoute le nouvel élément créé et son contenu dans le DOM
    ART_CONTENT.insertAdjacentElement('beforeend', newElement);
}

/**
 * Fonction appelée afin de générer un élément
 */
function generateHTML(){
    addElement2(this.id, this.dataset.placeholder);
}

/**
 * Exporter le HTML
 */
function exportHTML(){
    var contentElement = document.querySelector('#content');

    for (let i = 0; i < contentElement.children.length; i++) {
        console.log(contentElement.children[i]);
        contentElement.children[i].removeAttribute("contenteditable");
    }

    var newElement = document.createElement('div');
    newElement.appendChild(document.createTextNode(contentElement.innerHTML));

    POPUP.insertAdjacentElement('beforeend', newElement);
    POPUP.classList.remove('hide');
}

/**
 * Cacher la popum
 */
function hidePopup(){
    POPUP.classList.add('hide');
}

// code principal 

BTNS.forEach(btn => {
    btn.addEventListener('click', generateHTML);
})

BTN_EXPORT.addEventListener('click', exportHTML);

POPUP.addEventListener('dblclick', hidePopup );