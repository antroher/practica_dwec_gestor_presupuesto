import * as gestionPresupuesto from "./gestionPresupuesto";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

// Fichero que contendrá un programa de ejemplo para generar un conjunto de gastos y mostrar la información relacionada con estos en la página interaccionHTML.html
"use strict";
gestionPresupuesto.actualizarPresupuesto(1500);

//Función que se autoejecuta automáticamente para mostrar el presupuesto en el div#presupuesto

let presupuesto = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId("div#presupuesto", presupuesto);

gestionPresupuesto.CrearGasto("Comprar Carne", 23.44, "2021-10-06", "casa", "comida");
gestionPresupuesto.CrearGasto("Comprar fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");