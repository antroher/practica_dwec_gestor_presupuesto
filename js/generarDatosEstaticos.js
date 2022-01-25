//Importar los programas 
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

//Actualizar el presupuesto a 1500€ 
gestionPresupuesto.actualizarPresupuesto(1500);

//Mostrar el presupuesto en el div#presupuesto (funciones mostrarPresupuesto y mostrarDatoEnId
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto",gestionPresupuesto.mostrarPresupuesto());

 gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
 gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 gestionPresupuesto.anyadirGasto(new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionPresupuestoWeb.mostrarDatoEnId("balance-total",gestionPresupuesto.calcularBalance());

//Listado de Gastos
let gastos = gestionPresupuesto.listarGastos();
for(let gasto of gastos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}
//Listado de gastos filtrados
let gastosFiltro = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

gastosFiltro = gestionPresupuesto.filtrarGastos({valorMinimo: 50});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

gastosFiltro = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetas: "seguros"});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

gastosFiltro = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetas: "comida, transporte"});

for(let gasto of gastosFiltro){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}
//gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
//gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2",gestionPresupuesto.filtrarGastos({valorMinimo:50}))
//gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3",gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
//gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));

//Listado de gastos por año,mes,dia
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gestionPresupuesto.agruparGastos("dia") ,"día");
let xMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", xMes, "mes");
let xAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", xAnyo, "año");

//Práctica 10
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.6.2/dist/chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@1.0.0/dist/chartjs-adapter-moment.min.js"></script>