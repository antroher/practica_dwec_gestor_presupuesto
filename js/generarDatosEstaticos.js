"use strict";

import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

let mpresupuesto = document.getElementById('presupuesto');

mpresupuesto.innerHTML = `
    ${gestionPresupuesto.mostrarPresupuesto()}
`;

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

let gastos = gestionPresupuesto.listarGastos();

for(let gasto of gastos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let gastosFiltro = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

gastosFiltro = gestionPresupuesto.filtrarGastos({valorMinimo: 50});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

gastosFiltro = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetas: "seguros"});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

gastosFiltro = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetas: "comida, transporte"});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

let gastosAgruparDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgruparDia, "día");

let gastosAgruparMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgruparMes, "mes");

let gastosAgruparAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgruparAnyo, "año");

//document.getElementById("actualizarpresupuesto").addEventListener("click", gestionPresupuestoWeb.actualizarPresupuestoWeb);
//document.getElementById("anyadirgasto").addEventListener("click", gestionPresupuestoWeb.nuevoGastoWeb);
//document.getElementById("anyadirgasto-formulario").addEventListener("click", gestionPresupuestoWeb.nuevoGastoWebFormulario);