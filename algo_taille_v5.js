// Constants for concat types
import _ from "lodash";

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
/*
function swapElements(array, index1, index2){
    //deep copy:array has objet
    let new_array=_.cloneDeep(array);
    let temp = new_array[index1];
    new_array[index1] = new_array[index2];
    new_array[index2] = temp;
    return new_array;
}*/


function swapElements(array, index1, index2){
    //deep copy:array has objet
    let new_array=_.cloneDeep(array);
    let temp = new_array[index1];
    new_array[index1] = new_array[index2];
    new_array[index2] = temp;
    return new_array;
}


//template width:   height:
let template8=["hconcat","vconcat","hconcat","vconcat","hconcat","vconcat","hconcat","vconcat","vconcat",v1,v2,v4,v7,v9,v3,v6,v8,v0,v5]
let template7=["hconcat","vconcat","hconcat","vconcat","vconcat","hconcat","vconcat","hconcat",v2,v0,v3,v7,v1,v4,v6,v8,v5]
let template6=["hconcat","vconcat","hconcat","vconcat","vconcat","hconcat","hconcat",v2,v4,v3,v1,v0,v6,v8,v5]
let template5=["vconcat","vconcat","vconcat","vconcat","hconcat","hconcat",v2,v4,v3,v1,v8,v9,v5]
let template4=["hconcat","vconcat","hconcat","hconcat","hconcat",v2,v4,v3,v1,v8,v5]
let template3=["hconcat","vconcat","hconcat","vconcat",v2,v4,v3,v8,v5]
let template2=["hconcat","vconcat","vconcat",v7,v1,v0,v6]
let template1=["hconcat","vconcat",v0,v9,v4]
let template0=["vconcat",v5,v1]
let list_temp=[template0,template1,template2,template3,template4,template5,template6,template7,template8]
//template width:   height:
let template=["hconcat","vconcat","hconcat","vconcat",v2,v4,v3,v8,v5]


function which_is_max(num1,num2)
{
    if(num1>=num2)
        return num1
    else
        return num2
}

function calcul_X(view)
{
    if(view.hasOwnProperty("width"))
    {
        //!!!!!!now we just talk about the case that width is a number!!!!!!
        return view.width
    }
    else //objet don't set this attribut, need to do other check
    {return 200}
}

function calcul_Y(view)
{
    if(view.hasOwnProperty("height"))
    {
        //!!!!!!now we just talk about the case that width is a number!!!!!!
        return view.height
    }
    else //objet don't set this attribut, need to do other check
    {return 200}
}

function tailleX(template, index,nbConcat)
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

function tailleY(template,index,nbConcat)
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

let size={
    width:0,
    height:0
}
function calcul_template_taille(template,index,nbConcat)
{
    let surface=tailleX(template,0,nbConcat)*tailleY(template,0,nbConcat)
    return surface
}
/*
for(let i=0;i<list_temp.length;i++)
{
    let nbConcat=concat_view[i][0]
    let surface=calcul_template_taille(list_temp[i],0,nbConcat)
    console.log(i+":")
    console.log("surface="+surface)
  //  console.log("height="+taille[1])
    console.log()
}
*/

/**
 * hill climing algo
 * function hill_climbing(f, x0) {
 * let x = x0; // initial solution
 * while (true) {
 * 	const neighbors = generate_neighbors(x); // generate neighbors of x
 * 	const best_neighbor = neighbors.reduce((a, b) => f(a) > f(b) ? a : b); // find the neighbor with the highest function value
 * 	if (f(best_neighbor) <= f(x)) { // if the best neighbor is not better than x, stop
 * 	return x;
 * 	}
 * 	x = best_neighbor; // otherwise, continue with the best neighbor
 * }
 * }
 */

function variation(template,nbConcat,nbView)
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

function compare_template_taille(template, nbConcat, nbView,nbIteration)
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


console.log('*********************************************hill climbing*************************************************')
//let template2=["hconcat","vconcat","vconcat",v7,v1,v0,v6]
let result=compare_template_taille(template7,8,9,100000)
console.log('the result is')
console.log(result)
console.log('size is:')
console.log(calcul_template_taille(result,0,8))