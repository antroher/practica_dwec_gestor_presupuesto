import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb";
import * as gestionPresupuesto from "./gestionPresupuesto";

'use strict'
//Actualizar presupuesto.
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar presupuesto.
let mostrarPres=gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mostrarPres);