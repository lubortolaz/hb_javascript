'use strict';

/***
 *    ██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████
 *    ██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██     
 *    ██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████
 *     ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██
 *      ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████
 */

const FORM = document.querySelector('#task-form');

const TODOLIST = document.querySelector('#todo');

const STORAGE_NAME = 'todolist';
 
/***
 *    ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
 *    ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██     
 *    █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
 *    ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
 *    ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
 */

function showFormAdd(){
    // mettre le fomulaire en mode "ajout" par défaut et vider le formulaire
    FORM.dataset.mode = 'add';
    FORM.reset();
    showForm();
}

/**
 * Afficher le formulaire
 */
function showForm(){
    console.log(`je passe ici showForm()`);
    
    FORM.classList.remove('hide');
}

/**
 * Afficher la liste des tâches enregistrées
 */
function showList(){

    let aTasks = getDatas();

    if(aTasks !== null && aTasks.length > 0){
        TODOLIST.innerHTML = '<ul>';

        aTasks.forEach((item, index) => {
            TODOLIST.innerHTML += `<li><a data-index="${index}">${item.taskname} - ${item.lvl}%</a>
            <i data-index="${index}" class="fa fa-trash"></i></li>`;
        });

        TODOLIST.innerHTML += '</ul>';

        document.querySelectorAll('#todo a').forEach(a => {
            a.addEventListener('click', showDetails);
        });

        document.querySelectorAll('#todo i').forEach(i => {
            i.addEventListener('click', deleteOne);
        });

    }
    else{
        TODOLIST.innerHTML = '';
    }
   
}

/**
 * Afficher les détails
 */
function showDetails(){
    FORM.classList.add('hide');
    let index = this.dataset.index;

    let aTasks = getDatas();

    document.querySelector('#task-details h3').textContent = aTasks[index].taskname + ' - ' + aTasks[index].lvl + '%';
    document.querySelector('#task-details p').textContent = aTasks[index].description;
    document.querySelector('#task-details a').dataset.index = index;
    document.querySelector('#task-details').classList.remove('hide');
}

/**
 * Récupérer les tâches enregistrées dans le localStorage et les mettre dans un tableau
 * @returns tableau d'objets
 */
function getDatas(){
    return JSON.parse(localStorage.getItem(STORAGE_NAME));
}

/**
 * Enregistrer une tâche entrée dans le formulaire dans le localStorage
 * @param {*} e 
 */
function saveTask(e){
    console.log(`je passe ici saveTask() ${FORM.dataset.mode}`);
    e.preventDefault();

    console.warn(this);

    // récupérer les infos du formulaire
    let oTask = {
        lvl : document.querySelector('#lvl').value,
        taskname : document.querySelector('#name').value,
        description : document.querySelector('#description').value
    };

    // récupérer les tâches déjà enregistrées
    let aTasks = getDatas();

    // si pas de données, créer un tableau vide
    if(aTasks == null) aTasks = [];

    // enregistrer dans le localStorage
    // édition ou ajout
    if(FORM.dataset.mode == 'edit'){
        aTasks[this.dataset.index] = oTask;
    } else {
        aTasks.push(oTask);
    }
    let json = JSON.stringify(aTasks);
    localStorage.setItem(STORAGE_NAME, json);

    FORM.dataset.mode = 'add';
    FORM.reset();
    FORM.classList.add('hide');

    // mettre à jour l'affichage
    showList();
}

/**
 * Editer une tâche
 */
function editTask(){
    FORM.dataset.mode = 'edit';
    let aTasks = getDatas();
    let index = this.dataset.index;
    document.querySelector('#lvl').value = aTasks[index].lvl;
    document.querySelector('#name').value = aTasks[index].taskname;
    document.querySelector('#description').value = aTasks[index].description;
    document.querySelector('#save').dataset.index = index;
    showForm();
}

/**
 * Supprimer toutes les tâches
 */
function deleteAll(){
    console.log(`jpasse là`);
    if(confirm('Voulez-vous supprimer toutes les tâches?')){
        localStorage.removeItem(STORAGE_NAME);
        // mettre à jour l'affichage
        showList();
    }
}

/**
 * Supprimer une tâche
 */
function deleteOne(){
    console.warn(this);
    if(confirm('Voulez-vous supprimer cette tâche?')){
        let aTasks = getDatas();
        let index = this.dataset.index;
        aTasks.splice(index, 1);
        let json = JSON.stringify(aTasks);
        localStorage.setItem(STORAGE_NAME, json);
         // mettre à jour l'affichage
        showList();
    }
}

/***
 *    ████████ ███████ ███████ ████████ ███████ 
 *       ██    ██      ██         ██    ██      
 *       ██    █████   ███████    ██    ███████ 
 *       ██    ██           ██    ██         ██ 
 *       ██    ███████ ███████    ██    ███████                                          
 */

let datas = [
    {lvl: 100, taskname: "Oeuf d\'or", description: "La première tâche du Tournoi des Trois Sorciers a lieu le 24 novembre 1994 et consiste à s'emparer d'un œuf d'or, couvé par un dragon parmi ses vrais œufs. Pour cela, le champion doit détourner l'attention du dragon puis s'emparer de cet œuf. Les champions se voient attribués un dragon différent chacun. Fleur Delacour va affronter un Vert gallois, Cedric Diggory un Suédois à museau court, Viktor Krum un Boutefeu chinois et Harry Potter un Magyar à pointes."},
    {lvl: 75, taskname: "Lac noir", description: "La deuxième tâche du Tournoi des Trois Sorciers a lieu le 24 février 1995 et consiste à nager sous l'eau pendant une heure pour récupérer un 'trésor' qui est en fait une personne chère au champion. Pour cela, le champion doit résoudre l'énigme de l'œuf reçu lors de la première tâche puis trouver un moyen de respirer sous l'eau. Harry Potter utilise de la Branchiflore, Viktor Krum tente de se métamorphoser en requin et Cedric Diggory et Fleur Delacour optent pour le sortilège de Têtenbulle."},
    {lvl: 0, taskname: "Labyrinthe", description: "La troisième tâche du Tournoi des Trois Sorciers a lieu le 24 juin 1995 et consiste à s'emparer du Trophée des Trois Sorciers caché dans un labyrinthe, rempli de créatures dangereuses comme des Scroutts à pétard et un sphinx."}
];

function test(){
    // récupérer les tâches déjà enregistrées
    let aTasks = getDatas();

    // si pas de données, créer un tableau vide
    if(aTasks == null) aTasks = [];

    // enregistrer dans le localStorage
    datas.forEach(item => {
        aTasks.push(item);
    });
    let json = JSON.stringify(aTasks);
    localStorage.setItem(STORAGE_NAME, json);

    // mettre à jour l'affichage
    showList();
}


 
/***
 *     ██████  ██████  ██████  ███████
 *    ██      ██    ██ ██   ██ ██     
 *    ██      ██    ██ ██   ██ █████  
 *    ██      ██    ██ ██   ██ ██     
 *     ██████  ██████  ██████  ███████
 */

 document.addEventListener("DOMContentLoaded", function(){

    //test();

    // événement : clic sur le bouton "+"
    document.querySelector('#add-task').addEventListener('click', showFormAdd);
     
    // événement : clic sur le bouton "Enregistrer"
    document.querySelector('#save').addEventListener('click', saveTask);

    // événement : clic sur le lien "Editer cette tâche"
    document.querySelector('#task-details a').addEventListener('click', editTask);

    // événement : clic sur le bouton "Effacer les tâches"
    document.querySelector('#clear-todo').addEventListener('click', deleteAll);

    // afficher la liste des tâches enregistrées
    showList();
 });