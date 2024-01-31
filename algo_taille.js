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

//template width:   height:  
let template=["hconcat","vconcat","hconcat","vconcat",v2,v4,v3,v8,v5]
let size={
  height_total:0,
  width_total:0,
  width_left:0,
  height_left:0,
  width_right:0,
  height_right:0,
  width:0,
  height:0
}

function which_is_max(num1,num2)
{
  if(num1>=num2)
    return num1
  else
    return num2
}

function calcul_taille(template,index,size,Concat)
{
  if(index>=template.length)
    return 0
  if(Concat!="h" && Concat!="v")  ////in fact only when index=0, Concat!=h && Concat!=v
  {
    if(template[index]=="hconcat")
    {
      calcul_taille(template,2*index+1,size,"h")
      calcul_taille(template,2*index+2,size,"h")
    }
    else if(template[index]=="vconcat")
    {
      calcul_taille(template,2*index+1,size,"v")
      calcul_taille(template,2*index+2,size,"v")
    }
  }
  else  //all other index should check "Concat"--his father concat
  {
    let concat_pere=Concat
    if(template[index]=="hconcat")
  {
    //calcul his sons first, update Concat
    calcul_taille(template,2*index+1,size,"h")
    width1=size.width
    height1=size.height
    calcul_taille(template,2*index+2,size,"h")


    //when arrive here, we should already have width and height for sub-tree
    if(concat_pere=="h")
    {
      //for width
      size.width=width1+width2
      
      //for height
      size.height=which_is_max(height1,height2)
    }
    else if (concat_pere=="v")
    {
      //for width
      size.width=which_is_max(width1,width2)
    
      //for height
      size.height=height1+height2
    }

    
  }
  else if(template[index]=="vconcat")
  {
   //calcul his sons first, update Concat
   calcul_taille(template,2*index+1,size,"v")
   width1=size.width
   height1=size.height
   calcul_taille(template,2*index+2,size,"v")
   width2=size.width
   height2=size.height
   if(concat_pere=="h")
    {
      //for width
      size.width=width1+width2
      
      //for height
      size.height=which_is_max(height1,height2)
    }
    else if (concat_pere=="v")
    {
      //for width
      size.width=which_is_max(width1,width2)
    
      //for height
      size.height=height1+height2
    }


  }
  else  //template[i] is a vega-graphe objet
  {
    if(template[index].hasOwnProperty("width"))  
    {
      if(Concat=="h")
      {
        //!!!!!!now we just talk about the case that width is a number!!!!!!
        size.width=template[index].width  
      }
      else if(Concat=="v")
      {
        size.width=which_is_max(size.width, template[index].width)
      }
    }
    else //objet don't set this attribut, need to do other check
    {
     // let typeX=template[index].encoding.x.type
     if(Concat=="h")
      {
        //!!!!!!now we just use 200 to have a try
        size.width=200
      }
      else if(Concat=="v")
      {
        size.width=which_is_max(size.width, 200)
      }
      
    }
    
    if(template[index].hasOwnProperty("height"))
    {
      if(Concat=="h")
      {
       // size.height=which_is_max(size.height, template[index].height)
        size.height=template[index].height
      }
      else if(Concat=="v")
      {
        size.height=template[index].height
      }
    }
    else
    {
     // let typeY=template[index].encoding.y.type
     if(Concat=="h")
      {
        //size.height=which_is_max(size.height, 200)
        size.height=template[index].height
      }
      else if(Concat=="v")
      {
        size.height=200
      }
    }
      
  }

  }
  
}

let width=0
let height=0
function calcul_taille_v2(template,index,size)
{
 // let width1=0,width2=0,height1=0,height2=0
  //function stop
  if(index>=template.length)
    return 0
  if(template[index]=="hconcat")
  {
    /*
    calcul_taille_v2(template,2*index+1,size)
    if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat") {
     // size.width_left = size.width
     // size.height_left = size.height
      size.height_left = which_is_max(size.height, size.height_left)
      size.width_left += size.width
    }

    calcul_taille_v2(template, 2 * index + 2, size)
    if(template[2*index+1]!="hconcat" && template[2*index+2]!="vconcat") {
     // size.width_right = size.width
     // size.height_right = size.height
      size.height_right = which_is_max(size.height, size.height_right)
      size.width_right += size.width
    }*/

    calcul_taille_v2(template,2*index+1,size)
    //2 son are view
  /*  if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat")
    {
      size.height_left = which_is_max(size.height, size.height_left)
      size.width_left += size.width
    }


    calcul_taille_v2(template, 2 * index + 2, size)
    if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat")
    {
      size.height_right = which_is_max(size.height, size.height_right)
      size.width_right += size.width
    }*/
    //2 sons are views
   /* if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") {
      size.width_left = size.height
      size.height_left = size.height
    }
    //2 sons are concat
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]=="hconcat" || template[2*index+2]=="vconcat") )
    {
      size.width_left = size.width_total
      size.height_left = size.height_total
    }
    //lef son is concat, right son is view
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") )
    {
      size.width_left = size.width_total
      size.height_left = size.height_total
    }*/
    calcul_taille_v2(template, 2 * index + 2, size)
   /* if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") {
      size.width_right = size.width
      size.height_right = size.height
    }
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]=="hconcat" || template[2*index+2]=="vconcat") )
    {
      size.width_right = size.width_total
      size.height_right = size.height_total
    }
    //lef son is concat, right son is view
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") )
    {
      size.width_right = size.width
      size.height_right = size.height
    }
    size.width_total +=(size.width_left+size.width_right)
    size.height_total=which_is_max(size.height_left,size.height_right) */
    size.height_total+=which_is_max(height,size.height)
    size.width_total+=width
  }
  else if(template[index]=="vconcat")
  {
    calcul_taille_v2(template, 2 * index + 1, size)
  /*  //2 sons are views
    if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") {
      size.width_left = size.height
      size.height_left = size.height
    }
    //2 sons are concat
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]=="hconcat" || template[2*index+2]=="vconcat") )
    {
      size.width_left = size.width_total
      size.height_left = size.height_total
    }
    //lef son is concat, right son is view
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") )
    {
      size.width_left = size.width_total
      size.height_left = size.height_total
    }*/
    calcul_taille_v2(template, 2 * index + 2, size)
   /* if(template[2*index+1]!="hconcat" && template[2*index+1]!="vconcat" && template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") {
      size.width_right = size.width
      size.height_right = size.height
    }
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]=="hconcat" || template[2*index+2]=="vconcat") )
    {
      size.width_right = size.width_total
      size.height_right = size.height_total
    }
    //lef son is concat, right son is view
    else if( (template[2*index+1]=="hconcat" || template[2*index+1]=="vconcat") && (template[2*index+2]!="hconcat" && template[2*index+2]!="vconcat") )
    {
      size.width_right = size.width
      size.height_right = size.height
    }
    //for width
    size.width_total=which_is_max(size.width_left,size.width_right)
    //for height
    size.height_total=size.height_left+size.height_right*/
    size.width_total+=which_is_max(width,size.width_total)
    size.height_total+=height
  }
  else
  {
    if(template[index].hasOwnProperty("width"))
    {
        //!!!!!now we just talk about the case that width is a number!!!!!!
        width=template[index].width
    }
    else //objet don't set this attribut, need to do other check
    {
      //!!!!!!now we just use 200 to have a try
      width=200
    }

    if(template[index].hasOwnProperty("height"))
    {
      //!!!!!now we just talk about the case that width is a number!!!!!!
      height=template[index].height
    }
    else //objet don't set this attribut, need to do other check
    {
      //!!!!!!now we just use 200 to have a try
      height=200
    }
  }

}
calcul_taille_v2(template,0,size,size.width,size.height)
console.log("width="+ size.width_total)
console.log("height="+ size.height_total)



