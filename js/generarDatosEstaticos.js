'use strict'

//Importar los programas /js/gestionPresupuesto y js/gestionPresupuestoWeb. 
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

//Actualizar el presupuesto a 1500€
gestionPresupuesto.actualizarPresupuesto(1500);  

//Mostrar el presupuesto en el div#presupuesto
gestionPresupuesto.mostrarPresupuesto();
gestionPresupuestoWeb.mostrarDatoEnId(presupuesto, div);

//Crear los siguientes gastos
let gasto1 = gestionPresupuesto.CrearGasto('Compra carne', 23.44, '2021-10-06', 'comida');
let gasto2 = gestionPresupuesto.CrearGasto('Compra fruta y verdura', 14.25, '2021-09-06', 'supermercado', 'comida');

//Añadir los gastos creados
gestionPresupuesto.anyadirGasto(//X?????? )


