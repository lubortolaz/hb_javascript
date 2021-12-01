/**
 * TESTS
 */
let avengers = [
    {title: 3, lastName: 'Fils d\'Odin', firstName: 'Thor', phone: '01589654751'},
    {title: 3, lastName: 'Udaku', firstName: 'T\'Challa', phone: '0369853214'},
    {title: 1, lastName: 'Maximoff', firstName: 'Wanda', phone: '0325897412'},
    {title: 3, lastName: 'Stark', firstName: 'Tony', phone: '0397896547'},
    {title: 3, lastName: 'Rogers', firstName: 'Steve', phone: '0397842147'},
    {title: 2, lastName: 'Rambeau', firstName: 'Monica', phone: '0897542147'},
    {title: 3, lastName: 'Strange', firstName: 'Stephen', phone: '07985423147'},
    {title: 1, lastName: 'Romanoff', firstName: 'Natasha', phone: '0369821452'},
    {title: 2, lastName: 'Danvers', firstName: 'Carol', phone: '0856475214'},
    {title: 3, lastName: 'Maximoff', firstName: 'Pietro', phone: '0456547852'},
    {title: 3, lastName: 'Parker', firstName: 'Peter', phone: '0165896547'}

];

function test(){
    let aContacts = JSON.parse(localStorage.getItem(STORAGE_NAME));

    // si pas de contacts existants, on crée un tableau vide
    if (aContacts == null) aContacts = [];

    avengers.forEach(item => {
        aContacts.push(item);
    });
    
    // on parse en json et on stocke en local
    let json = JSON.stringify(aContacts);
    localStorage.setItem(STORAGE_NAME, json);

    // mise à jour de la liste HTML
    displayList();
}