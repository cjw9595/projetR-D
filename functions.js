import _ from "lodash";

export function melange_concat_view(templateTotal,tableauC,tableauV)
{
    tableauC.forEach(elementC => {
        tableauV.forEach(elementV => {
            let newTableau=elementC.concat(elementV)
            templateTotal.push(newTableau)
        });
    });
}


export function create_template_concat(tableau,list, nbConcat,typeConcat)
{
    if(nbConcat==1)
    {
        list[nbConcat-1]=typeConcat
        let tamp=[...list]
        tableau.push(tamp)
    }
    else{
        list[nbConcat-1]=typeConcat
        create_template_concat(tableau,list,nbConcat-1,h)
        create_template_concat(tableau,list,nbConcat-1,v)

    }
}

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
            swapElements(list,j,cursor)
            create_template_view(tableau,list,cursor+1,nbView)
            swapElements(list,j,cursor)
        }
    }
}

export  function create_vega_tree(concatList,template,vlSpec,cursor)
{
    if(cursor<template.length)
    {
        if(template[cursor]=="vconcat")
        {
            if(cursor==0)
            {
                vlSpec.vconcat=concatList
                create_vega_tree(concatList,template,vlSpec,2*cursor+1)
                create_vega_tree(concatList,template,vlSpec,2*cursor+2)
            }
            else
            {
                let obj={ vconcat:[] }
                concatList.push(obj)
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
                let list=obj.hconcat
                create_vega_tree(list,template,vlSpec,2*cursor+1)
                create_vega_tree(list,template,vlSpec,2*cursor+2)
            }

        }
        else
        {
            //push view objet
            concatList.push(template[cursor])
            create_vega_tree(concatList,template,2*cursor+1)
            create_vega_tree(concatList,template,2*cursor+2)
        }
    }
}

export function swapElements(array, index1, index2){
    //deep copy:array has objet
    let new_array=_.cloneDeep(array);
    let temp = new_array[index1];
    new_array[index1] = new_array[index2];
    new_array[index2] = temp;
    return new_array;
}

export function which_is_max(num1,num2)
{
    if(num1>=num2)
        return num1
    else
        return num2
}

export function calcul_X(view)
{
    if(view.hasOwnProperty("width"))
    {
        //!!!!!!now we just talk about the case that width is a number!!!!!!
        return view.width
    }
    else //objet don't set this attribut, need to do other check
    {return 200}
}

export function calcul_Y(view)
{
    if(view.hasOwnProperty("height"))
    {
        //!!!!!!now we just talk about the case that width is a number!!!!!!
        return view.height
    }
    else //objet don't set this attribut, need to do other check
    {return 200}
}

export function tailleX(template, index,nbConcat)
{
    if(index < nbConcat)
    {
        //Td et Tg sont views
        if( template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat")
        {
            if(template[index]=="hconcat")
                return ( calcul_X(template[2*index+1])+calcul_X(template[2*index+2]) )
            else
                return which_is_max( calcul_X(template[2*index+1]),calcul_X(template[2*index+2]) )
        }
        //Td est view
        else if(template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat" && (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat"))
        {
            if(template[index]=="hconcat")
            {
                return ( tailleX(template,2*index+1,nbConcat)+calcul_X(template[2*index+2]) )
            }
            else
            {
                return which_is_max(tailleX(template,2*index+1,nbConcat),calcul_X(template[2*index+2]) )
            }
        }
        //Td et Tg sont concat
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

export function tailleY(template,index,nbConcat)
{
    if(index < nbConcat)
    {
        //Td et Tg sont views
        if( template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat")
        {
            if(template[index]=="hconcat")
                return  which_is_max( calcul_Y(template[2*index+1]), calcul_Y(template[2*index+2]) )
            else
                return  calcul_Y(template[2*index+1]) + calcul_Y(template[2*index+2])
        }
        //Td est view
        else if(template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat" && (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat"))
        {
            if(template[index]=="hconcat")
            {
                return which_is_max( tailleY(template,2*index+1,nbConcat), calcul_Y(template[2*index+2]) )
            }
            else
            {
                return (tailleY(template,2*index+1,nbConcat) + calcul_Y(template[2*index+2]) )
            }
        }
        //Td et Tg sont concat
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


export function calcul_template_taille(template,index,nbConcat)
{
    let surface=tailleX(template,0,nbConcat)*tailleY(template,0,nbConcat)
    return surface
}


export function variation(template,nbConcat,nbView)
{
    let randomC_1= 0;
    let randomC_2= 0;
    let randomV_1=0;
    let randomV_2=0;
    while(randomC_1 == randomC_2)
    {
        randomC_1= Math.floor(Math.random() * nbConcat);
        randomC_2= Math.floor(Math.random() * nbConcat);
    }
    let tem_template=swapElements(template,randomC_1,randomC_2);
    while(randomV_1==randomV_2)
    {
        randomV_1=Math.floor(Math.random() * (nbConcat+nbView - nbConcat) + nbConcat);
        randomV_2=Math.floor(Math.random() * (nbConcat+nbView - nbConcat) + nbConcat);
    }
    return swapElements(tem_template,randomV_1,randomV_2);

}

export function compare_template_taille(template, nbConcat, nbView,nbIteration)
{
    let init_template=_.cloneDeep(template)
    console.log(calcul_template_taille(init_template,0,nbConcat))
    while (nbIteration>0)
    {
        let template2=variation(init_template,nbConcat,nbView)
        if( calcul_template_taille(template2,0,nbConcat) < calcul_template_taille(init_template,0,nbConcat) )
        {
            init_template=_.cloneDeep(template2)
            console.log(calcul_template_taille(init_template,0,nbConcat))
        }
        nbIteration--
    }
    return init_template;
}