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
    RECT.classList.add('good');
}

document.querySelector('#toggle-rectangle').addEventListener('click',hide);

//sur le rectangle -> quand la souris rentre -> becomeRed
RECT.addEventListener('mouseover',important);

//sur le rectangle -> quand la souris sort -> becomeBlue
RECT.addEventListener('mouseout',removeImportantGood);

//sur le rectangle -> au double clic -> becomeBeige
RECT.addEventListener('dblclick',good);