function filtrarGastos({fechaDesdeEntrante, fechaHastaEntrante, valorMinimoEntrante,
    valorMaximoEntrante, descripcionContieneEntrante}) {

let filtro = {
fechaDesde: (!isNaN(Date.parse(fechaDesdeEntrante))) ? Date.parse(fechaDesdeEntrante) : undefined,
fechaHasta: (!isNaN(Date.parse(fechaHastaEntrante))) ? Date.parse(fechaHastaEntrante) : undefined,
valorMinimo: valorMinimoEntrante,
valorMaximo: valorMaximoEntrante,
descripcionContiene: descripcionContieneEntrante,
// etiquetasTiene: [...etiquetasTieneEntrante]

    
}
return filtro;
}
let obj2 = filtrarGastos({valorMinimoEntrante: 60})
let obj = filtrarGastos({});

let valoresFiltro = Object.values(obj);
// let isEmpty = false;
valoresFiltro.forEach((x) => {
    console.log(typeof x);
});
let gastos = [];
gastos.push(obj2);
gastos.push(obj);


let array1 = [3,4,2];


let array = gastos.filter((x, index) => {
    return x.valorMinimo === 60;
}) 
let arrayjunto = [...array, ...array1];
console.log(arrayjunto);
console.log(array);
console.log(array.length)

let unde = undefined;
let numb = -2;
let isEmpty = (numb > undefined) ? true : false;

function test() {
    return array = [];
}
let ye = test();
console.log(ye)




