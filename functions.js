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