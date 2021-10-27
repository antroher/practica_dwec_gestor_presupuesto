"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var gastos = [];
var idGasto = 0;
var presupuesto = 0;

/** FUNCIONES Fundamentos de JavaScript I **/

function actualizarPresupuesto(cantidad) {
  // TODO
  if (cantidad > -1) {
    return (presupuesto = cantidad);
  } else {
    console.log("Error: el presupuesto no puede ser negativo");
    return -1;
  }
}

function mostrarPresupuesto() {
  // TODO
  let texto = "Tu presupuesto actual es de " + presupuesto + " €";
  return texto;
}

function CrearGasto(descr, val, fech = Date.now(), ...etiq) {
  //Comprobar que la fecah se puede pasar a formato fecha
  if (!Date.parse(fech)) {
    fech = Date.now();
  } else {
    fech = Date.parse(fech);
  }

  //Comprobar que valor es un numero y comproprobar que no es menor que 0 ni una cadena.
  val = parseFloat(val);
  if (val < 0 || isNaN(val)) {
    val = 0;
  }
  let gasto = {
    descripcion: descr,
    valor: val,
    fecha: fech,
    etiquetas: [...etiq],
  };

  //METODOS OBJETO GASTO
  gasto.mostrarGasto = function () {
    return (
      "Gasto correspondiente a " +
      gasto.descripcion +
      " con valor " +
      gasto.valor +
      " €"
    );
  };

  gasto.actualizarDescripcion = function (descrip) {
    gasto.descripcion = descrip;
  };

  gasto.actualizarValor = function (valo) {
    if (valo >= 0) {
      gasto.valor = valo;
    }
  };

  gasto.mostrarGastoCompleto = function () {
    let nfec = new Date(this.fecha).toLocaleString();
    let textoADevolver =
      "Gasto correspondiente a " +
      gasto.descripcion +
      " con valor " +
      gasto.valor +
      " €.\n" +
      "Fecha: " +
      nfec +
      "\n" +
      "Etiquetas:\n";
    for (let i = 0; i < this.etiquetas.length; i++) {
      textoADevolver += "- " + this.etiquetas[i] + "\n";
    }
    return textoADevolver;
  };

  gasto.actualizarFecha = function (nuevaFecha) {
    if (Date.parse(nuevaFecha)) {
      gasto.fecha = Date.parse(nuevaFecha);
    }
  };

  gasto.anyadirEtiquetas = function (...nuevaEtiqueta) {
    for (let i = 0; i < nuevaEtiqueta.length; i++) {
      if (!gasto.etiquetas.includes(nuevaEtiqueta[i]))
        gasto.etiquetas.push(nuevaEtiqueta[i]);
    }
  };

  gasto.borrarEtiquetas = function (...listaEtiquetasABorrar) {
    for (let i of listaEtiquetasABorrar) {
      if (gasto.etiquetas.includes(i)) {
        let indice = gasto.etiquetas.indexOf(i);
        gasto.etiquetas.splice(indice, 1);
      }
    }
  };

  gasto.obtenerPeriodoAgrupacion = function (periodo) {
    let resultado = "0";
    let fechObj = new Date(this.fecha);
    switch (periodo) {
      case "dia":
        return fechObj.toISOString().substring(0, 10);
      case "mes":
        return fechObj.toISOString().substring(0, 7);
      case "anyo":
        return fechObj.toISOString().substring(0, 4);
      default:
        console.log("Periodo erroneo.");
        break;
    }

    return resultado;
  };

  return gasto;
}
/** FUNCIONES FUNCIONES Fundamentos de JavaScript II **/

function listarGastos() {
  return gastos;
}
function anyadirGasto(objetoGasto) {
  objetoGasto.id = idGasto;
  gastos.push(objetoGasto);
  idGasto++;
}

function borrarGasto(id) {
  for (let key of gastos) {
    if (key.id === id) {
      let indice = gastos.indexOf(key);
      gastos.splice(indice, 1);
      break;
    }
  }
}
function calcularTotalGastos() {
  let totalGastos = 0;
  for (let i in gastos) {
    totalGastos += gastos[i].valor;
  }
  return totalGastos;
}
function calcularBalance() {
  return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objetoFiltro) {
  if (
    objetoFiltro != undefined &&
    objetoFiltro != null &&
    Object.entries(objetoFiltro).length != 0
  ) {
    let resultado = gastos.filter((gast) => {
      //Comporbar fechaDesde
      if (objetoFiltro.hasOwnProperty("fechaDesde")) {
        if (gast.fecha < Date.parse(objetoFiltro.fechaDesde)) {
          return;
        }
      }

      //Comporbar fechaHasta
      if (objetoFiltro.hasOwnProperty("fechaHasta")) {
        if (gast.fecha > Date.parse(objetoFiltro.fechaHasta)) {
          return;
        }
      }

      //Comporbar valorMinimo
      if (objetoFiltro.hasOwnProperty("valorMinimo")) {
        if (gast.valor < objetoFiltro.valorMinimo) {
          return;
        }
      }

      //Comporbar valorMaximo
      if (objetoFiltro.hasOwnProperty("valorMaximo")) {
        if (gast.valor > objetoFiltro.valorMaximo) {
          return;
        }
      }

      //Comporbar descripcionContiene
      if (objetoFiltro.hasOwnProperty("descripcionContiene")) {
        if (!gast.descripcion.includes(objetoFiltro.descripcionContiene)) {
          return;
        }
      }

      //Comporbar etiquetasTiene
      if (objetoFiltro.hasOwnProperty("etiquetasTiene")) {
        if (objetoFiltro.etiquetasTiene.length != 0) {
          let check = false;
          for (let des of objetoFiltro.etiquetasTiene) {
            if (gast.etiquetas.includes(des)) {
              check = true;
            }
          }
          if (!check) {
            return;
          }
        }
      }
      return gast;
    });

    return resultado;
  } else {
    return gastos;
  }
}

function agruparGastos(
  periodo = "mes",
  etiquetas = [],
  fechDesd,
  fechaHas = Date.now()
) {
  //if (fechDesd == undefined){
  //let aux = new Date(Date.now()).getFullYear();
  //fechDesd = 0;
  //}
  let listaResultadoFiltros = filtrarGastos({
    fechaDesde: fechDesd,
    fechaHasta: fechaHas,
    etiquetasTiene: etiquetas,
  });
  let gastosAgrupados = listaResultadoFiltros.reduce(function (
    acumulador,
    gast
  ) {
    let perAgrup = gast.obtenerPeriodoAgrupacion(periodo);
    if (acumulador.hasOwnProperty(perAgrup)) {
      acumulador[perAgrup] = acumulador[perAgrup] + gast.valor;
    } else {
      acumulador[perAgrup] = gast.valor;
    }
    return acumulador;
  },
  {});
  return gastosAgrupados;
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  mostrarPresupuesto,
  actualizarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance,
  filtrarGastos,
  agruparGastos,

  //MODIFICACIÓN EXPORT
};
