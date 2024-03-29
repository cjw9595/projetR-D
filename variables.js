
/* les objets graphiques */
export const v0={
    width:350,
    height:300,
    mark: 'boxplot',
    encoding: {
        x: {field: 'species', type: 'nominal'},
        y: {field: 'petal_width', type: 'quantitative'}
    }
}
export const v1={
    width:350,
    height:300,
    mark: 'bar',
    encoding: {
        y: {field: 'species', type: 'nominal'},
        x: {
            aggregate: 'average',field: 'sepal_length',type: 'quantitative'}
    }
}
export const v2={
    width:350,
    height:300,
    mark: 'point',
    encoding: {
        y: {field: 'species', type: 'nominal'},
        x: { aggregate: 'average',field: 'sepal_width',type: 'quantitative'}
    }
}
export const v3={
    width:200,
    height:200,
    mark:'arc',
    encoding: {
        theta:{aggregate:'average' ,field:'petal_length',type: 'quantitative'},
        color:{field:'species',type:"nominal"}
    }
}
export const v4={
    mark: 'errorbar',
    encoding: {
        x: {field: "sepal_length", type: "quantitative", scale: {"zero": false}},
        y: {field: "species", type: "ordinal"}
    }
}

export const v5={
    width:350,
    height:300,
    mark: 'circle',
    encoding: {
        y: {field: 'petal_width', type: 'quantitative'},
        x: {field: 'sepal_width',type: 'quantitative'}
    }
}
export const v6={
    width:350,
    height:300,
    mark: 'circle',
    encoding: {
        y: {field: 'petal_width', type: 'quantitative'},
        x: {field: 'petal_width',type: 'quantitative'}
    }
}
export const v7={
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
export const v8={
    mark: 'errorbar',
    encoding: {
        x: {field: "petal_width", type: "quantitative", scale: {"zero": false}},
        y: {field: "species", type: "ordinal"}
    }

}
export const v9={
    width:350,
    height:300,
    mark: 'circle',
    encoding: {
        y: {field: 'petal_length', type: 'quantitative'},
        x: {field: 'sepal_length',type: 'quantitative'}
    }
}

/*  Une liste contenant plusieurs objets de visualisation */
export let visualisation=[
    v0,v1,v2,v3,v4,v5,v6,v7,v8,v9
]

/*les objets de Vega-Lite, vont être utilisé pour créer des schémas*/
export let vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
        "url":"data/iris.csv"
    }
}

export let vlSpec1 = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
        "url": "data/iris.csv"
    }
}

/*Constantes pour les types de la concaténation*/
export const h="hconcat"
export const v="vconcat"