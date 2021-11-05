//Importar los programas 
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

//Actualizar el presupuesto a 1500€ 
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());

 gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
 gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 gestionPresupuesto.anyadirGasto(gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",gestionPresupuesto.calcularBalance());

//Listado de Gastos
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gestionPresupuesto.listarGastos());

//Listado de gastos filtrados
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",gestionPresupuesto.filtrarGastos({valorMinimo:50}))
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));

//Listado de gastos por año,mes,dia
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gestionPresupuesto.agruparGastos("dia") ,"día");
let xMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", xMes, "mes");
let xAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", xAnyo, "año");
