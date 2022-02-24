import * as GastosGen from "./gestionPresupuesto";
import * as GastosGenWeb from "./gestionPresupuestoWeb";

GastosGen.actualizarPresupuesto(1500);
GastosGenWeb.mostrarDatoEnId("presupuesto",GastosGen.mostrarPresupuesto());
