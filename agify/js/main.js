'use strict';

/***
 *     __   ___   ___ ___   _   ___ _    ___ ___
 *     \ \ / /_\ | _ \_ _| /_\ | _ ) |  | __/ __|
 *      \ V / _ \|   /| | / _ \| _ \ |__| _|\__ \
 *       \_/_/ \_\_|_\___/_/ \_\___/____|___|___/
 *                                              
 */

const URL_API = 'https://api.agify.io?name=';


 
/***
 *      ___ _   _ _  _  ___ _____ ___ ___  _  _ ___
 *     | __| | | | \| |/ __|_   _|_ _/ _ \| \| / __|
 *     | _|| |_| | .` | (__  | |  | | (_) | .` \__ \
 *     |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|___/
 *                                                 
 */

/**
 * Retourne la chaîne de caractère passée en paramètre sans les caractères accentués
 * @param {String} text 
 * @returns {String}
 */
 function strNoAccent(text) {
    var b="áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
        c="aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
        d="";
    for(var i = 0, j = text.length; i < j; i++) {
      var e = text.substr(i, 1);
      d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
    }
    return d;
  }

/**
 * Fonction appelée lors du clic sur le bouton "Valider"
 * @param {Event} e 
 */
function onClickSubmit(e){
    e.preventDefault();

    // récupérer le prénom saisi par l'utilisateur
    let firstname = document.querySelector('#firstname').value;

    if (firstname == ''){
        alert('Veuillez remplir le formulaire avant de valider');
    } else{
        // remplacement des caractères accentués par des caractères non accentués
        firstname = strNoAccent(firstname);
        // appel de l'API
        callAPI(firstname);
    } 
}

/**
 * Appel de l'API agify avec le prénom passé en paramètre
 * @param {String} val Prénom
 */
function callAPI(val){
    fetch(URL_API + val)
    .then(function (response) {
        //response contient la réponse brute du serveur et retourne le body en texte
        console.warn('then 1');console.log(response);
        return response.json();
      })
      .then(function (datas) {
        //datas contient ce que renvoit response.text() donc le contenu du retour du serveur
        //appel de la fonction dont le nom est passé en paramètre
        console.warn('then 2');console.log(datas);
        callback(datas);
      })
      .catch(function (error) {
        //au cas où une erreur surviendrait à moment donné, notamment dans la fonction callback
        console.error(`Une erreur est survenue : ${error}`);
        alert('Une erreur est survenue');
      });
}

/**
 * Fonction de callback appelée après l'appel AJAX
 * @param {Object} datas 
 */
function callback(datas){
    if (datas.age == null){
        document.querySelector('article h2').textContent = `Agify n'a pas de données pour le prénom ${datas.name}`;
    }
    else{
        document.querySelector('article h2').textContent = `D'après Agify, avec le prénom ${datas.name}, tu as ${datas.age} ans.`;
    }
    document.querySelector('article p strong').textContent = datas.count;
    document.querySelector('article').classList.remove('hide');
}
 
/***
 *       ___ ___  ___  ___
 *      / __/ _ \|   \| __|
 *     | (_| (_) | |) | _|
 *      \___\___/|___/|___|
 *                        
 */

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('#submit').addEventListener('click', onClickSubmit);
});