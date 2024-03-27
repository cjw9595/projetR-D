import {
    create_template_concat, create_template_view, melange_concat_view,
    test
} from "./functions.js"
import {h, v} from "./variables.js";

// Tableaux pour la génération de modèles
//concat list
let tableauC=[]
let list_template1=[]
let list_template2=[]
//view list
let tableauV=[]
//modèle total
let templateTotal=[]
let list_iteration=[1,1000,5000,10000,50000,100000]



for (let nbC=1
    ;nbC<5;nbC++) {
    let value=[]
    //create part concat
    create_template_concat(tableauC, list_template1, nbC, h)
    create_template_concat(tableauC, list_template2, nbC, v)
    //create part view
    //choisir des views utilisé
    let listV = []
    for (let j = 0; j < nbC + 1; j++) {
        let statue = 1;
        while (1) {
            let choix = Math.floor(Math.random() * 10)
            if (!listV.includes(choix)) {
                listV.push(choix)
                break;
            }
        }
    }
    //create template(view part)
    create_template_view(tableauV, listV, 0, nbC + 1)
    //mix deux partie: get all results possibles with the same number of view and number of concat
    melange_concat_view(templateTotal, tableauC, tableauV)
    test(list_iteration,10,value,templateTotal,nbC)
    console.log(value)
}

