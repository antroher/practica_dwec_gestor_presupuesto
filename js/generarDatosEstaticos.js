
/*1.-Importar js necesarios.-----------------------------*/
import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

'use strict'

/* 2.-Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)-----------------------*/
gestionPresupuesto.actualizarPresupuesto(1500);

/*3.-Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)---------------------*/
let mipres = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mipres);

/*4.-Crear los gastos ----------------------------------------------------------------------*/
let gasto1 = gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


/*5.-Añadir los gastos creados (función anyadirGasto)--------------------------------------*/
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

/*6.-Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)----------------------*/
let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales);

/*7.- Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)----------------------*/
let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balanceTotal); 

/*8.- Mostrar el listado ---completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)-----------------*/
let listaGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",listaGastos)

/*9.- Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)--------------------------------- */
let objetoGasto = {fechaDesde : "01-09-2021",fechaHasta : "31-09-2021"};
let gastosFiltrados = gestionPresupuesto.filtrarGastos(objetoGasto);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gastosFiltrados);

/*10.- Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)-------------------------------------- */

