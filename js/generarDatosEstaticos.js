
//Este me convencio mas
import * as GastosGen from "./gestionPresupuesto.js";
import * as GastosGenWeb from "./gestionPresupuestoWeb.js";

GastosGen.actualizarPresupuesto(1500);
GastosGenWeb.mostrarDatoEnId("presupuesto",GastosGen.mostrarPresupuesto());

 GastosGen.anyadirGasto(GastosGen.CrearGasto("Compra carne",23.44, "2021-10-06","comida"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 GastosGen.anyadirGasto(GastosGen.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

GastosGenWeb.mostrarDatoEnId("gastos-totales", GastosGen.calcularTotalGastos());
GastosGenWeb.mostrarDatoEnId("balance-total",GastosGen.calcularBalance());

GastosGenWeb.mostrarGastoWeb("listado-gastos-completo", GastosGen.listarGastos())
