"use strict";

/***
 *    ██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████
 *    ██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██
 *    ██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████
 *     ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██
 *      ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████
 */

const DIV_ENCART = $("#encart");

/***
 *    ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
 *    ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
 *    █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
 *    ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
 *    ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
 */


/**
 * Affiche le contenu saisi par l'utilisateur dans l'encart prévu à cet effet
 * @param {Event} e 
 */
function onClickSubmit(e) {
  e.preventDefault();
  // récupérer le contenu saisi
  let content = $("textarea").val();
  // convertir les sauts de lignes pour l'affichage
  content = content.replace(/(\r\n|\n\r|\r|\n)/g, "<br />");
  // injecter le contenu dans le HTML
  DIV_ENCART.html(content);
}

/**
 * Traduire le markdown en HTML
 * @param {Event} text 
 * @returns {String} contenu HTML
 */
function MD2HTML(text){
    // variable retournée
    let html;
    // analyse des premiers caractères de la ligne
    // pour en déduire le tag HTML correspondant
    if (text == ''){
    html = `<br>`;
    } else if (text[0] == '#'){
        if (text[1] == '#'){
            if (text[2] == '#'){
                if (text[3] == '#'){
                    // h4
                html = `<h4>${text.substring(4).trim()}</h4>`;
                } else {
                    //  h3
                html = `<h3>${text.substring(3).trim()}</h3>`;
                }
            } else {
                // h2
            html = `<h2>${text.substring(2).trim()}</h2>`;
            }
        } else {
            // h1
        html = `<h1>${text.substring(1).trim()}</h1>`;
        }
    } else if(text[0] == '-'){
        // li
    html = `<li>${text.substring(1).trim()}</li>`;
    } else if(text[0] == '>'){
        // blockquote
    html = `<blockquote>${text.substring(1).trim()}</blockquote>`;
    } else{
        // p
    html = `<p>${text.trim()}</p>`;
    }

    return html;
}

/**
 * Convertir chaque ligne saisie en html et l'afficher dans l'encart prévu à cet effet
 * @param {Event} e 
 */
function onClickToMD(e) {
  e.preventDefault();

  // supprimer le contenu de l'encart
  DIV_ENCART.empty();

  // récupérer le contenu saisi par l'utilisateur
  let content = $("textarea").val();
  let aContent = content.split(/\r\n|\n\r|\r|\n/);

  // convertir ce contenu en html et l'afficher dans l'encart
  aContent.forEach(line => {
    DIV_ENCART.append(MD2HTML(line));
  });
}

/***
 *     ██████  ██████  ██████  ███████
 *    ██      ██    ██ ██   ██ ██
 *    ██      ██    ██ ██   ██ █████
 *    ██      ██    ██ ██   ██ ██
 *     ██████  ██████  ██████  ███████
 */

$(document).ready(function () {
  $("#submit").on("click", onClickSubmit);
  $("#toMarkdown").on("click", onClickToMD);
});
