import * as metodosGastos from "./gestionPresupuesto.js"
import * as metodosGastosWeb from "./gestionPresupuestoWeb.js"

let botonPresupuesto = document.getElementById("actualizarpresupuesto");
botonPresupuesto.onclick = metodosGastosWeb.actualizarPresupuestoWeb;

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.onclick = metodosGastosWeb.nuevoGastoWeb;

let arrayEditarHandlers = new Array();
let arrayBorrarHandlers = new Array();

metodosGastos.actualizarPresupuesto(1500);
metodosGastosWeb.mostrarDatoEnId("presupuesto", metodosGastos.mostrarPresupuesto());
let g1 = metodosGastos.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = metodosGastos.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = metodosGastos.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = metodosGastos.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = metodosGastos.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = metodosGastos.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
metodosGastos.anyadirGasto(g1);
metodosGastos.anyadirGasto(g2);
metodosGastos.anyadirGasto(g3);
metodosGastos.anyadirGasto(g4);
metodosGastos.anyadirGasto(g5);
metodosGastos.anyadirGasto(g6);
metodosGastosWeb.mostrarDatoEnId("gastos-totales", metodosGastos.calcularTotalGastos());
metodosGastosWeb.mostrarDatoEnId("balance-total", metodosGastos.calcularBalance());
let gastos = metodosGastos.listarGastos();
gastos.forEach(g => {
    metodosGastosWeb.mostrarGastoWeb("listado-gastos-completo", g);
    arrayEditarHandlers.push(metodosGastosWeb.EditarHandle(g));
    arrayBorrarHandlers.push(metodosGastosWeb.BorrarHandle(g));
});
let gastosFiltrados =  metodosGastos.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
gastosFiltrados.forEach(gf => {
    metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-1",gf);
    arrayEditarHandlers.push(metodosGastosWeb.EditarHandle(gf));
    arrayBorrarHandlers.push(metodosGastosWeb.BorrarHandle(gf));
});

gastosFiltrados = metodosGastos.filtrarGastos({valorMinimo: 50});
gastosFiltrados.forEach(gf => {
    metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gf);
    arrayEditarHandlers.push(metodosGastosWeb.EditarHandle(gf));
    arrayBorrarHandlers.push(metodosGastosWeb.BorrarHandle(gf));
});

gastosFiltrados = metodosGastos.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]});
gastosFiltrados.forEach(gf => {
    metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gf);
    arrayEditarHandlers.push(metodosGastosWeb.EditarHandle(gf));
    arrayBorrarHandlers.push(metodosGastosWeb.BorrarHandle(gf));
});

gastosFiltrados = metodosGastos.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]});
gastosFiltrados.forEach(gf => {
    metodosGastosWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gf);
    arrayEditarHandlers.push(metodosGastosWeb.EditarHandle(gf));
    arrayBorrarHandlers.push(metodosGastosWeb.BorrarHandle(gf));
});

let gastosEditar = document.querySelectorAll(".gasto-editar");
for(let i = 0; i < gastosEditar.length; i++){
    gastosEditar[i].addEventListener("click", arrayEditarHandlers[i].handleEvent);
}

let gastosBorrar = document.querySelectorAll(".gasto-borrar");
for(let i = 0; i < gastosBorrar.length; i++){
    gastosBorrar[i].addEventListener("click", arrayBorrarHandlers[i].handleEvent);
}

metodosGastosWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", metodosGastos.agruparGastos("dia"), "día");
metodosGastosWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", metodosGastos.agruparGastos("mes"), "mes");
metodosGastosWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", metodosGastos.agruparGastos("anyo"), "año");
