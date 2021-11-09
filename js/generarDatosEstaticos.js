import * as gestionPresupuesto from './gestionPresupuesto.js';

import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

let number = datosPresupuesto.gestionPresupuesto(1500);
let mostrar = datosPresupuesto.mostrarPresupuesto();
let datosPresupuesto = datosPresupuestoWeb.mostrarDatoEnId("presupuesto", mostrar)

let gasto1 = new datosPresupuesto.CrearGasto("Comprar carne",23.44,"2021-10-06","casa","comida")

export let gasto2= new datosPresupuesto.CrearGasto("Comprar carne",14.25,"2021-09-06","supermercado","comida")

let gasto3 = new datosPresupuesto.CrearGasto("Bonobús", 18.6, "2020-05-26", "transporte")

let gasto4 = new datosPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08","transporte","gasolina")

let gasto5 = new datosPresupuesto.CrearGasto("Seguro hogar",206.45,"2021-09-26","casa","seguros")

let gasto6 = new datosPresupuesto.CrearGasto("Seguro coche", 195.78,"2021-10-06","transporte","seguros")

datosPresupuesto.anadirGasto(gasto1);
datosPresupuesto.anadirGasto(gasto2);
datosPresupuesto.anadirGasto(gasto3);
datosPresupuesto.anadirGasto(gasto4);
datosPresupuesto.anadirGasto(gasto5);
datosPresupuesto.anadirGasto(gasto6);

let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
let datoTotal = datosPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastoTotal);

let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
let datoBalance = datosPresupuestoWeb.mostrarDatoEnId("balance-totales", balanceTotal);

let matrizGasto = datosPresupuesto.listarGastos();


