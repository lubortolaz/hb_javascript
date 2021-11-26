'use strict';

/************************
 * VARIABLES
 ************************/

const SLIDES = [{image: '1.jpg', caption: 'description 1'},
{image: '2.jpg', caption: 'description 2'}, 
{image: '3.jpg', caption: 'description 3'}, 
{image: '4.jpg', caption: 'description 4'}, 
{image: '5.jpg', caption: 'description 5'}, 
{image: '6.jpg', caption: 'description 6'}];

const FOLDER = 'images/';

const SLIDER_IMG = document.querySelector('#slider img');
const SLIDER_FIGCAPTION = document.querySelector('#slider figcaption');
const SLIDER_ARROW_TOOLS = document.querySelector('#toolbar-toggle i');

let state = new Object();

/************************
 * FONCTIONS
 ************************/

/**
 * Affiche la photo dont l'index est state.index
 */
function refreshSlider(){
    //console.log(`refreshSlider, index = ${index}`);
    SLIDER_IMG.src = FOLDER + SLIDES[state.index].image;
    // ou la méthode setAttribute()
    //SLIDER_IMG.setAttribute('src', 'images/' + SLIDES[index].image);
    SLIDER_FIGCAPTION.textContent = SLIDES[state.index].caption;
}

/*function refreshSlider(index){
    console.log(`refreshSlider, index = ${index}`);
    SLIDER_IMG.classList.add('transitioning-src');
    setTimeout(() => {
        SLIDER_IMG.src = 'images/' + SLIDES[index].image;
        SLIDER_IMG.classList.remove('transitioning-src');
    }, 600); // Ensure timeout matches transition time, remove transition class
    SLIDER_FIGCAPTION.textContent = SLIDES[index].caption;
}*/

/**
 * Lance l'affichage de la fonction suivante
 */
function displayNext(){
    state.index++;
    if(state.index == SLIDES.length) state.index = 0;
    refreshSlider();
    //console.log(`displayNext ${state.index}`);
}

/************************
 * CODE PRINCIPAL
 ************************/

// après le chargement du HTML
document.addEventListener("DOMContentLoaded", function(){
    // initialisation du carouysel
    SLIDER_IMG.style.maxWidth = '50%';

    state.index = 0;
    state.timer = null;
    refreshSlider();

    // bouton afficher/masquer barre d'outils
    document.querySelector('#toolbar-toggle').addEventListener('click', function(){
        SLIDER_ARROW_TOOLS.classList.toggle('fa-arrow-right');
        SLIDER_ARROW_TOOLS.classList.toggle('fa-arrow-down');
        //SLIDER_ARROW_TOOLS.classList.toggle("fa-rotate-90");
        document.querySelector('.toolbar ul').classList.toggle('hide');
    });

    // bouton suivant
    document.querySelector('#slider-next').addEventListener('click', displayNext);

    // bouton précédent
    document.querySelector('#slider-previous').addEventListener('click', function(){
        state.index--;
        if(state.index < 0) state.index = SLIDES.length - 1;
        refreshSlider();
    });

    // bouton random
    document.querySelector('#slider-random').addEventListener('click', function(){
        let rand;
        do{
            rand = getRandomInt(0, SLIDES.length - 1);
        } while(rand == state.index)
        state.index = rand;
        refreshSlider();
    });

    // bouton lecture/pause
    document.querySelector('#slider-toggle').addEventListener('click', function(){
        console.log(`#slider-toggle click`);
        if(state.timer !== null){
            // pas de timer en cours, on met en pause
            document.querySelector('#slider-toggle i').classList.replace('fa-pause', 'fa-play');
            window.clearInterval(state.timer);
            state.timer = null;
        }
        else{
            // marche
            document.querySelector('#slider-toggle i').classList.replace('fa-play', 'fa-pause');
            state.timer =  window.setInterval(displayNext, 2000);
        }
    });
});


