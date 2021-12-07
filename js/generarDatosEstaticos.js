import * as gestionPresupuesto from './gestionPresupuesto.js'
import * as gestionWeb from './gestionPresupuestoWeb.js'

let btnActualizar = document.getElementById('actualizarpresupuesto')
btnActualizar.onclick = gestionWeb.actualizarPresupuestoWeb;

let btnAnyadir = document.getElementById('anyadirgasto')
btnAnyadir.onclick = gestionWeb.nuevoGastoWeb;

let btnAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
btnAnyadirGastoFormulario.addEventListener('click', gestionWeb.nuevoGastoWebFormulario);

let btnGuardarGastos = document.getElementById("guardar-gastos");
btnGuardarGastos.addEventListener('click', new gestionWeb.guardarGastosWeb);

let btnCargarGastos = document.getElementById("cargar-gastos");
btnCargarGastos.addEventListener('click', new gestionWeb.cargarGastosWeb);

gestionPresupuesto.actualizarPresupuesto(1500);
gestionWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());


let g1= new gestionPresupuesto.CrearGasto("Comprar carne", 23.44,"2021-10-06", "casa", "comida");
let g2= new gestionPresupuesto.CrearGasto("Comprar fruta y verdura", 14.25,"2021-09-06", "supermercado", "comida");
let g3= new gestionPresupuesto.CrearGasto("Bonobús", 18.60,"2020-05-26", "transporte");
let g4= new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5= new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6= new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(g1);
gestionPresupuesto.anyadirGasto(g2);
gestionPresupuesto.anyadirGasto(g3);
gestionPresupuesto.anyadirGasto(g4);
gestionPresupuesto.anyadirGasto(g5);
gestionPresupuesto.anyadirGasto(g6);


gestionWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
gestionWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());


let gastos = gestionPresupuesto.listarGastos();
gastos.forEach(element =>{
    gestionWeb.mostrarGastoWeb("listado-gastos-completo", element);
});


let gastosFiltrados = gestionPresupuesto.filtrarGastos({fechaDesde:'2021-09-01', fechaHasta:'2021-09-30'});
gastosFiltrados.forEach(element =>{
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-1", element);
});

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo:50});
gastosFiltrados.forEach(element =>{
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-2", element);
});

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMinimo:200, etiquetasTiene: ['seguros']}); 
gastosFiltrados.forEach(element =>{
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-3", element);
});

gastosFiltrados = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida'] ['transporte']});
gastosFiltrados.forEach(element =>{
    gestionWeb.mostrarGastoWeb("listado-gastos-filtrado-4", element);
});

gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");
gestionWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");
