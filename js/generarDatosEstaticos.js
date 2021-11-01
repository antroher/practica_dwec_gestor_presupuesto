//ESTE ES MI PRIMER IMPORT PARA PROBAR PERO NO ME CONVENCE
/*
import { mostrarDatoEnId } from "./gestionPresupuestoWeb";
import { mostrarGastoWeb } from "./gestionPresupuestoWeb";
import { mostrarGastosAgrupadosWeb } from "./gestionPresupuestoWeb";
*/

//Este me convencio mas
import * as GastosGen from "./gestionPresupuesto";
import * as GastosGen from "./gestionPresupuestoWeb";

GastosGen.actualizarPresupuesto(1500);
GastosGen.mostrarDatoEnId("presupuesto",GastosGen.mostrarPresupuesto());

let gasto1 = GastosGen.anyadirGasto(gastos.GastosGen("Compra carne",23.44, "2021-10-06","comida"));
let gasto2 = GastosGen.anyadirGasto(gastos.GastosGen("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
let gasto3 = GastosGen.anyadirGasto(gastos.GastosGen("Bonobús", 18.60, "2020-05-26", "transporte"));
let gasto4 = GastosGen.anyadirGasto(gastos.GastosGen("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
let gasto5 = GastosGen.anyadirGasto(gastos.GastosGen("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
let gasto6 = GastosGen.anyadirGasto(gastos.GastosGen("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

GastosGen.mostrarDatoEnId("gastos-total", GastosGen.calcularTotalGastos());
GastosGen.mostrarDatoEnId("balance-total",GastosGen.calcularBalance());

let gastosComplet = GastosGen.listarGastos();
gastosComplet.forEach(g => {
        GastosGen,GastosGen.mostrarGastoWeb("listado-completo-gasto", g)
});