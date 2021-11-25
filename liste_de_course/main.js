'use strict';

let listeCourse = new Array();

function addItem(item){
    //listeCourse[listeCourse.length] = item;
	listeCourse.push(item);
}

function delItem(item){
    let index = listeCourse.indexOf(item);
    if (index > -1) {
        listeCourse.splice(index, 1);
    }
}

function requestLine(){
    return prompt('Insérer une ligne ');
}

function display(){
    console.log(listeCourse);
    console.log(`La liste contient ${listeCourse.length} produit(s).`);
}

addItem("test");
addItem("test2");
addItem("test3");
addItem("test4");
addItem("test5");

console.warn('1');
display();

addItem(requestLine().toLowerCase());

console.warn('2');
display();

delItem(prompt('Quel item souhaitez vous supprimer?', 'test3').toLowerCase());

console.warn('3');
display();

listeCourse.length = 0;

console.warn('4');
display();