function creacionObjeto(objeto){
    console.log(objeto.fechaDesde);
    console.log(objeto.fechaHasta);
    console.log(objeto.hasOwnProperty("fechaDesde"));
    console.log(objeto.hasOwnProperty("fechaHasta"));
    console.log(objeto.fechaDesde);
}

creacionObjeto({fechaDesde: 3, fechaHasta:4})

let array = ["precio",undefined,24,3];

let arrayfiltrado = array.filter((item) => {
    let devolver = false;

    if(item === "precio")
        devolver = true;
    if (item === undefined)
        devolver = true
    if(item >= 3)
        devolver = true;

    return devolver;
});

console.log(arrayfiltrado);