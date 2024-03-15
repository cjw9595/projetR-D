// Constants for concat types
import {calcul_template_taille,compare_template_taille,variation} from "./functions.js"
import {concat_view, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9} from "./variables.js";



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




console.log('*********************************************hill climbing*************************************************')
//let template2=["hconcat","vconcat","vconcat",v7,v1,v0,v6]
let surface=calcul_template_taille(template0,0,1)
console.log('the result is')
console.log(surface)

/*
let i=10
while (i>0){
    let res=variation(template5,6,7,i)
    console.log(res)
    i-=1
}*/
