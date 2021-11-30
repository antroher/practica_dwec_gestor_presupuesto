
//Importar los programas 

import * as gestionPresupuesto from './gestionPresupuesto.js'
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js'

//Actualizar el presupuesto a 1500€ 

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());


let gasto1 = new gestionPresupuesto.CrearGasto('Compra carne',23.44, '2021-10-06', 'casa', 'comida');
let gasto2 = new gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');
let gasto3 = new gestionPresupuesto.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte');
let gasto4 = new gestionPresupuesto.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina');
let gasto5 = new gestionPresupuesto.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros');
let gasto6 = new gestionPresupuesto.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros');

//Añadir los gastos creados

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4); 
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);



gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());


//Listado de Gastos

let listadoGastoCompleto = gestionPresupuesto.listarGastos();
for (const x of listadoGastoCompleto){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", x);
}

let filtrado1 = {fechaDesde : "2021-09-01", fechaHasta : "2021-09-30"};
let gastoFiltrado1 = gestionPresupuesto.filtrarGastos(filtrado1);
for(const x of gastoFiltrado1) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", x);
}

let filtrado2 = {valorMinimo : 50}
let gastoFiltrado2 = gestionPresupuesto.filtrarGastos(filtrado2);
for(const x of gastoFiltrado2) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", x);
}

let filtrado3 = {valorMinimo : 200, etiquetasTiene : ["seguros"]}
let gastoFiltrado3 = gestionPresupuesto.filtrarGastos(filtrado3);
for(const x of gastoFiltrado3) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", x);
}

let filtrado4 = {valorMaximo : 50, etiquetasTiene : ["comida", "transporte"]}
let gastoFiltrado4 = gestionPresupuesto.filtrarGastos(filtrado4);
for(const x of gastoFiltrado4){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", x);
}

/*
for (let a of gestionPresupuesto.listarGastos())
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo', a);

//Listado de gastos filtrados

for (let a of gestionPresupuesto.filtrarGastos({fechaDesde: '2021-09-01', fechaHasta: '2021-09-30'}))
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',a)

for (let a of gestionPresupuesto.listarGastos())
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gestionPresupuesto.filtrarGastos({valorMinimo:50}       ))

gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene:['seguros']}))
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene:['comida','transporte']}));
*/

//Listado de gastos por año,mes,dia
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gestionPresupuesto.agruparGastos('dia') ,'día');
let xMes = gestionPresupuesto.agruparGastos('mes');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', xMes, 'mes');
let xAnyo = gestionPresupuesto.agruparGastos('anyo');
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', xAnyo, 'año');

