'use strict';

const RECT = document.querySelector('.rectangle');

function hide(){
    RECT.classList.toggle('hide');
}

function important(){
    RECT.classList.add('important');
}

function removeImportantGood(){
    RECT.classList.remove('important', 'good');
}

function good(){
    RECT.classList.toggle('good');
}

document.querySelector('#toggle-rectangle').addEventListener('click',hide);

RECT.addEventListener('mouseover',important);
RECT.addEventListener('mouseout',removeImportantGood);

RECT.addEventListener('dblclick',good);