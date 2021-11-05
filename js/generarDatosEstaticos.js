'use strict';

import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

gestionPresupuesto.actualizarPresupuesto(1500);


let cadena = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', cadena);


let gasto1=gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2=gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado","comida");
let gasto3=gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4=gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5=gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6=gestionPresupuesto.CrearGasto("seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);


//Muestra los g.totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
let TotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", TotalGastos);

let TotalBalance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", TotalBalance);


let listadoGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", listadoGastos);


let filtro1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"}
let gastosF1 = gestionPresupuesto.filtrarGastos(filtro1);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosF1);


let filtro2 = {valorMinimo : 50}
let gastosF2 = gestionPresupuesto.filtrarGastos(filtro2);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosF2);


let filtro3 = {valorMinimo : 200, etiquetasTiene : ["seguros", ""]}
let gastosF3 = gestionPresupuesto.filtrarGastos(filtro3);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosF3);


let filtro4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosF4 = gestionPresupuesto.filtrarGastos(filtro4);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosF4);    


let gastosAgrupadosDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosDia, "día")


let gastosAgrupadosMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupadosMes, "mes")


let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupadosAnyo, "año")