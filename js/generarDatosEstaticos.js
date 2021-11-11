"use strict";

import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

gp.actualizarPresupuesto(1500);

let mpresupuesto = document.getElementById('presupuesto');

mpresupuesto.innerHTML = `
    ${gp.mostrarPresupuesto()}
`;

let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

gpw.mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());

gpw.mostrarDatoEnId("balance-total", gp.calcularBalance());

let gastos = gp.listarGastos();

for(let gasto of gastos){
    gpw.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let gastosFiltro = gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});

for(let gasto of gastosFiltro){
    gpw.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

gastosFiltro = gp.filtrarGastos({valorMinimo: 50});

for(let gasto of gastosFiltro){
    gpw.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

gastosFiltro = gp.filtrarGastos({valorMinimo: 200, etiquetas: "seguros"});

for(let gasto of gastosFiltro){
    gpw.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

gastosFiltro = gp.filtrarGastos({valorMaximo: 50, etiquetas: "comida, transporte"});

for(let gasto of gastosFiltro){
    gpw.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

let gastosAgruparDia = gp.agruparGastos("dia");

gpw.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgruparDia, "día");

let gastosAgruparMes = gp.agruparGastos("mes");

gpw.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgruparMes, "mes");

let gastosAgruparAnyo = gp.agruparGastos("anyo");

gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgruparAnyo, "año");

document.getElementById("actualizarpresupuesto").addEventListener("click", gpw.actualizarPresupuestoWeb);

document.getElementById("anyadirgasto").addEventListener("click", gpw.nuevoGastoWeb);

document.getElementById("anyadirgasto-formulario").addEventListener("click", gpw.nuevoGastoWebFormulario);

