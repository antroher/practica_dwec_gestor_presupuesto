import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

'use strict'


gestionPresupuesto.actualizarPresupuesto(1500);

let mipres = gestionPresupuesto.mostrarPresupuesto(); 
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mipres);

let gasto1 = gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastosTotales);

let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",balanceTotal);

for (let list of gestionPresupuesto.listarGastos()) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo",list);
}


let gastoSept = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let gasto of gastoSept){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto);
}

let gasto50 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for (let g of gasto50){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",g);
}


let gastofilt3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
for (let g of gastofilt3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",g);
}

let gastofilt4 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida","transporte"]});
for (let g of gastofilt4){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4",g);
}
 
let agrupDia = gestionPresupuesto.agruparGastos("dia");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupDia,"día");

let agrupMes = gestionPresupuesto.agruparGastos("mes");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupMes,"mes");

let agrupAnyo = gestionPresupuesto.agruparGastos("anyo");

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupAnyo,"año"); 