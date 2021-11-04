import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

'use strict'

// Actualizar presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostrar el presupuesto
let mipres = gestionPresupuesto.mostrarPresupuesto(); // devuelve un string
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mipres);

// Crear gastos
let gasto1 = gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir gastos
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

// Mostrar gastos totales
let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales);
                            //<div id="gastos-totales">

// Mostar el balance total
let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balanceTotal);
                            //<div id="balance-total">

// Mostrar listado de gastos
for (let list of gestionPresupuesto.listarGastos()) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",list);
}

// Mostrar gastos filtrados sept2021
let gastoSept = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gastoSept);

/* con esta función petan los test
1) Generación de datos estáticos
Función mostrarDatoEnId:
TypeError: The following error originated from your application code, not from Cypress.

> gasto.etiquetas is not iterable */