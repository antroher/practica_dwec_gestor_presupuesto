//Importar los programas

import * as GestPresWeb from './gestionPresupuestoWeb.js';
import * as GestPres from './gestionPresupuesto.js';

//Actualizar el presupuesto a 1500€
GestPres.actualizarPresupuesto(1500);


//Mostrar el presupuesto en el div#presupuesto
GestPresWeb.mostrarDatoEnId('presupuesto', GestPres.mostrarPresupuesto())

//Crear los siguientes gastos y Añadir los gastos creados
GestPres.anyadirGasto(new GestPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
GestPres.anyadirGasto(new GestPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
GestPres.anyadirGasto(new GestPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
GestPres.anyadirGasto(new GestPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
GestPres.anyadirGasto(new GestPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
GestPres.anyadirGasto(new GestPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

//Mostrar los gastos totales en div#gastos-totales
GestPresWeb.mostrarDatoEnId('gastos-totales', GestPres.calcularTotalGastos());

//Mostrar el balance total en div#balance-total
GestPresWeb.mostrarDatoEnId('balance-total', GestPres.calcularBalance());

//Mostrar el listado completo de gastos en div#listado-gastos-completo
GestPresWeb.mostrarGastoWeb('listado-gastos-completo', GestPres.listarGastos());

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1
let fecha1 = {fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'};
let Gastofiltrado1 = GestPres.filtrarGastos(fecha1);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-1', Gastofiltrado1);

//Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2
let vgasto1 = {valorMinimo: 50};
let GastoFiltrado2 = GestPres.filtrarGastos(vgasto1);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-2', GastoFiltrado2);

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3
let vgasto2 = {valorMinimo: 200, etiquetasTiene: ['seguros', '']};
let gastoFiltrado3 = GestPres.filtrarGastos(vgasto2);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado3);

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4
let vgasto3 = {valorMaximo: 50, etiquetasTiene: ['comida', 'transporte']};
let gastoFiltrados4 = GestPres.filtrarGastos(vgasto3);

GestPresWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrados4);

//Mostrar el total de gastos agrupados por día en div#agrupacion-dia
let dia1 = GestPres.agruparGastos("dia");
GestPresWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', dia1, "día");

//Mostrar el total de gastos agrupados por mes en div#agrupacion-mes
let mes1 = GestPres.agruparGastos("mes");
GestPresWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', mes1, "mes");

//Mostrar el total de gastos agrupados por año en div#agrupacion-anyo
let anyo1 = GestPres.agruparGastos("anyo");
GestPresWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', anyo1, "año");
