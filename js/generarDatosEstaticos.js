"use strict"

//Este me convencio mas
import * as gesPre from "./gestionPresupuesto.js";
import * as gesPreWeb from "./gestionPresupuestoWeb.js";

gesPre.actualizarPresupuesto(1500);
gesPreWeb.mostrarDatoEnId("presupuesto",gesPre.mostrarPresupuesto());

 gesPre.anyadirGasto(gesPre.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
 gesPre.anyadirGasto(gesPre.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 gesPre.anyadirGasto(gesPre.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 gesPre.anyadirGasto(gesPre.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 gesPre.anyadirGasto(gesPre.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 gesPre.anyadirGasto(gesPre.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gesPreWeb.mostrarDatoEnId("gastos-totales", gesPre.calcularTotalGastos());
gesPreWeb.mostrarDatoEnId("balance-total",gesPre.calcularBalance());

//Listado de Gastos
gesPreWeb.mostrarGastoWeb("listado-gastos-completo", gesPre.listarGastos())

