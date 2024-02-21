import {visualisation} from "./variables.js";
import {melange_concat_view} from "./functions.js";
import {create_template_concat} from "./functions.js";
import {create_template_view} from "./functions.js";
import {vlSpec} from "./variables.js";
import {create_vega_tree} from "./functions.js";



// Arrays for template generation
let tableauC=[]
let list_template1=[""]
let list_template2=[""]
let tableauV=[]
let templateTotal=[]

// Function to create a new tableau by concatenating part concat and part visualisation

// Function to create concatenation part for a template

// Function to exchange two element in an array
function swapElements(array, index1, index2){
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

//function to update vega-lite objet using template choosen


// Event listeners for form submission and interaction
let visConfig=document.getElementById("visConf")
let affichage=document.getElementById("affichage")
let concatOp=document.getElementById("concatOp")
visConfig.addEventListener('submit',(event)=>
  {
    //get user submission
    event.preventDefault()
    let nbView = document.getElementById("nbView").value
    let nbLayout=document.getElementById("nbLayout").value
    console.log(nbView)
    console.log(nbLayout)

    //create template
    let element=[nbView-1,nbView]
    create_template_concat(tableauC,list_template1,element[0],h)
    create_template_concat(tableauC,list_template2,element[0],v)

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
   
    create_template_view(tableauV,listV,0,element[1])

    melange_concat_view(templateTotal,tableauC,tableauV)
    console.log(templateTotal)
    let layoutList=[]
    let template=[]
    while(layoutList.length!=nbLayout)
    {
      let choix=Math.floor(Math.random()*templateTotal.length)
      let layout=templateTotal[choix].slice(0,nbView-1)
      if(!layoutList.includes(layout))
      {
        layoutList.push(layout)
        template.push(templateTotal[choix])
      }
    }

    console.log(layoutList)
    console.log(template)

//show all choice user can choose
   for(let i=0;i<layoutList.length;i++)
   {
      let newOp=document.createElement("option")
      newOp.value=template[i]
      newOp.textContent=template[i].slice(0,nbView-1)
      concatOp.appendChild(newOp)
   }
  })

// Event listeners for refreshing the page
let refreshButton=document.getElementById("refresh")
refreshButton.addEventListener("click",(event)=>
{
    document.location.reload()
})

//Event listeners for creating template from user's choice, updateing the element Vega-Lite and showing element Vega-Lite
concatOp.addEventListener("change",(event)=>
{
    let choix=event.target.value
    console.log(choix)
    let nbView = document.getElementById("nbView").value
    let templateUse=[]
    for(let i=0;i<nbView-1;i++)
    {
      let concat
      if(i==0)
      {
        concat=choix.slice(i*7,7*(i+1))
      }
      if(i!=0)
      {
        concat=choix.slice(8*i,8*i+7)
      }
      templateUse.push(concat)
    }  
    for(let i=0;i<nbView;i++)
    {
      let view=choix[8*(nbView-1)+2*i]
      templateUse.push(view)
    }
    console.log(templateUse)
    let template=[...templateUse]
    for(let i=nbView-1;i<template.length;i++)
    {
      templateUse[i]=visualisation[template[i]]
    } 
    console.log(templateUse)
    let concatList=[]
    create_vega_tree(concatList,templateUse,vlSpec,0)
    console.log(vlSpec)


    vegaEmbed('#vis', vlSpec);

})
  







