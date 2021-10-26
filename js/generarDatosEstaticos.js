import * as gestionPresupuesto from './gestionPresupuesto';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb';

//Actualizar el presupuesto a 1500€ (función actualizarPresupuesto)
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId)
let mostPresupuesto = 
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", mostPresupuesto);

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
let filtrador = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"}
let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrador);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados);

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador = {valorMinimo : 50}
let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrador);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltrados);

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador = {valorMinimo : 200, etiquetasTiene : ["seguros"]}
let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrador);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltrados);

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
let filtrador = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrador);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados);    

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let filtrador = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastosFiltrados = gestionPresupuesto.filtrarGastos(filtrador);
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados);   

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let gastosAgrupados = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupados, "dia")

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let gastosAgrupados = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupados, "mes")

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
let gastosAgrupados = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupados, "anyo")