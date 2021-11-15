"use strict";

import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

//Actualizamos presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el html
let presupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", presupuesto);

//Creamos los gastos y los guardamos en un array
let gastosNuevosCreados = [];
gastosNuevosCreados.push(new gestionPresupuesto.CrearGasto("Comprar Carne", 23.44, "2021-10-06", "casa", "comida"));
gastosNuevosCreados.push(new gestionPresupuesto.CrearGasto("Comprar fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gastosNuevosCreados.push(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gastosNuevosCreados.push(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gastosNuevosCreados.push(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gastosNuevosCreados.push(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

//Añadimos los gastos del array gastosNuevosCreados
for (let key of gastosNuevosCreados){
    gestionPresupuesto.anyadirGasto(key);
}

//Mostramos los Gastos Totales
let gastos_Totales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gastos_Totales);

//Mostramos el Balance total
let balance_Total = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balance_Total);

//Mostramos el listado de completo de gastos
for (let gast of gestionPresupuesto.listarGastos()){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gast)
}

/*** Mostrar gastos con filtros ****/

// gastos realizados en septiembre de 2021 
let filtro = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})
for (let gast of filtro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gast)
}

//Mostrar el listado de gastos de más de 50€
filtro = gestionPresupuesto.filtrarGastos({valorMinimo: 50})
for (let gast of filtro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gast)
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros
filtro = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]})
for (let gast of filtro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gast)
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€.
filtro = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})
for (let gast of filtro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gast)
}


/**** Mostrar datos Agrupados ****/

//Mostrar el total de gastos agrupados por día
let agrupacion = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacion ,"día");

//Mostrar el total de gastos agrupados por mes
agrupacion = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacion ,"mes");

//Mostrar el total de gastos agrupados por año
agrupacion = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacion ,"año");

/**** EVENTOS DE LOS BOTONES ****/

//Forma 1 --> Creas una función en una variable y la añades al listener del botón deseado.
let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");

btnActualizarPresupuesto.addEventListener("click", () => gestionPresupuestoWeb.actualizarPresupuestoWeb());

let btnAnyadirgasto = document.getElementById("anyadirgasto");
btnAnyadirgasto.addEventListener("click",gestionPresupuestoWeb.nuevoGastoWeb);