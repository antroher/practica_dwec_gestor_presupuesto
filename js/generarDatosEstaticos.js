import * as GestPresWeb from './gestionPresupuestoWeb.js';
import * as GestPres from './gestionPresupuesto.js';

GestPres.actualizarPresupuesto(1500);
GestPres.mostrarPresupuesto(mostrarDatoEnId('presupuesto'));

GestPres.anyadirGasto(GestPres.CrearGasto("Compra carne", 23.44, '2021-10-06', 'casa', 'comida'));
GestPres.anyadirGasto(GestPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
GestPres.anyadirGasto(GestPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
GestPres.anyadirGasto(GestPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
GestPres.anyadirGasto(GestPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
GestPres.anyadirGasto(GestPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

GestPres.calcularTotalGastos(mostrarDatoEnId('gastos-totales'));
GestPres.calcularBalance(mostrarDatoEnId('balance-total'));
GestPres.listarGastos(mostrarDatoEnId('listado-gastos-completo'));
