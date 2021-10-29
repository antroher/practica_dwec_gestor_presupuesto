// Fichero que contendrá un programa de ejemplo para generar un conjunto de gastos y mostrar la información relacionada con estos en la página interaccionHTML.html
"use strict";
import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

gestionPresupuesto.actualizarPresupuesto(1500);
 
//Función que se autoejecuta automáticamente para mostrar el presupuesto en el div#presupuesto
(function () {
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    gestionPresupuestoWeb.mostrarDatoEnId( "div#presupuesto",presupuesto);
})();



