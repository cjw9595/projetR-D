import {v, visualisation,h} from "./variables.js";
import {calcul_template_taille, compare_template_taille, melange_concat_view} from "./functions.js";
import {create_template_concat} from "./functions.js";
import {create_template_view} from "./functions.js";
import {vlSpec,vlSpec1} from "./variables.js";
import {create_vega_tree} from "./functions.js";


// Tableaux pour la génération de modèles
//liste de la concatenation
let tableauC=[]
let list_template1=[]
let list_template2=[]
// liste de la visualisation
let tableauV=[]
//liste pour les modèles totals
let templateTotal=[]
//liste pour le modèle aleatoire
let template_aleatoire=[]
//liste pour le modèle optimisé
let template_optimimse=[]


// Event listeners for form submission and interaction
let visConfig=document.getElementById("visConf")
visConfig.addEventListener('submit',(event)=>
  {
    //get user submission: number of View and number of iteration used for optimisation
    event.preventDefault()
    let nbView = parseInt(document.getElementById("nbView").value)
    console.log('nombre du graphique:%d',nbView)
    let nbIteration=parseInt(document.getElementById("nbIteration").value)
    console.log("nombre d'iteration:%d",nbIteration)

    //use element[] stock number of Concat and number of view
    let element=[nbView-1,nbView]
    //create model(concat part)
    create_template_concat(tableauC,list_template1,element[0],h)
    create_template_concat(tableauC,list_template2,element[0],v)

    //choose views will be used
    let listV=[] //stock these views
    for(let i=0;i<element[1];i++)
    {
      while(1)
      {
        let choix=Math.floor(Math.random()*10)  //select random number between [0,nbView)
        if(!listV.includes(choix))
        {
          listV.push(choix)   
          break; 
        }
      }
    }
   //create template(view part)
    create_template_view(tableauV,listV,0,element[1])

    //get all results possibles with the same number of view and number of concat (toutes les permutations possibles)
    melange_concat_view(templateTotal,tableauC,tableauV)

    //random number between [0,size of table)
    let choix=Math.floor(Math.random()*templateTotal.length)
    template_aleatoire=templateTotal[choix]     //choisir aleatoire modèle
    console.log("random model without objects views:%o",template_aleatoire)
    //Remplacez les numéros dans la partie view par les objets de views correspondants
    for(let i=element[0];i<template_aleatoire.length;i++)
    {
      template_aleatoire[i]=visualisation[template_aleatoire[i]]
    }
    console.log("template aleatoire:%o",template_aleatoire)

    //calculer la taille du modèle aleatoire, l'afficher dans la page
    document.getElementById("size_rand").innerHTML=calcul_template_taille(template_aleatoire,0,element[0]).toString()

    //créer un objet pour vega-lite
    let concatList=[]
    create_vega_tree(concatList,template_aleatoire,vlSpec,0)
    console.log("objet vega-lite:%o",vlSpec)

    //afficher le objet Vega-lite
    vegaEmbed('#aleatoire', vlSpec);


    //obtenir resultat optimisé
    template_optimimse=compare_template_taille(template_aleatoire,element[0],element[1],nbIteration)
    console.log('the result optimised is %o',template_optimimse)

    //calculer la taille du modèle optimisé, set value
    document.getElementById("size_opti").innerHTML=calcul_template_taille(template_optimimse,0,element[0]).toString()

    concatList=[]  //vider la liste
    //créer un objet pour vega-lite
    create_vega_tree(concatList,template_optimimse,vlSpec1,0)
    console.log("objet vega-lite optimised:%o",vlSpec1)

    //afficher le graphique
    vegaEmbed('#optimisation', vlSpec1);

  })

// Event listeners for refreshing the page
let refreshButton=document.getElementById("refresh")
refreshButton.addEventListener("click",(event)=>
{
    document.location.reload()  //refresh the page
})

  







