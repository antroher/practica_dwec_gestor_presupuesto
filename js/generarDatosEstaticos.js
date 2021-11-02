'use strict'
import * as gpw from "./gestionPresupuestoWeb";
import * as gp from "./gestionPresupuesto";

gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId(gp.mostrarPresupuesto(),"presupuesto");
/*~”Compra carne”, 23.44, “2021-10-06”, “casa”, “comida”~
~”Compra fruta y verdura”, 14.25, “2021-09-06”, “supermercado”, “comida”~
~”Bonobús”, 18.60, “2020-05-26”, “transporte”~
~”Gasolina”, 60.42, “2021-10-08”, “transporte”, “gasolina”~
~”Seguro hogar”, 206.45, “2021-09-26”, “casa”, “seguros”~
~”Seguro coche”, 195.78, “2021-10-06”, “transporte”, “seguros”~*/
gp.anyadirGasto(gp.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida"));
gp.anyadirGasto(gp.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida"));
gp.anyadirGasto(gp.CrearGasto("Bonobús",18.60,"2020-05-26","transporte"));
gp.anyadirGasto(gp.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina"));
gp.anyadirGasto(gp.CrearGasto("Seguro hogar",206.45,"2021-09-26","casa","seguros"));
gp.anyadirGasto(gp.CrearGasto("Seguro coche",195.78,"2021-10-06","transporte","seguros"));


