import {h, v,} from "./variables.js"

/**
 * @description fonction pour obtenir toutes les possibilités du module en combinant la partie concat et la partie view
 * @param templateTotal: {array} toutes les possibilités de module
 * @param tableauC:{array} toutes les possibilités de séquence de concaténation
 * @param tableauV {array} toutes les possibilités de séquence de views
 * @author jiawei Chen
 */
export function melange_concat_view(templateTotal,tableauC,tableauV)
{
    //Produit cartésien pour tableauC et tableauV
    tableauC.forEach(elementC => {
        tableauV.forEach(elementV => {
            let newTableau=elementC.concat(elementV)
            templateTotal.push(newTableau)
        });
    });
}

/**
 * @description Créer la partie concat du modèle
 * @param tableau {array}
 * @param list {array}
 * @param nbConcat {number}
 * @param typeConcat {string}
 * @author jiawei Chen
 */
export function create_template_concat(tableau,list, nbConcat,typeConcat)
{
    if(nbConcat==1)  //En travaillant de l’arrière vers l’avant, nous sommes arrivés à la première place.
    {
        list[nbConcat-1]=typeConcat
        //list va etre modifié donc on copie la liste et l'ajoute dans la sommet
        let tamp=[...list]
        tableau.push(tamp)
    }
    else{
        list[nbConcat-1]=typeConcat
        //de l'arrière vers l'avant
        create_template_concat(tableau,list,nbConcat-1,h)
        create_template_concat(tableau,list,nbConcat-1,v)

    }
}

/**
 * @description Créer la partie view du modèle
 * @param tableau {array}
 * @param list {array}
 * @param cursor {number}
 * @param nbView {number}
 * @author jiawei Chen
 */
export function create_template_view(tableau,list,cursor,nbView)
{
    if(cursor==nbView)
    {
        let tamp=[...list]
        tableau.push(tamp)
    }
    else
    {
        for(let j=cursor;j<nbView;j++)
        {
            swapElements_v1(list,j,cursor)
            create_template_view(tableau,list,cursor+1,nbView)
            swapElements_v1(list,j,cursor)
        }
    }
}

/**
 * @description créer un objet Vega-lite
 * @param concatList {array}
 * @param template {array}
 * @param vlSpec {object}
 * @param cursor {number}
 * @author jiawei Chen
 */
export  function create_vega_tree(concatList,template,vlSpec,cursor)
{
    // Le curseur ne peut pas dépasser la limite du tableau
    if(cursor<template.length)
    {
        //curseur -> voncat
        if(template[cursor]=="vconcat")
        {
            if(cursor==0)
            {
                //insert attribut "vconcat"
                vlSpec.vconcat=concatList
                //créer ses sous-arbres
                create_vega_tree(concatList,template,vlSpec,2*cursor+1)
                create_vega_tree(concatList,template,vlSpec,2*cursor+2)
            }
            else  //curseur!=0, donc on n'a pas besoin de insert l'attribut
            {
                //on crée un objet et l'ajoute dans la liste
                let obj={ vconcat:[] }
                concatList.push(obj)
                //Repositionnez la liste à modifier au niveau le plus interne et continuez à créer des sous-arbres
                let list=obj.vconcat
                create_vega_tree(list,template,vlSpec,2*cursor+1)
                create_vega_tree(list,template,vlSpec,2*cursor+2)
            }
        }
        else if(template[cursor]=="hconcat")
        {
            if(cursor==0)
            {
                vlSpec.hconcat=concatList
                create_vega_tree(concatList,template,vlSpec,2*cursor+1)
                create_vega_tree(concatList,template,vlSpec,2*cursor+2)
            }
            else
            {
                let obj={ hconcat:[] }
                concatList.push(obj)
                //Repositionnez la liste à modifier au niveau le plus interne et continuez à créer des sous-arbres
                let list=obj.hconcat
                create_vega_tree(list,template,vlSpec,2*cursor+1)
                create_vega_tree(list,template,vlSpec,2*cursor+2)
            }

        }
        else  //pour les feuilles
        {
            //push view objet directement
            concatList.push(template[cursor])
            //continue
            create_vega_tree(concatList,template,vlSpec,2*cursor+1)
            create_vega_tree(concatList,template,vlSpec,2*cursor+2)
        }
    }
}

/**
 * @description obtenir le maximum entre les deux values
 * @param num1 {number}
 * @param num2 {number}
 * @returns {number}
 * @author jiawei Chen
 */
export function which_is_max(num1,num2)
{
    if(num1>=num2)
        return num1
    else
        return num2
}

/**
 * @description  Calculer la largeur d'une visualisation
 * @param {Object} view
 * @returns {number}
 * @author jiawei Chen
 */
export function calcul_X(view)
{
    //calculer largeur du graphique:si il a cet attribut, return la valeur; sinon return 200
    if(view)
    {
        if(view.hasOwnProperty("width"))
        {
            //!!!!!!now we just talk about the case that width is a number!!!!!!
            return view.width
        }
        else //objet don't set this attribut, need to do other check
        {return 200}
    }

}

/**
 * @description Calculer la hauteur d'une visualisation
 * @param {Object} view
 * @returns {number}
 * @author jiawei Chen
 */
export function calcul_Y(view)
{
    //calculer la hauteur du graphique:si il a cet attribut, return la valeur; sinon return 200
    if(view){
        if(view.hasOwnProperty("height"))
        {
            //!!!!!!now we just talk about the case that width is a number!!!!!!
            return view.height
        }
        else //objet don't set this attribut, need to do other check
        {return 200}
    }

}


/**
 * @description Calculer la largeur totale d'un modèle
 * @param template {array}
 * @param index {number}
 * @param nbConcat {number}
 * @returns {number}
 * @author jiawei Chen
 */
export function tailleX(template, index,nbConcat)
{
    if(index < nbConcat)
    {
        //Td et Tg sont views: si le père est "hconcat", on fait width1+width2
        if( template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat")
        {
            if(template[index]=="hconcat")
                return ( calcul_X(template[2*index+1])+calcul_X(template[2*index+2]) )
            else
                return which_is_max( calcul_X(template[2*index+1]),calcul_X(template[2*index+2]) )  //si le père est "vconcat", on fait max(width1,width2)
        }
        //Td est view, Td est concat
        else if(template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat" && (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat"))
        {
            if(template[index]=="hconcat")
            {
                //pour gauche, nous appelons la fonction récursive pour obtenir un résultat du sous-arbre
                return ( tailleX(template,2*index+1,nbConcat)+calcul_X(template[2*index+2]) )
            }
            else
            {
                //pour gauche, nous appelons la fonction récursive pour obtenir un résultat du sous-arbre
                return which_is_max(tailleX(template,2*index+1,nbConcat),calcul_X(template[2*index+2]) )
            }
        }
        //Td et Tg sont concat, on explore ses sous-arbres gauche et droit
        else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]=="hconcat" || template[2*index+2]=="vconcat") )
        {
            if(template[index]=="hconcat")
            {

                return ( tailleX(template,2*index+1,nbConcat)+tailleX(template,2*index+2,nbConcat) )
            }
            else
            {
                return which_is_max(tailleX(template,2*index+1,nbConcat),tailleX(template,2*index+2,nbConcat) )
            }
        }
    }
}

/**
 * @description Calculer la hauteur totale d'un modèle
 * @param template {array}
 * @param index {number}
 * @param nbConcat {number}
 * @returns {number}
 * @author jiawei Chen
 */
export function tailleY(template,index,nbConcat)
{
    if(index < nbConcat)
    {
        //Td et Tg sont views: si le père est "hconcat", on fait width1+width2
        if( template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat")
        {
            if(template[index]=="hconcat")
                return  which_is_max( calcul_Y(template[2*index+1]), calcul_Y(template[2*index+2]) )
            else
                return  calcul_Y(template[2*index+1]) + calcul_Y(template[2*index+2]) //si le père est "vconcat", on fait max(width1,width2)
        }
        //Td est view
        else if(template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat" && (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat"))
        {
            if(template[index]=="hconcat")
            {
                //pour gauche, nous appelons la fonction récursive pour obtenir un résultat du sous-arbre
                return which_is_max( tailleY(template,2*index+1,nbConcat), calcul_Y(template[2*index+2]) )
            }
            else
            {
                return (tailleY(template,2*index+1,nbConcat) + calcul_Y(template[2*index+2]) )
            }
        }
        //Td et Tg sont concat,on explore ses sous-arbres gauche et droit
        else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]=="hconcat" || template[2*index+2]=="vconcat") )
        {
            if(template[index]=="hconcat")
            {
                return which_is_max( tailleY(template,2*index+1,nbConcat), tailleY(template,2*index+2,nbConcat) )
            }
            else
            {
                return (tailleY(template,2*index+1,nbConcat) + tailleY(template,2*index+2,nbConcat) )
            }
        }
    }
}

/**
 * @description Calculez la surface totale d'un modèle
 * @param template {array}
 * @param index {number}
 * @param nbConcat {number}
 * @returns {number}
 * @author jiawei Chen
 */
export function calcul_template_taille(template,index,nbConcat)
{
    //surface=longeur*largeur
    let surface=tailleX(template,0,nbConcat)*tailleY(template,0,nbConcat)
    return surface
}

/**
 * @description Ajustement de l'ordre dans le modèle : la section concat et la section view sont ajustées séparément
 * @param template {array}
 * @param nbConcat {number}
 * @param nbView {number}
 * @param nbIteration {number}
 * @returns {array}
 * @author jiawei Chen
 */
export function variation(template,nbConcat,nbView,nbIteration)
{
    //copier le modèle
    let new_array=structuredClone(template)
    let randomC_1= 0;
    let randomC_2= 0;
    let randomV_1=0;
    let randomV_2=0;
    let ite
    //Utilisez des nombres aléatoires pour déterminer le nombre d'itérations pour échange
    if(Math.random()<0.5){
         ite=3
    }
    else{
         ite=5
    }
    //utiliser la valeur de nbIteration pour déterminer qu'on échange concat ou view
    if(nbIteration%2==0)
    {
        //on echange concat
        while(ite>0)
        {
            do
            { //obtenir des valuers aléatoires et pas égaux [0,nbConcat)
                randomC_1= Math.floor(Math.random() * nbConcat);
                randomC_2= Math.floor(Math.random() * nbConcat);
            }while(randomC_1 == randomC_2)
            //échange
            swapElements_v1(new_array,randomC_1,randomC_2);
            ite-=1
        }
    }
    else
    {
        //we swap view
        while(ite>0)
        {
            do
            {    //obtenir des valuers aléatoires et pas égaux [nbConcat,nbConcat+nbView)
                randomV_1=Math.floor(Math.random() * (nbConcat+nbView - nbConcat) + nbConcat);
                randomV_2=Math.floor(Math.random() * (nbConcat+nbView - nbConcat) + nbConcat);
                swapElements_v1(new_array,randomV_1,randomV_2);
            }while(randomV_1==randomV_2)
            ite-=1
        }
    }
    //rendre le résultat modifié
    return new_array
}

/**
 * @description Obtenez un graphique avec une surface totale plus petite en ajustant l'ordre à l'intérieur du modèle.
 * @param {Array} template
 * @param {number} nbConcat
 * @param {number} nbView
 * @param {number} nbIteration
 * @returns {Array}
 * @author jiawei Chen
 */
export function compare_template_taille(template, nbConcat, nbView,nbIteration)
{

    //copier le modèlé initial
    let init_template=structuredClone(template)
    //si le nombre de concat est 1, il est impossible de comparer, donc rendre init_template
    if(nbConcat==1)
        return init_template
    //calculer son surface
    let size_init=calcul_template_taille(init_template,0,nbConcat)
    while (nbIteration>0)
    {
        //utiliser fonction variation() pour modifier init_template
        let template2=variation(init_template,nbConcat,nbView,nbIteration)
        //calculer le surface apres modification
        let size_opti=calcul_template_taille(template2,0,nbConcat)
        if( size_opti< size_init)
        {   //mise a jour le modèle
            init_template=structuredClone(template2)
        }
        nbIteration--
    }
    return init_template
}

/**
 * @description Fonction pour échanger deux éléments dans un tableau
 * @param array {array}
 * @param index1 {number}
 * @param index2 {number}
 * @author jiawei Chen
 */
export function swapElements_v1(array, index1, index2){
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}