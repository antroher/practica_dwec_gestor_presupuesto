/*programa de ejemplo para generar un conjunto de gastos*/
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as gestionPresupuesto from "./gestionPresupuesto.js";

//Actualizar el presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto
let presu = gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto', presu);

//Crear los siguientes gastos
gestionPresupuesto.CrearGasto('Comprar carne', 23.44,'2021-10-06','casa','comida');
gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25,'2021-09-06','supermercado','comida');
gestionPresupuesto.CrearGasto('Bonobús', 18.60,'2020-05-26','transporte');
gestionPresupuesto.CrearGasto('Gasolina', 60.42,'2021-10-08','transporte','gasolina');
gestionPresupuesto.CrearGasto('Seguro hogar', 206.45,'2021-09-26','casa','seguros');
gestionPresupuesto.CrearGasto('Seguro coche', 195.78,'2021-10-06','transporte','seguros');

//Añadir los gastos creados (función anyadirGasto)
