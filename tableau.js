// Constants for concat types
const h="hconcat"
const v="vconcat"

// Data for concatenation view
let concat_view=[
  [1,2],
  [2,3],
  [3,4],
  [4,5],
  [5,6],
  [6,7],
  [7,8],
  [8,9],
  [9,10]
]

// Visualizations
const v0={
  width:350,
  height:300,
  mark: 'boxplot',
  encoding: {
  x: {field: 'species', type: 'nominal'},
  y: {field: 'petal_width', type: 'quantitative'}
  }
}
const v1={
  width:350,
  height:300,
  mark: 'bar',
  encoding: {
  y: {field: 'species', type: 'nominal'},
  x: {
    aggregate: 'average',field: 'sepal_length',type: 'quantitative'}
  }     
}
const v2={
  width:350,
      height:300,
      mark: 'point',
      encoding: {
      y: {field: 'species', type: 'nominal'},
      x: { aggregate: 'average',field: 'sepal_width',type: 'quantitative'}
      }
}
const v3={
  width:200,
      height:200,
      mark:'arc',
      encoding: {
            theta:{aggregate:'average' ,field:'petal_length',type: 'quantitative'},
            color:{field:'species',type:"nominal"}
      }
}
const v4={
  mark: 'errorbar',
  encoding: {
    x: {field: "sepal_length", type: "quantitative", scale: {"zero": false}},
    y: {field: "species", type: "ordinal"}
    }
}

const v5={
  width:350,
  height:300,
  mark: 'circle',
  encoding: {
  y: {field: 'petal_width', type: 'quantitative'},
  x: {field: 'sepal_width',type: 'quantitative'}
  }  
}
const v6={
  width:350,
  height:300,
  mark: 'circle',
  encoding: {
  y: {field: 'petal_width', type: 'quantitative'},
  x: {field: 'petal_width',type: 'quantitative'}
  }  
}
const v7={
  mark: "rule",
  encoding: {
    y: {
      field: "petal_width",
      type: "quantitative",
      aggregate: "mean"
    },
    size: {value: 2},
    color: {field: "species", type: "nominal"}
  }
}
const v8={
  mark: 'errorbar',
  encoding: {
    x: {field: "petal_width", type: "quantitative", scale: {"zero": false}},
    y: {field: "species", type: "ordinal"}
    }

}
const v9={
  width:350,
  height:300,
  mark: 'circle',
  encoding: {
  y: {field: 'petal_length', type: 'quantitative'},
  x: {field: 'sepal_length',type: 'quantitative'}
  }     
}

let visualisation=[
  v0,v1,v2,v3,v4,v5,v6,v7,v8,v9
]

// Arrays for template generation
let tableauC=[]
let list_template1=[""]
let list_template2=[""]
let tableauV=[]
let templateTotal=[]

// Function to create a new tableau by concatenating part concat and part visualisation
function melange_concat_view(templateTotal,tableauC,tableauV)
{
  tableauC.forEach(elementC => {
    tableauV.forEach(elementV => {
        let newTableau=elementC.concat(elementV)
        templateTotal.push(newTableau)
    });
  });
}

// Function to create concatenation part for a template
function create_template_concat(tableau,list, nbConcat,typeConcat)
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

// Function to create visualisation part for a template
function create_template_view(tableau,list,cursor,nbView)
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

// Function to exchange two element in an array
function swapElements(array, index1, index2){
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

//function to update vega-lite objet using template choosen
function create_vega_tree(concatList,template,vlSpec,cursor)
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

  // Vega-Lite specification
let vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      "url":"iris.csv"
    }
}

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


   for(let i=0;i<layoutList.length;i++)
   {
      let newOp=document.createElement("option")
      newOp.value=template[i]
      newOp.textContent=template[i].slice(0,nbView-1)
      concatOp.appendChild(newOp)
   }
  })

// Event listeners for refresh the page
let refreshButton=document.getElementById("refresh")
refreshButton.addEventListener("click",(event)=>
{
    document.location.reload()
})

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
  







