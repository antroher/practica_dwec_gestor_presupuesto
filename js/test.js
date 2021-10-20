function filtrarGastos({fechaDesdeEntrante = undefined, fechaHastaEntrante = undefined, valorMinimoEntrante = undefined,
    valorMaximoEntrante = undefined, descripcionContieneEntrante = undefined}) {

let filtro = {
fechaDesde: (!isNaN(Date.parse(fechaDesdeEntrante))) ? Date.parse(fechaDesdeEntrante) : undefined,
fechaHasta: (!isNaN(Date.parse(fechaHastaEntrante))) ? Date.parse(fechaHastaEntrante) : undefined,
valorMinimo: valorMinimoEntrante,
valorMaximo: valorMaximoEntrante,
descripcionContiene: descripcionContieneEntrante,
// etiquetasTiene: [...etiquetasTieneEntrante]

    
}
console.log(typeof filtro.fechaDesde);
console.log(typeof filtro.valorMaximo);
console.log(typeof filtro.valorMinimo)
}



filtrarGastos({valorMinimoEntrante: 60})


