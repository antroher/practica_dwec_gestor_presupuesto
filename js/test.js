// // // function filtrarGastos({fechaDesdeEntrante, fechaHastaEntrante, valorMinimoEntrante,
// // //     valorMaximoEntrante, descripcionContieneEntrante}) {

// // // let filtro = {
// // // fechaDesde: (!isNaN(Date.parse(fechaDesdeEntrante))) ? Date.parse(fechaDesdeEntrante) : undefined,
// // // fechaHasta: (!isNaN(Date.parse(fechaHastaEntrante))) ? Date.parse(fechaHastaEntrante) : undefined,
// // // valorMinimo: valorMinimoEntrante,
// // // valorMaximo: valorMaximoEntrante,
// // // descripcionContiene: descripcionContieneEntrante,
// // // // etiquetasTiene: [...etiquetasTieneEntrante]

    
// // // }
// // // return filtro;
// // // }
// // // let obj2 = filtrarGastos({valorMinimoEntrante: 60})
// // // let obj = filtrarGastos({});

// // // let valoresFiltro = Object.values(obj);
// // // // let isEmpty = false;
// // // valoresFiltro.forEach((x) => {
// // //     console.log(typeof x);
// // // });
// // // let gastos = [];
// // // gastos.push(obj2);
// // // gastos.push(obj);


// // // let array1 = [obj2, obj];
// // // let array2 = [obj];
// // // let arrayFinal = [...array1, ...array2]

// // // console.log(arrayFinal);

// // // let array = [1,2,3];



// // // // let array = gastos.filter((x, index) => {
// // // //     return x.valorMinimo === 60;
// // // // }) 
// // // // let arrayjunto = [...array, ...array1];
// // // // console.log(arrayjunto);
// // // // console.log(array);
// // // // console.log(array.length)

// // // // let unde = undefined;
// // // // let numb = -2;
// // // // let isEmpty = (numb > undefined) ? true : false;

// // // // function test() {
// // // //     return array = [];
// // // // }
// // // // let ye = test();
// // // // console.log(ye)



// // function creacionObjeto (objeto) {
// //     console.log(objeto.fechaDesde);
// //     console.log(objeto.fechaHasta);
// //     console.log(objeto.hasOwnProperty("fechaDesde"));
// //     console.log(objeto.hasOwnProperty( "precio"));
// // }

// // creacionObjeto({fechaDesde: 3, fechaHasta: 4})


// //  let gastos = [3, 4, undefined, "precio", "hola", null];
// // let array = [3, 4, undefined, "precio", "hola", null];

// // let arrayfiltrado = array.filter((item) => {
// //     let devolver = false;

// //     if (item === "precio")
// //         devolver = true;
// //     if (item === undefined)
// //         devolver = true;
// //     if (item >= 3)
// //         devolver = true;

// //     return devolver;
// // });

// // console.log(arrayfiltrado);

// // let hola, adios, quetal;
// // hola = "hola";
// // adios = "adios";
// // quetal = "quetal";
// // console.log(hola);
// // console.log(adios);
// // console.log(quetal);
// // let fecha = Date.parse("2021-09-26");
// // let fecha2 = Date.parse("2021-09-15");
// // console.log(fecha.toLocaleString());
// // console.log(fecha2.toLocaleString());

// // 1632614400000
// // 1632614400000

// // function crear(objeto){
// //     let d;

// //     if (objeto.hasOwnProperty("fecha"))
// //     {
// //         d = objeto.fecha
// //     }
    
// //     if (typeof d !== "undefined"){
// //         console.log("esta definido")
// //     }
// // }

// // crear({fecha: 3})
// // crear({});
// console.log("vamos a ver")
// let id = "hola";
// let texto = "Texto de prueba";
// let div = document.getElementById(id);
// div.innerHTML += `<p>${texto}</p>`

// let element = document.getElementById("test");
// let divGasto = document.createElement("div");
    
//     divGasto.className = "gasto";

//     divGasto.innerHTML += "<p>Hola</p>"
//     element.appendChild(divGasto);

// function filtrar({fechaDesde}) {
//     console.log(fechaDesde)
// }

// filtrar({fechaDesde: "12-04-1996"});

// function dibujar() {
//     let element = document.getElementById("hola");
//     element.innerHTML += "<p>Vamos a ver</p>"
// }
// document.getElementById("actualizarpresupuesto").addEventListener("click", dibujar);

// function etiquetas (etiquetas) {
//     let filtredTags = etiquetas.split(/[;.:,\s]/);
    
//     return filtredTags;
// }



// let etiquetasdsa = etiquetas("eti1,    ;:eti2")
// let hola = etiquetasdsa.filter(etiqueta => etiqueta)
// console.log(hola)



// function etiquetas (etiquetas) {
//     let filtredTags = etiquetas.replaceAll(/[;:,]/g,",")
//     return filtredTags;
// }

// let etiquetasdsa = etiquetas("eti1,;:eti2")
// let etiquetasextra = etiquetasdsa.split(",")
// console.log(etiquetasextra[2]);
// if(etiquetasextra[2] === "") {
//     console.log("true");
// }
// let nuevasetiquetas = etiquetasextra.splice(2, 1);
// console.log(nuevasetiquetas);

function transformarListadoEtiquetas(etiquetasEntrantes) {
    //Realizado del filtrado de las etiquetas
    let filtredTags = etiquetasEntrantes.split(/[;.:,\s]/);

    //Eliminado de string vacias dentro del array mediante la función filter.
    let finalTags = filtredTags.filter(tag => tag !== "");

    //Devolución de las etiquetas correctamente transformadas.
    return finalTags;
}