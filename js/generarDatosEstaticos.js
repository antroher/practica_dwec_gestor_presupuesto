
'use strict';
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

gestionPresupuesto.actualizarPresupuesto(1500);

let cadena = gestionPresupuesto.mostrarPresupuesto();

gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', cadena);

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

let gastos_totales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastos_totales);

let balance_total = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balance_total);

let listado_completo = gestionPresupuesto.listarGastos();
for(let etiqueta of listado_completo){
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", etiqueta);
};

let objeto1 = {
    fechaDesde : "2021-09-01",
    fechaHasta: "2021-09-30"
};
let objeto2 = {
    valorMinimo: 50
};
let objeto3 = {
    etiquetasTiene : ["seguros"],
    valorMinimo: 200
    
};
let objeto4 = {
    etiquetasTiene : ["comida","transporte"],
    valorMaximo : 50
}
let lista_gastos = gestionPresupuesto.filtrarGastos(objeto1)
for (let gasto of lista_gastos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gasto);
}

let lista_gastos2 = gestionPresupuesto.filtrarGastos(objeto2)
for (let gasto of lista_gastos2){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",gasto);
}
let lista_gastos3 = gestionPresupuesto.filtrarGastos(objeto3)
console.log(lista_gastos3)
for (let gasto of lista_gastos3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",gasto);
}
let lista_gastos4 = gestionPresupuesto.filtrarGastos(objeto4)
for (let gasto of lista_gastos4){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4",gasto);
}
/*objeto{
    "2021-09-12": 5,
    "2021":155
} */
let total_gastos_dia = gestionPresupuesto.agruparGastos("dia")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", total_gastos_dia, "día")

let total_gastos_mes = gestionPresupuesto.agruparGastos("mes")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", total_gastos_mes, "mes")

let total_gastos_anyo = gestionPresupuesto.agruparGastos("anyo")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", total_gastos_anyo, "año")
