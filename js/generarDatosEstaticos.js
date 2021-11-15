import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

let mostPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', mostPresupuesto);

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let calcularTotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", calcularTotalGastos);

let calcularBalance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", calcularBalance);

let listaGastos = gestionPresupuesto.listarGastos();
listaGastos.forEach(element => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", element); 
});


let filtrador1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"}
let gastosFiltrados1 = gestionPresupuesto.filtrarGastos(filtrador1);
gastosFiltrados1.forEach(element => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", element);
});

let filtrador2 = {valorMinimo : 50}
let gastosFiltrados2 = gestionPresupuesto.filtrarGastos(filtrador2);
gastosFiltrados2.forEach(element => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", element);
});


let filtrador3 = {valorMinimo : 200, etiquetasTiene : ["seguros", ""]}
let gastosFiltrados3 = gestionPresupuesto.filtrarGastos(filtrador3);
gastosFiltrados3.forEach(element => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", element);
});


let filtrador4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosFiltrados4 = gestionPresupuesto.filtrarGastos(filtrador4);
gastosFiltrados4.forEach(element => {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", element);
});
   

let gastosAgrupados1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupados1, "día")

let gastosAgrupados2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupados2, "mes")

let gastosAgrupados3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupados3, "año")

document.getElementById("actualizarpresupuesto").addEventListener("click", gestionPresupuestoWeb.actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click",gestionPresupuestoWeb.nuevoGastoWeb);

