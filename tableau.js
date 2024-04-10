import { visualisation} from "./variables.js";
import {
  calcul_template_taille,
  compare_template_taille,
  create_template_total,
} from "./functions.js";
import {vlSpec,vlSpec1} from "./variables.js";
import {create_vega_tree} from "./functions.js";


// Tableaux pour la génération de modèles
//liste pour les modèles totals
let templateTotal=[]
//liste pour le modèle aleatoire
let templateAleatoire=[]
//liste pour le modèle optimisé
let templateOptimimse=[]




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

    //get number of Concat from number of view
    let nbCocnat=nbView-1;
    create_template_total(templateTotal,nbCocnat,nbView)

    //random number between [0,size of table)
    let choix=Math.floor(Math.random()*templateTotal.length)
    templateAleatoire=templateTotal[choix]     //choisir aleatoire modèle
    console.log("random model without objects views:%o",templateAleatoire)
    //Remplacez les numéros dans la partie view par les objets de views correspondants
    for(let i=nbCocnat;i<templateAleatoire.length;i++)
    {
      templateAleatoire[i]=visualisation[templateAleatoire[i]]
    }
    console.log("template aleatoire:%o",templateAleatoire)

    //calculer la taille du modèle aleatoire, l'afficher dans la page
    document.getElementById("size_rand").innerHTML=calcul_template_taille(templateAleatoire,0,nbCocnat).toString()

    //créer un objet pour vega-lite
    let concatList=[]
    create_vega_tree(concatList,templateAleatoire,vlSpec,0)
    console.log("objet vega-lite:%o",vlSpec)

    //afficher le objet Vega-lite
    vegaEmbed('#aleatoire', vlSpec);


    //obtenir resultat optimisé
    templateOptimimse=compare_template_taille(templateAleatoire,nbCocnat,nbView,nbIteration)
    console.log('the result optimised is %o',templateOptimimse)

    //calculer la taille du modèle optimisé, set value
    document.getElementById("size_opti").innerHTML=calcul_template_taille(templateOptimimse,0,nbCocnat).toString()

    concatList=[]  //vider la liste
    //créer un objet pour vega-lite
    create_vega_tree(concatList,templateOptimimse,vlSpec1,0)
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

  







