import * as gestionPresupuesto from './gestionPresupuesto.js'
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js'

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
let gasto1= gestionPresupuesto.CrearGasto("Comprar carne", 23.44,"2021-10-06", "supermercado", "casa");
let gasto2= gestionPresupuesto.CrearGasto("Comprar fruta y verdura", 14.25,"2021-09-06", "supermercado", "comida");
let gasto3= gestionPresupuesto.CrearGasto("Bonobús", 18.60,"2020-05-26", "supermercado");
let gasto4= gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5= gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6= gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);


gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());


let gastos = gestionPresupuesto.listarGastos();
gastos.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", element);
});


let gastosFiltrados = gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
gastosFiltrados.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", element);
});

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo:50});
gastosFiltrados.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", element);
});

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetasTiene: ['seguros']}); 
gastosFiltrados.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", element);
});

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida'] ['transporte']});
gastosFiltrados.forEach(element =>{
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", element);
});


gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");