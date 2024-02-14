import {visualisation} from "./variables.js";
import {melange_concat_view} from "./functions.js";
import {create_template_concat} from "./functions.js";
import {create_template_view} from "./functions.js";
import {vlSpec} from "./variables.js";
import {create_vega_tree} from "./functions.js";

const h="hconcat"
const v="vconcat"



function swapElements(array, index1, index2){
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

let tableauC=[]
let list_template1=[""]
let list_template2=[""]
let tableauV=[]
let templateTotal=[]

let element=[3,4]

create_template_concat(tableauC,list_template1,element[0],h)
create_template_concat(tableauC,list_template2,element[0],v)
//templateTotal=tableauC
let listV=[]
for(let i=0;i<element[1];i++)
{
  let statue=1;
  while(1)
  {
    let choix=Math.floor(Math.random()*10)
    if(!listV.includes(choix))
    {
      listV.push(choix)   
      break; 
    }
  }
}

console.log(listV)
create_template_view(tableauV,listV,0,element[1])


console.log(tableauC)
console.log(tableauV)
melange_concat_view(templateTotal,tableauC,tableauV)
console.log(templateTotal)

let first=templateTotal[1]
console.log(first)
let template=[...first]
console.log(template)
for(let i=element[0]; i<element[0]+element[1];i++)
{
  template[i]=visualisation[first[i]]
}
console.log(template)
  
  let concatList=[]
    create_vega_tree(concatList,template,vlSpec,0)
    console.log(vlSpec)

      // Embed the visualization in the container with id `vis`
    vegaEmbed('#vis', vlSpec)

