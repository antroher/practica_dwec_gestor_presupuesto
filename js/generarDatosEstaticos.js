
function test(){
import * as gestionPresupuestoWeb from "gestionPresupuestoWeb.js"
import * as gestionPresupuesto from "gestionPresupuesto.js"

gestionPresupuesto.actualizarPresupuesto(1500);
let variable = gestionPresupuesto.mostrarPresupuesto();

gestionPresupuestoWeb.mostrarDatoEnId(variable, "presupuesto");

let gasto1 = gestionPresupuesto.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

let variable2 = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId(variable2, "gastos-totales");

let variable3 = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId(variable3, "balance-total");

let variable4 = gestionPresupuesto.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb(variable4, "listado-gastos-completo");

let variable5 = gestionPresupuesto.filtrarGastos(["01-09-2021","31-09-2021"]);
gestionPresupuestoWeb.mostrarGastoWeb(variable5, "listado-gastos-filtrado-1");

let variable6 = gestionPresupuesto.filtrarGastos([null,null,50]);
gestionPresupuestoWeb.mostrarGastoWeb(variable6, "listado-gastos-filtrado-2");

let variable7 = gestionPresupuesto.filtrarGastos([null,null,200,null,null,["seguros"]]);
gestionPresupuestoWeb.mostrarGastoWeb(variable7, "listado-gastos-filtrado-3");

let variable8 = gestionPresupuesto.filtrarGastos([null,null,null,50,null,["comida","transporte"]]);
gestionPresupuestoWeb.mostrarGastoWeb(variable8, "listado-gastos-filtrado-4");

let variable9 = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(variable9,"agrupacion-dia","dia");

let variable10 = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(variable10,"agrupacion-mes","mes");

let variable11 = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(variable11,"agrupacion-anyo","año");
}