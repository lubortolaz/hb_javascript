"use strict";

let voiture = {
    marque : 'Renault',
    annee : 2014,
    dateAchat : new Date('2015-07-31'),
    passagers : [
        'Frodo', 'Sam', 'Gandalf'
    ]
};

let htmlPassagers = '';
voiture.passagers.forEach(ligne => 
    htmlPassagers += `<li>${ligne}</li>`);

document.querySelector('#content').innerHTML = `
<strong>Informations sur la voiture</strong>
<ul>
    <li>Marque : ${voiture.marque} </li>
    <li>Année de fabrication : ${voiture.annee} </li>
    <li>Date d'achat : ${voiture.dateAchat.toDateString()}</li>
    <li>
        Passagers : 
        <ol>
            ${htmlPassagers}
        </ol>
    </li>
</ul>
`;
