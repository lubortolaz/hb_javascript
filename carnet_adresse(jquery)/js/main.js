'use strict';

/***
 *    ██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████ 
 *    ██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██      
 *    ██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████ 
 *     ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██ 
 *      ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████
 */

// le formulaire html
const FORM_HTML = $('#contact-form');

// nom utilisé pour stocker le carnet de contact
const STORAGE_NAME = 'contacts';

// traduction des index pour les titres
const TRAD_TITLE = ['', 'Mme', 'Mlle', 'Mr'];

/***
 *    ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████ 
 *    ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██      
 *    █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████ 
 *    ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██ 
 *    ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████ 
 */


/**
 * Affichage du formulaire HTML au clic sur "+" ou sur "éditer ce contact"
 */
function displayForm(index = null){
    console.info(`je passe ici : displayForm() en mode ${FORM_HTML.data('mode')}`);

    // on reset le form
    FORM_HTML[0].reset();

    // masquer les détails
    $('#contact-details').addClass('hide');

    // on est en mode édition, alors on pré-rempli le form
    if(FORM_HTML.data('mode') == 'edit'){
        let aContacts = getContactsFromLocalStorage();
        //let index = $(obj).data('index');
        $('#title').val(aContacts[index].title);
        $('#lastName').val(aContacts[index].lastName);
        $('#firstName').val(aContacts[index].firstName);
        $('#phone').val(aContacts[index].phone);
        // on passe l'index via les dataset
        $('#save-contact').data('index', index);
    } 
    
    // on affiche le formulaire
    FORM_HTML.removeClass('hide');
}

/**
 * Enregistrement du formulaire dans le local storage
 * @param {Event} event 
 */
function saveContact(event){
    console.info(`je passe ici : saveContact en mode ${FORM_HTML.data('mode')}`);
    event.preventDefault();

     // on récupère le json existant et on le change en tableau
    let aContacts = getContactsFromLocalStorage();

    // si pas de contacts existants, on crée un tableau vide
    if (aContacts == null) aContacts = [];

    // on récupère le contact entré en formulaire
    let oNewContact = new Object({
            title: $('#title').val().trim(),
            lastName: $('#lastName').val().trim(),
            firstName: $('#firstName').val().trim(),
            phone: $('#phone').val().trim()
    });

    // si c'est une modification
    if(FORM_HTML.data('mode') == 'edit'){
        console.log(`edition`);
        // on update le contact existant
        aContacts[$(this).data('index')] = oNewContact;
        // on repasse le form en mode add
        FORM_HTML.data('mode', 'add');
        // on vire l'index du bouton enregistrer
        $(this).removeData('index');

        console.info(`Contact modifié !`);//console.table(aContacts);
    } else { // c'est un ajout
        console.log(`ajout`);
        // on ajoute le nouveau contact au tableau de contacts
        aContacts.push(oNewContact);
        console.info(`Contact ajouté !`);//console.table(aContacts);
    }

    // on parse en json et on stocke en local
    setContactsInLocalStorage(aContacts);

    // on vide le formulaire et on le cache
    FORM_HTML[0].reset();
    FORM_HTML.addClass('hide');

    // mise à jour de la liste HTML
    displayList();
}

/**
 * Affichage de la liste de contacts
 */
function displayList(){

    // on vide la liste
    $('#address-book').empty();

    // on récupère les contacts 
    let aContacts = getContactsFromLocalStorage();

    if(aContacts!==null){

        // on crée le code HTML
        let html = '<ul>';
        aContacts.forEach((item, index) => {
            html += `<li><a data-index="${index}">${item.firstName} ${item.lastName}</a>
            <i data-index="${index}" data-index="${index}" data-name="${item.firstName} ${item.lastName}" class="fa fa-trash-o"></i>
            </li>`;
        });
        html += '</ul>';

        // on l'affiche
        $('#address-book').append(html);

        // évènement : clic sur un contact
        $('ul li a').on('click', displayContactDetail);

        // évènement : clic sur supprimer un contact
        $('ul li i.fa-trash-o').on('click', deleteOne);
    }

}

/**
 * Affichage du détail d'un contact
 * @param {Event} event 
 */
function displayContactDetail(event){
    event.preventDefault();

    FORM_HTML.addClass('hide');

    // index du contact à afficher
    let index = $(this).data('index');

    // on récupère les contacts enregistrés dans le local storage
    let aContacts = getContactsFromLocalStorage();
    let contact = aContacts[index];
    
    // on affiche le contact désiré
    $('#contact-details h3').text(TRAD_TITLE[contact.title] + ' ' + contact.firstName + ' ' + contact.lastName);
    $('#contact-details p').text(contact.phone);
    $('#contact-details a').data('index', index).on('click', displayUpdateForm);
    $('#contact-details').removeClass('hide');
}

/**
 * Fonction appelée lorque l'utilisateur clique sur "éditer ce contact"
 */
function displayUpdateForm(){
    // on passe le formulaire en mode édition
    FORM_HTML.data('mode', 'edit'); // ou .attr("data-mode","edit");
    // on affiche le formulaire avec les données à modifier
    displayForm($(this).data('index'));
}

/**
 * Supprimer tous les items
 */
function deleteAll(){
    console.info(`je passe ici : deleteAll()`);

    if(confirm('Tout supprimer?')) {
        // vider le localstorage
        setContactsInLocalStorage(null);
        // maj de l'affichage
        displayList();
    }
}

/**
 * Supprimer un item
 */
function deleteOne(){
    console.info(`je passe ici : deleteOne(${$(this).data('index')})`);

    if(confirm(`Supprimer ${$(this).data('name')} de la liste de contacts?`)) {
        let aContacts = getContactsFromLocalStorage();
        // si liste déjà vide, on sort
        if(aContacts == null) return false;
        // sinon on efface 1 élément à l'index data-intex
        aContacts.splice($(this).data('index'), 1);
        setContactsInLocalStorage(aContacts);
        // maj de l'affichage
        displayList();
    }
}

/**
 * Récupère la donnée dans le local storage et le change en tableau
 * @returns tableau 
 */
function getContactsFromLocalStorage(){
    return JSON.parse(localStorage.getItem(STORAGE_NAME));
}

/**
 * Change le tableau passé en paramètre en JSON
 * et le stocke dans le local storage
 * @param {Array} array 
 * @returns 
 */
function setContactsInLocalStorage(array){
    localStorage.setItem(STORAGE_NAME, JSON.stringify(array));
    return true;
}

/***
 *     ██████  ██████  ██████  ███████ 
 *    ██      ██    ██ ██   ██ ██      
 *    ██      ██    ██ ██   ██ █████   
 *    ██      ██    ██ ██   ██ ██      
 *     ██████  ██████  ██████  ███████
 */

// une fois que le code HTML est chargé...
$(document).ready(function(){

    // événement : clic sur bouton ajouter un contact
    $('#add-contact').on('click', displayForm);

    // évènement : soumission du formulaire
    $('#save-contact').on('click', saveContact);

    // évènement : vider la liste de contacts
    $('#clear-address-book').on('click', deleteAll);

    // affichage de la liste stockée dans le local storage
    displayList();

 });