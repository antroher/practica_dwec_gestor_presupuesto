import { filtrarGastos } from "./gestionPresupuesto";

let results = gastos.filter(function(item){
    // Si devuelve true el elemento es ingresado ak¡l array y la iteración
    //Si ada es encontrado, devuelve un array vacio
    let devuelve = true;
    
    if(typeof fD !== "undefined")
        if(item.fecha < fD)
            devuelve = false;

            if(typeof fH !== "undefined")
        if(item.fecha > fH)
            devuelve = false;

            if(item.includes(descr)){
                devuelve = true;
            }
    return devuelve;
});

filtrarGastos({fechaDesde:3})

function filtrarGastos(objetoGasto) {
    if (objetoGasto != undefined && objetoGasto != null) 
    {
      let gastosFiltrados = gastos.filter((gasto) => {
        if (objetoGasto.hasOwnProperty('fechaDesde')) {
          if (gasto.fecha < Date.parse(objetoGasto.fechaDesde)) {
            return;
          }
        }

        if (objetoGasto.hasOwnProperty("fechaHasta")) {
          if (gasto.fecha > Date.parse(objetoGasto.fechaHasta) ) {
            return;
          }
        }

        if (objetoGasto.hasOwnProperty("valorMinimo")) {
          if (gasto.valor < objetoGasto.valorMinimo) {
            return;
          }
        }

        if (objetoGasto.hasOwnProperty("valorMaximo")) {
          if (gasto.valor > objetoGasto.valorMaximo) {
            return;
          }
        }

        if (objetoGasto.hasOwnProperty("descripcionContiene")) {

            if (!gasto.descripcion.includes(objetoGasto.descripcionContiene))
                    return;

        }
        if (objetoGasto.hasOwnProperty("etiquetasTiene")) {

            if (objetoGasto.etiquetasTiene.length != 0){
                    let devuelve = false;

            for (let descripcion of objetoGasto.etiquetasTiene) {
                    if (gasto.etiquetas.includes(descripcion)) {
                            devuelve = true;
            }
          }

          if (!devuelve) {
            return;
          }

        }

      }
            return gasto;

      });

        return gastosFiltrados;

} else 
    return gastos;

  }   