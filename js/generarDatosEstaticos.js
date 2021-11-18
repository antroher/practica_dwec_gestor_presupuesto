import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
let mostrarPrep = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', mostrarPrep);

//Crear los siguientes gastos (función crearGasto):
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús",18.6,"2020-05-26","transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar",206.45,"2021-09-26", "casa","seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78,"2021-10-06","transporte","seguros");

//Añadir los gastos creados (función anyadirGasto)
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
let GastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", GastosTotales);

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
let balance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balance);

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let listadoGastoCompleto = gestionPresupuesto.listarGastos();
for (const x of listadoGastoCompleto){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", x);
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let filtrado1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"};
let gastoFiltrado1 = gestionPresupuesto.filtrarGastos(filtrado1);
for(const x of gastoFiltrado1) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", x);
}

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtrado2 = {valorMinimo : 50}
let gastoFiltrado2 = gestionPresupuesto.filtrarGastos(filtrado2);
for(const x of gastoFiltrado2) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", x);
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtrado3 = {valorMinimo : 200, etiquetasTiene : ["seguros"]}
let gastoFiltrado3 = gestionPresupuesto.filtrarGastos(filtrado3);
for(const x of gastoFiltrado3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", x);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let filtrado4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastoFiltrado4 = gestionPresupuesto.filtrarGastos(filtrado4);
for(const x of gastoFiltrado4){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", x);
}

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", agrupDia, "día");


//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", agrupMes, "mes");


//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let agrupAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", agrupAnyo, "año");