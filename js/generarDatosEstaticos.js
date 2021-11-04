import * as GesPresu from "./gestionPresupuesto.js";
import * as GesPresuWeb from "./gestionPresupuestoWeb.js;"
//actualizar presu
GesPresu.actualizarPresupuesto(1500);
//mostrar presu
GesPresuWeb.mostrarDatoEnId("presupuesto",GesPresu.mostrarPresupuesto());
// Crear gasto
let gasto1 = GesPresu.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = GesPresu.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = GesPresu.CrearGasto("Bonobús", 18.60,"2020-05-26","transporte");
let gasto4 = GesPresu.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = GesPresu.CrearGasto("Seguro hogar", 206.45,"2021-09-26","casa","seguros");
let gasto6 = GesPresu.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
//Añadir Gasto
GesPresu.anyadirGasto(gasto1);
GesPresu.anyadirGasto(gasto2);
GesPresu.anyadirGasto(gasto3);
GesPresu.anyadirGasto(gasto4);
GesPresu.anyadirGasto(gasto5);
GesPresu.anyadirGasto(gasto6);
//mostrar gastos totales
GesPresuWeb.mostrarDatoEnId("gastos-totales",GesPresu.calcularTotalGastos());
//mostrar balance total
GesPresuWeb.mostrarDatoEnId("balance-total",GesPresu.calcularTotalGastos());
//mostrar listado gastos
/*
GesPresuWeb.mostrarGastoWeb("listado-gastos-completo",GesPresu.listarGastos());
//listado de gasto en septiembre
GesPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-1",GesPresu.filtrarGastos({fechaDesde:"01-09-2021",fechaHasta:"30-09-2021"}))
//listado de gasto > 50€
GesPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-2",GesPresu.filtrarGastos({valorMinimo:50}))
//listado de gasto > 200 con etiquetas
GesPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-3",GesPresu.filtrarGastos({etiquetasTiene:["seguros"],valorMinimo:200}));
//listado etiquetas comida o transporte 
GesPresuWeb.mostrarGastoWeb("listado-gastos-filtrado-4",GesPresu.filtrarGastos({etiquetasTiene:["comida","transporte"],valorMaximo:50}));
//gasto agrupados por día
GesPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",GesPresu.agruparGastos("dia"),"día");
//gasto agrupados por mes
GesPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",GesPresu.agruparGastos("mes"),"mes");
//gasto agrupados por año
GesPresuWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",GesPresu.agruparGastos("anyo","año"));
*/