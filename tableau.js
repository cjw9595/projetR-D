import {v, visualisation,h} from "./variables.js";
import {calcul_template_taille, compare_template_taille, melange_concat_view} from "./functions.js";
import {create_template_concat} from "./functions.js";
import {create_template_view} from "./functions.js";
import {vlSpec,vlSpec1} from "./variables.js";
import {create_vega_tree} from "./functions.js";


// Tableaux pour la génération de modèles
//concat list
let tableauC=[]
let list_template1=[]
let list_template2=[]
//view list
let tableauV=[]
//modèle total
let templateTotal=[]
//modèle aleatoire
let template_aleatoire=[]
//modèle optimisé
let template_optimimse=[]


// Event listeners for form submission and interaction
let visConfig=document.getElementById("visConf")
visConfig.addEventListener('submit',(event)=>
  {
    //get user submission: number of View
    event.preventDefault()
    let nbView = parseInt(document.getElementById("nbView").value)
    console.log(nbView)

    //create template(concat part)
    let element=[nbView-1,nbView]
    create_template_concat(tableauC,list_template1,element[0],h)
    create_template_concat(tableauC,list_template2,element[0],v)

    //choisir des views utilisé
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
   //create template(view part)
    create_template_view(tableauV,listV,0,element[1])

//get all results possibles with the same number of view and number of concat
    melange_concat_view(templateTotal,tableauC,tableauV)
    //choisir aleatoire modèle
    let choix=Math.floor(Math.random()*templateTotal.length)
    template_aleatoire=templateTotal[choix]
    console.log(template_aleatoire)
  //Remplacez les numéros dans la partie view par les objets de views correspondants
    for(let i=element[0];i<template_aleatoire.length;i++)
    {
      template_aleatoire[i]=visualisation[template_aleatoire[i]]
    }
    console.log("template alea")
    console.log(template_aleatoire)
  //calculer la taille du modèle aleatoire, set value
    document.getElementById("size_rand").innerHTML=calcul_template_taille(template_aleatoire,0,element[0]).toString()
  //créer un objet pour vega-lite
    let concatList=[]
    create_vega_tree(concatList,template_aleatoire,vlSpec,0)
    console.log(vlSpec)
  //afficher le graphique
    vegaEmbed('#aleatoire', vlSpec);

    //obtenir resultat optimisé
    template_optimimse=compare_template_taille(template_aleatoire,element[0],element[1],100000)
    console.log('the result is')
    console.log(template_optimimse)
    console.log('size is:')
    console.log(calcul_template_taille(template_optimimse,0,element[0]))
  //calculer la taille du modèle optimisé, set value
    document.getElementById("size_opti").innerHTML=calcul_template_taille(template_optimimse,0,element[0]).toString()
    concatList=[]
  //créer un objet pour vega-lite
    create_vega_tree(concatList,template_optimimse,vlSpec1,0)
    console.log(vlSpec1)
  //afficher le graphique
    vegaEmbed('#optimisation', vlSpec1);

  })

// Event listeners for refreshing the page
let refreshButton=document.getElementById("refresh")
refreshButton.addEventListener("click",(event)=>
{
    document.location.reload()
})

  







