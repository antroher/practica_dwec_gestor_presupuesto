import { mostrarGastosAgrupadosWeb, mostrarGastoWeb } from './gestionPresupuestoWeb';
import * as metodoGastos from './js/gestionPresupuesto'
import * as metodoWeb from './js/gestionPresupuestoWeb'

metodoGastos.actualizarPresupuesto(1500);
metodosGastos.mostrarDatoEnId("presupuesto", metodoGastos.mostrarPresupuesto());
let g1= metodoGastos.CrearGasto("Comprar carne", 23.44,"2021-10-06", "supermercado", "casa");
let g2= metodoGastos.CrearGasto("Comprar fruta y verdura", 14.25,"2021-09-06", "supermercado", "comida");
let g3= metodoGastos.CrearGasto("Bonobús", 18.60,"2020-05-26", "supermercado");
let g4= metodoGastos.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5= metodoGastos.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6= metodoGastos.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
metodoGastos.anyadirGastos(g1);
metodoGastos.anyadirGastos(g2);
metodoGastos.anyadirGastos(g3);
metodoGastos.anyadirGastos(g4);
metodoGastos.anyadirGastos(g5);
metodoGastos.anyadirGastos(g6);


metodoWeb.mostrarDatoEnId("gastos-totales", metodoGastos.calcularTotalGastos());
metodoWeb.mostrarDatoEnId("balance-total", metodoGastos.calcularBalance());
metodoWeb.mostrarGastoWeb("listado-gastos-completo", metodoGastos.listarGastos());
metodoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", metodoGastos.filtrarGastos());
metodoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", metodoGastos.filtrarGastos());

//AQUÍ FALTAN 3 MÉTODOS AÚN. CALMA.

metodoWeb.mostrarGastosAgrupadosWeb("agrupacio-dia", metodoGastos.agruparGastos());
metodoWeb.mostrarGastosAgrupadosWeb("agrupacio-mes", metodoGastos.agruparGastos());
metodoWeb.mostrarGastosAgrupadosWeb("agrupacio-anyo", metodoGastos.agruparGastos());
