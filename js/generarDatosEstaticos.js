/*programa de ejemplo para generar un conjunto de gastos*/
import * as presupuesto from "./gestionPresupuestoWeb";
import * as actualizar from "./gestionPresupuesto";

//Actualizar el presupuesto
actualizar.actualizarPresupuesto();

//Mostrar el presupuesto en el div#presupuesto
let divPresu = Document.getElementById("presupuesto");
presupuesto.mostrarDatoEnId(divPresu);
actualizar.mostrarPresupuesto(divPresu);

