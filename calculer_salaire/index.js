'use strict';

let salary;

do{
    salary = parseFloat(prompt('Veuillez saisir le montant de votre salaire brut'));
} while(isNaN(salary))

if(confirm('Voulez vous connaitre le montant des charges ?')){
    alert(`Le montant des charges est de ${salary*0.22}. Votre salaire net est donc de ${salary-salary*0.22}`);
}
else{
    alert(`Votre salaire net est de ${salary-salary*0.22}`);
}