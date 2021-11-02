import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';
import * as gestionPresupuesto from './gestionPresupuesto.js';

'use strict'

gestionPresupuesto.actualizarPresupuesto(1500);
let mipres = gestionPresupuesto.mostrarPresupuesto(); // devuelve un string
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',mipres);