'use strict'

import * as gastosG from "./gestionPresupuesto.js";
import * as gastoGW from "./gestionPresupuestoWeb.js";

gastosG.actualizarPresupuesto(1500);
gastoGW.mostrarDatoEnId("presupuesto", gastosG.mostrarPresupuesto());