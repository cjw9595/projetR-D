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
let template1=["hconcat","vconcat","hconcat","vconcat","hconcat","vconcat","hconcat","vconcat","vconcat",v1,v2,v4,v7,v9,v3,v6,v8,v0,v5]
let template2=["hconcat","vconcat","hconcat","vconcat","vconcat","hconcat","vconcat","hconcat",v2,v0,v3,v7,v1,v4,v6,v8,v5]
let template3=["hconcat","vconcat","hconcat","vconcat","vconcat","hconcat","hconcat",v2,v4,v3,v1,v0,v6,v8,v5]
let template4=["vconcat","vconcat","vconcat","vconcat","hconcat","hconcat",v2,v4,v3,v1,v8,v9,v5]
let template5=["hconcat","vconcat","hconcat","hconcat","hconcat",v2,v4,v3,v1,v8,v5]
let template6=["hconcat","vconcat","hconcat","vconcat",v2,v4,v3,v8,v5]
let template7=["hconcat","vconcat","vconcat",v7,v1,v0,v6]
let template8=["hconcat","vconcat",v0,v9,v4]
let template9=["vconcat",v5,v1]

let list_temp=[template9,template8,template7,template6,template5,template4,template3,template2,template1]

let size={
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
            size.width_left=size.width
            size.height_left=size.height
            calcul_taille(template,2*index+2,size,"h")
            size.width_right=size.width
            size.height_right=size.height

            //when arrive here, we should already have width and height for sub-tree
            if(concat_pere=="h")
            {
                //for width
                size.width=size.width_right
                //for height
                size.height=which_is_max(size.height_left,size.height_right)
            }
            else if (concat_pere=="v")
            {
                //for width
                size.width=which_is_max(size.width_left,size.width_right)
                //for height
                size.height=size.height_right
            }


        }
        else if(template[index]=="vconcat")
        {
            //calcul his sons first, update Concat
            calcul_taille(template,2*index+1,size,"v")
            size.width_left=size.width
            size.height_left=size.height
            calcul_taille(template,2*index+2,size,"v")
            size.width_right=size.width
            size.height_right=size.height
            if(concat_pere=="h")
            {
                //for width
                size.width=size.width_right
                //for height
                size.height=which_is_max(size.height_left,size.height_right)
            }
            else if (concat_pere=="v")
            {
                //for width
                size.width=which_is_max(size.width_left,size.width_right)
                //for height
                size.height=size.height_right
            }


        }
        else  //template[i] is a vega-graphe objet
        {
            if(template[index].hasOwnProperty("width"))
            {
                if(Concat=="h")
                {
                    //!!!!!!now we just talk about the case that width is a number!!!!!!
                    size.width +=template[index].width

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
                    size.width+=200
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
                    size.height=which_is_max(size.height, template[index].height)
                }
                else if(Concat=="v")
                {
                    size.height+=template[index].height
                }
            }
            else
            {
                // let typeY=template[index].encoding.y.type
                if(Concat=="h")
                {
                    size.height=which_is_max(size.height, 200)
                   // size.height=template[index].height
                }
                else if(Concat=="v")
                {
                    size.height+=200
                }
            }

        }

    }

}

for (let i=0;i< list_temp.length;i++) {
    console.log("this is template"+ i)
    calcul_taille(list_temp[i],0,size,"c")
    console.log("width="+ size.width)
    console.log("height="+ size.height)
    console.log()
    size.width=0
    size.height=0
    size.height_right=0
    size.height_left=0
    size.width_right=0
    size.width_left=0
}
calcul_taille(template7,0,size,"c")
console.log("width="+ size.width)
console.log("height="+ size.height)