'use strict'

//Importa los programas para realizar las siguientes acciones.
import * as gastosG from "./gestionPresupuesto.js";
import * as gastosGW from "./gestionPresupuestoWeb.js";

//Actualizar el presupuesto.
gastosG.actualizarPresupuesto(1500);
gastosGW.mostrarDatoEnId("presupuesto", gastosG.mostrarPresupuesto());

//Crear los gastos.
let gasto1 = new gastosG.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gastosG.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gastosG.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gastosG.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gastosG.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gastosG.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos que se han creado.
gastosG.anyadirGasto(gasto1);
gastosG.anyadirGasto(gasto2);
gastosG.anyadirGasto(gasto3);
gastosG.anyadirGasto(gasto4);
gastosG.anyadirGasto(gasto5);
gastosG.anyadirGasto(gasto6);

//Gastos totales en div#gastos-totales.
gastosGW.mostrarDatoEnId("gastos-totales", gastosG.calcularTotalGastos());

//Balance total en div#balance-total.
gastosGW.mostrarDatoEnId("balance-total", gastosG.calcularBalance());

//Listado completo de gastos en div#listado-gastos-completo
gastosGW.mostrarGastoWeb("listado-gastos-completo", gastosG.listarGastos());

//Listados segun filtros en div#listado-gastos-filtrado*.
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-1", gastosG.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-2", gastosG.filtrarGastos({valorMinimo:50}));
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-3", gastosG.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}));
gastosGW.mostrarGastoWeb("listado-gastos-filtrado-4", gastosG.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));

//listados segun agrupacion por periodo en div#agrupacion-****.
//ATENTO CON EL ENUNCIADO, TE AVISABA DE COMO PONER día, mes y año Y TU HAS UTILIZADO EL COMO SE LLAMABAN ANTES
let agrupDia = gastosG.agruparGastos("dia")
gastosGW.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupDia,"día")
let agrupMes = gastosG.agruparGastos("mes")
gastosGW.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupMes,"mes")
let agrupAño = gastosG.agruparGastos("anyo")
gastosGW.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupAño,"año") 


