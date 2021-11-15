import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

'use strict'

// Actualizar presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostrar el presupuesto
let mipres = gestionPresupuesto.mostrarPresupuesto(); // devuelve un string
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mipres);

// Crear gastos
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

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
for (let gasto of gastoSept){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto);
}
    /* gastoSept = objeto con diferentes propiedades
        tengo que recorrer esas propiedades para mostrarGastoWeb
    */

// Mostrar gastos superiores a 50€
let gasto50 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for (let g of gasto50){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",g);
}

// Mostrar gastos superiores a 200€ con etiqueta "seguros"
let gastofilt3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let g of gastofilt3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",g);
}

// Mostrar gastos que contengan las etiquetas "comida" "transporte" e inferiores a 50€
let gastofilt4 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida","transporte"]});
for (let g of gastofilt4){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4",g);
}
 
// Mostrar gastos agrupados por dia
let agrupDia = gestionPresupuesto.agruparGastos("dia");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupDia,"día");

// Mostrar gastos agrupados por mes
let agrupMes = gestionPresupuesto.agruparGastos("mes");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupMes,"mes");
// Mostrar gastos agrupados por año
let agrupAnyo = gestionPresupuesto.agruparGastos("anyo");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupAnyo,"año"); 

// Llamada para actualizar presupuesto, sin esto no pasa el test
gestionPresupuestoWeb.actualizarPresupuestoWeb();