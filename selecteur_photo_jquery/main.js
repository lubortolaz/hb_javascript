'use strict';

const LIS = $('.photo-list li');
const SELECT_ALL = $('#selectAll');
const DESELECT_ALL = $('#deselectAll');
const NUMBER_SELECTED = $('#total em');

// compter les items selectionnés + affichage html
function countSelected(){
    /*let nb = 0;
    LIS.forEach(li => {
        if (li.classList.contains('selected')) nb++;
    })*/
    let nb = $('li.selected').length;
    NUMBER_SELECTED.text(nb);
}

// sélection/déselection individuelle
LIS.on('click', function (){
    $(this).toggleClass('selected');
    countSelected();
});


// selectionner tout
SELECT_ALL.on('click', function() {
    LIS.addClass('selected');
    countSelected();
})

// déselectionner tout
DESELECT_ALL.on('click', function() {
    LIS.removeClass('selected');
    countSelected();
})