import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

'use strict'
//Actualizar presupuesto.
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar presupuesto.
let mostrarPres=gestionPresupuesto.mostrarPresupuesto();
alert(mostrarPres);

gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mostrarPres);

//Crear gastos.
let g1 = new gestionPresupuesto.CrearGasto('Compra carne', 23.44, '2021-10-06', 'casa', 'comida');
let g2 = new gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');
let g3 = new gestionPresupuesto.CrearGasto('Bonobús', 18.60, '2020-05-26', 'transporte');
let g4 = new gestionPresupuesto.CrearGasto('Gasolina', 60.42, '2021-10-08', 'transporte', 'gasolina');
let g5 = new gestionPresupuesto.CrearGasto('Seguro hogar', 206.45, '2021-09-26', 'casa', 'seguros');
let g6 = new gestionPresupuesto.CrearGasto('Seguro coche', 195.78, '2021-10-06', 'transporte', 'seguros');
//Añadir gastos.
gestionPresupuesto.anyadirGasto(g1);
gestionPresupuesto.anyadirGasto(g2);
gestionPresupuesto.anyadirGasto(g3);
gestionPresupuesto.anyadirGasto(g4);
gestionPresupuesto.anyadirGasto(g5);
gestionPresupuesto.anyadirGasto(g6);

//Mostrar Gastos Totales.

let mostrarGTotales= gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales',mostrarGTotales);

//Mostrar Balance Total.
let balanceT=gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total',balanceT);

//Mostrar el listado completo de gastos

let listaGastos= gestionPresupuesto.listarGastos();
for(let g of listaGastos)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',g);
}

//Mostrar el listado de gastos realizados en septiembre de 2021

let filtraGast= gestionPresupuesto.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});


//Mostrar el listado de gastos de más de 50€ 




//               (IMPORTANTE) ---->                FOR OF PARA ARRAYS - FOR IN PARA EL RESTO.