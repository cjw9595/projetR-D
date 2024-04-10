import {create_template_total, test } from "./functions.js"

//modèle total
let templateTotal=[]
let listIteration=[1,1000,5000,10000,50000,100000]
let data=[]

for (let nbC=1;nbC<9;nbC++) {
    let value=[]
    create_template_total(templateTotal,nbC,nbC+1)
    //console.log(templateTotal)
    test(listIteration,10,value,templateTotal,nbC)
  /*  if(nbC==1)
    {
        data=test(listIteration,10,value,templateTotal,nbC)}
    else
    {
        let donnee=test(listIteration,10,value,templateTotal,nbC)
        data.concat(donnee)
    }*/
   console.log(value)

}
/*
const csvContent = data.map(row => row.join(';')).join('\n');
const blob = new Blob([csvContent], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.setAttribute('href', url);
link.setAttribute('download', 'data.csv');
document.body.appendChild(link);
link.click();
*/


