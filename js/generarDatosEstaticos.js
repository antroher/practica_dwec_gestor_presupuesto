import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
let mostPresupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', mostPresupuesto);

//Crear los siguientes gastos (función crearGasto)
let gasto1 = gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añadir los gastos creados (función anyadirGasto)
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)
let calcularTotalGastos = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", calcularTotalGastos);

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
let calcularBalance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", calcularBalance);

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let listaGastos = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", listaGastos);

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"}
let gastosFiltrados1 = gestionPresupuesto.filtrarGastos(filtrador1);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados1);

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador2 = {valorMinimo : 50}
let gastosFiltrados2 = gestionPresupuesto.filtrarGastos(filtrador2);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltrados2);

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador3 = {valorMinimo : 200, etiquetasTiene : ["seguros"]}
let gastosFiltrados3 = gestionPresupuesto.filtrarGastos(filtrador3);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltrados3);

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosFiltrados4 = gestionPresupuesto.filtrarGastos(filtrador4);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados4);    

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let filtrador5 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosFiltrados5 = gestionPresupuesto.filtrarGastos(filtrador5);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados5);   

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let gastosAgrupados1 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupados1, "dia")

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let gastosAgrupados2 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupados2, "mes")

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let gastosAgrupados3 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupados3, "anyo")