/*programa de ejemplo para generar un conjunto de gastos*/
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

//Actualizar el presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto
let presu = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presu);

//Crear los siguientes gastos`

let gasto1 = new gestionPresupuesto.CrearGasto('Comprar carne', 23.44,'2021-10-06','casa','comida');
let gasto2 = new gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25,'2021-09-06','supermercado','comida');
let gasto3 = new gestionPresupuesto.CrearGasto('Bonobús', 18.60,'2020-05-26','transporte');
let gasto4 = new gestionPresupuesto.CrearGasto('Gasolina', 60.42,'2021-10-08','transporte','gasolina');
let gasto5 = new gestionPresupuesto.CrearGasto('Seguro hogar', 206.45,'2021-09-26','casa','seguros');
let gasto6 = new gestionPresupuesto.CrearGasto('Seguro coche', 195.78,'2021-10-06','transporte','seguros');

//Añadir los gastos creados (función anyadirGasto)
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

//Mostrar los gastos totales en div#gastos-totales
let GastoTotal = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales',GastoTotal);

//Mostrar el balance total en div#balance-total
let valor = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total',valor);

//Mostrar el listado completo de gastos en div#listado-gastos-completo
let listaGastos = gestionPresupuesto.listarGastos();
for (let k of listaGastos)
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',k);

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1
let gastosfiltrados1 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let j of gastosfiltrados1)
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',j);

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2

let gastosfiltrados2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50});
for (let h of gastosfiltrados2)
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',h);

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
let gastosfiltrados3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]});

for (let w of gastosfiltrados3)
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',w);

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
let gastosfiltrados4 = gestionPresupuesto.filtrarGastos({etiquetasTiene:["comida","transporte"],valorMaximo: 50});

for(let t of gastosfiltrados4)
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',t);

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia
let agrupar = gestionPresupuesto.agruparGastos('dia');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',agrupar,'día');

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes
let agrupar1 = gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',agrupar1,'mes');

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo
let agrupar2 = gestionPresupuesto.agruparGastos('anyo');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',agrupar2,'año');