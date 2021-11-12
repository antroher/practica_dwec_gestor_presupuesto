

import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';




gestionPresupuesto.actualizarPresupuesto(1500);


let mipres = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mipres);


let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
let gasto;


gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);



let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales);

let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal); 


let gastosListados = gestionPresupuesto.listarGastos();
for(let elem of gastosListados)
{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",elem);
}


let objeto, gastoFiltrado, etiquetas;
objeto = {fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"};
gastoFiltrado = gestionPresupuesto.filtrarGastos(objeto);
    for(let elem of gastoFiltrado)
        gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",elem);

 
objeto = {valorMinimo: 50};
gastoFiltrado = gestionPresupuesto.filtrarGastos(objeto);
    for(let elem of gastoFiltrado)
        gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",elem);



objeto = {valorMinimo: 200, etiquetasTiene:["seguros"]}

gastoFiltrado = gestionPresupuesto.filtrarGastos(objeto);
    for(let elem of gastoFiltrado)
        gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",elem);


objeto = {valorMaximo: 50, etiquetasTiene:["comida", "transporte"]}


gastoFiltrado = gestionPresupuesto.filtrarGastos(objeto);
    for(let elem of gastoFiltrado)
        gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4",elem);



gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");


