"use strict";

let tab = [
  {
    prenom : "Toto",
    age : 12
  },
  {
    prenom : "Lucette",
    age : 14
  },
  {
    prenom : "Antoinette",
    age : 13
  },
  {
    prenom : "Gribouille",
    age : 13
  }
];

// while
console.warn("WHILE");
let i = 0;
// tant que i est inférieur à la longueur du tableau
while (i < tab.length){
	console.log(`Prénom : ${tab[i].prenom} | Age : ${tab[i].age}`);
	i++; //on incrémente
}

// for
console.warn("FOR");
for (let i = 0; i < tab.length; i++){
	console.log(`Prénom : ${tab[i].prenom} | Age : ${tab[i].age}`);
}

// for... of
console.warn("FOR...OF");
for (let line of tab){
	console.log(`Prénom : ${line.prenom} | Age : ${line.age}`);
}

// foreach
console.warn("FOREACH");
tab.forEach(line => {
	console.log(`Prénom : ${line.prenom} | Age : ${line.age}`);
})

// do while
console.warn("DO WHILE");
i = 0;
do{
  console.log(`Prénom : ${tab[i].prenom} | Age : ${tab[i].age}`);
  i++;
} while (i<tab.length)
