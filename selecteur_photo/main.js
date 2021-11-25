'use strict';

const LIS = document.querySelectorAll('.photo-list li');
const SELECT_ALL = document.querySelector('#selectAll');
const DESELECT_ALL = document.querySelector('#deselectAll');
const NUMBER_SELECTED = document.querySelector('#total em');

// compter les items selectionnés + affichage html
function countSelected(){
    /*let nb = 0;
    LIS.forEach(li => {
        if (li.classList.contains('selected')) nb++;
    })*/
    let nb = document.querySelectorAll('li.selected').length;
    NUMBER_SELECTED.textContent = nb;
}

// sélection/déselection individuelle
LIS.forEach(li => {
    li.addEventListener('click', function (){
        this.classList.toggle('selected');
        countSelected();
    });
})

// selectionner tout
SELECT_ALL.addEventListener('click', function() {
    LIS.forEach(li => {
        li.classList.add('selected');
        countSelected();
    })
})

// déselectionner tout
DESELECT_ALL.addEventListener('click', function() {
    LIS.forEach(li => {
        li.classList.remove('selected');
        countSelected();
    })
})