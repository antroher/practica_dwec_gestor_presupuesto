import * as gP from './gestionPresupuesto';
import * as gPW from './gestionPresupuestoWeb';

//Actualizar el presupuesto a 1500.
gP.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto.
gPW.mostrarDatoEnId("presupuesto",gP.mostrarPresupuesto());

//Crear los siguientes gastos.
let gasto1 = gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados.
gP.anyadirGasto(gasto1);
gP.anyadirGasto(gasto2);
gP.anyadirGasto(gasto3);
gP.anyadirGasto(gasto4);
gP.anyadirGasto(gasto5);
gP.anyadirGasto(gasto6);

//Mostrar gastos totales en div#gastos-totales.
gPW.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

//Mostrar el balance total en div#balance-total.
gPW.mostrarDatoEnId("balance-total", gP.calcularBalance());

//Mostrar el listado completo de gastos en div#listado-gastos-completo.
gPW.mostrarGastoWeb("listado-gastos-completo", gP.listarGastos());

//Mostrar el listado de gastos realizados en Septiembre de 2021 en div#listado-gastos-filtrado-1.
gPW.mostrarGastoWeb("listado-gasto-filtrado-1", gP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}));

//Mostrar el listado de gastos de mas de 50€ en div#listado-gastos-filtrado-2.
gPW.mostrarGastoWeb("listado-gastos-filtrado-2", gP.filtrarGastos({valorMinimo: 50}));

//Mostrar el listado de gastos de mas de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3.
gPW.mostrarGastoWeb("listado-gastos-filtrado-3", gP.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}));

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4.
gPW.mostrarGastoWeb("listado-gastos-filtrado-4", gP.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));



