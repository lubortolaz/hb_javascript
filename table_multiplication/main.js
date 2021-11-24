'use strict';

const DIV_CONTENT = document.querySelector('#content');
let codeHtml = '';
let max = 15;

codeHtml += `<table>`;
for(var i=1; i<=max; i++){
    codeHtml += `<tr>`;
    for (var j=1 ; j<=max ; j++){
        if(i === j){
            codeHtml += `<td class="same-number">${i*j}</td>`;
        }
        else{
            codeHtml += `<td>${i*j}</td>`;
        }
    }
    codeHtml += `</tr>`;
}
codeHtml += `</table>`;


DIV_CONTENT.innerHTML = codeHtml;