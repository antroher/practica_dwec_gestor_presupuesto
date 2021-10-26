// function filtrarGastos({fechaDesdeEntrante = undefined, fechaHastaEntrante = undefined, valorMinimoEntrante = undefined,
//     valorMaximoEntrante = undefined, descripcionContieneEntrante = undefined}) {

// let filtro = {
// fechaDesde: (!isNaN(Date.parse(fechaDesdeEntrante))) ? Date.parse(fechaDesdeEntrante) : undefined,
// fechaHasta: (!isNaN(Date.parse(fechaHastaEntrante))) ? Date.parse(fechaHastaEntrante) : undefined,
// valorMinimo: valorMinimoEntrante,
// valorMaximo: valorMaximoEntrante,
// descripcionContiene: descripcionContieneEntrante,
// // etiquetasTiene: [...etiquetasTieneEntrante]

    
// }
// console.log(typeof filtro.fechaDesde);
// console.log(typeof filtro.valorMaximo);
// console.log(typeof filtro.valorMinimo)
// }
function CrearGasto(descripcionEntrante, valorEntrante = 0, fechaEntrante = Date.now(), ...etiquetasEntrante) {
    if (valorEntrante < 0 || isNaN(valorEntrante)) {
        valorEntrante = 0;
    }
    if (typeof fechaEntrante === "string") {
        if (isNaN(Date.parse(fechaEntrante))) {
            fechaEntrante = Date.now();
        }
        else {
            fechaEntrante = Date.parse(fechaEntrante);
        }
    }
    let gasto = {
        descripcion: descripcionEntrante,
        valor: parseFloat(valorEntrante),
        etiquetas: [...etiquetasEntrante],
        fecha: fechaEntrante
    }
}


function filtrarGastos({fechaDesde, fechaHasta, valorMinimo,
    valorMaxima, descripcionContiene, ...etiquetasTiene}) {

let filtro = {
filtroFechaDesde: (!isNaN(Date.parse(fechaDesde))) ? Date.parse(fechaDesde) : undefined,
filtroFechaHasta: (!isNaN(Date.parse(fechaHasta))) ? Date.parse(fechaHasta) : undefined,
filtroValorMinimo: valorMinimo,
filtroValorMaximo: valorMaxima,
filtroDescripcionContiene: descripcionContiene,
filtroEtiquetasTiene: [...etiquetasTiene]
}}
let gasto1 = new filtrarGastos({descripcionContiene: "Seguro", valorMinimo: 10, valorMaximo: 200} );
let valoresFiltro = Object.values(gasto1);
let isEmpty = false;
valoresFiltro.forEach((valor) => {
    if (typeof valor === undefined)
        isEmpty = true;
})

console.log(isEmpty)
