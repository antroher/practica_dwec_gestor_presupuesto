import * as gestionPresupuesto from './gestionPresupuesto.js';

import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

let number = datosPresupuesto.gestionPresupuesto(1500);
let mostrar = datosPresupuesto.mostrarPresupuesto();
let datosPresupuesto = datosPresupuestoWeb.mostrarDatoEnId("presupuesto", mostrar);

let gasto1 = new datosPresupuesto.CrearGasto("Comprar carne",23.44,"2021-10-06","casa","comida");

export let gasto2= new datosPresupuesto.CrearGasto("Comprar carne",14.25,"2021-09-06","supermercado","comida");

let gasto3 = new datosPresupuesto.CrearGasto("Bonobús", 18.6, "2020-05-26", "transporte");

let gasto4 = new datosPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08","transporte","gasolina");

let gasto5 = new datosPresupuesto.CrearGasto("Seguro hogar",206.45,"2021-09-26","casa","seguros");

let gasto6 = new datosPresupuesto.CrearGasto("Seguro coche", 195.78,"2021-10-06","transporte","seguros");

datosPresupuesto.anyadirGasto(gasto1);
datosPresupuesto.anyadirGasto(gasto2);
datosPresupuesto.anyadirGasto(gasto3);
datosPresupuesto.anyadirGasto(gasto4);
datosPresupuesto.anyadirGasto(gasto5);
datosPresupuesto.anyadirGasto(gasto6);

let gastoTotal = datosPresupuesto.calcularTotalGastos().toFixed(2);
let datoTotal = datosPresupuestoWeb.mostrarDatoEnId("gastos-totales",gastoTotal);

let balanceTotal = datosPresupuesto.calcularBalance().toFixed(2);
let datoBalance = datosPresupuestoWeb.mostrarDatoEnId("balance-totales", balanceTotal);

let matrizGasto = datosPresupuesto.calcularBalance().toFixed(2);
for(const of matrizGasto)
    {
    datosPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", x)
    }


let filtro1 = datosPresupuesto.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30",
});

for (const x of filtro1)
    {
        datosPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", x);
    }
let filtro2 = datosPresupuesto.filtrarGastos({valorMinimo: 50 });
for(const x of filtro2){
    datosPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",x);
}

let filtro3 = datosPresupuesto.filtrarGastos({
    etiquetasTiene: ["seguros"],
    valorMinimo: 200,
});

for (const x of filtro3){
    datosPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",x);
}

let filtro4 = datosPresupuesto.filtrarGastos({
    etiquetasTiene: ["comida", "transporte"],
    valorMaximo: 50,
});

for (const x of filtro4){
    datosPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4",x);
}

let agrupacion1 = datosPresupuesto.agruparGastos("dia");
datosPresupuesto.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupacion1, "dia")

let agrupacion2 = datosPresupuesto.agruparGastos("mes");
datosPresupuesto.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupacion2, "mes")

let agrupacion3 = datosPresupuesto.agruparGastos("anyo");
datosPresupuesto.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupacion3, "año")


