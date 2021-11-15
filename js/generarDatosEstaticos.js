'use strict'
import * as gpw from "./gestionPresupuestoWeb.js";
import * as gp from "./gestionPresupuesto.js";


document.getElementById("actualizarpresupuesto").addEventListener("click", gpw.actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", gpw.nuevoGastoWeb);
gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId('presupuesto',gp.mostrarPresupuesto());
/*~”Compra carne”, 23.44, “2021-10-06”, “casa”, “comida”~
~”Compra fruta y verdura”, 14.25, “2021-09-06”, “supermercado”, “comida”~
~”Bonobús”, 18.60, “2020-05-26”, “transporte”~
~”Gasolina”, 60.42, “2021-10-08”, “transporte”, “gasolina”~
~”Seguro hogar”, 206.45, “2021-09-26”, “casa”, “seguros”~
~”Seguro coche”, 195.78, “2021-10-06”, “transporte”, “seguros”~*/
gp.anyadirGasto(new gp.CrearGasto("Compra carne",23.44,"2021-10-06","casa","comida"));
gp.anyadirGasto(new gp.CrearGasto("Compra fruta y verdura",14.25,"2021-09-06","supermercado","comida"));
gp.anyadirGasto(new gp.CrearGasto("Bonobús",18.60,"2020-05-26","transporte"));
gp.anyadirGasto(new gp.CrearGasto("Gasolina",60.42,"2021-10-08","transporte","gasolina"));
gp.anyadirGasto(new gp.CrearGasto("Seguro hogar",206.45,"2021-09-26","casa","seguros"));
gp.anyadirGasto(new gp.CrearGasto("Seguro coche",195.78,"2021-10-06","transporte","seguros"));

//Mostrar los gastos totales en div#gastos-totales (funciones calcularTotalGastos y mostrarDatoEnId)

let gastosTotales = gp.calcularTotalGastos();
gpw.mostrarDatoEnId('gastos-totales',gastosTotales);

//Mostrar el balance total en div#balance-total (funciones calcularBalance y mostrarDatoEnId)
let balanceTotal = gp.calcularBalance();
gpw.mostrarDatoEnId('balance-total',balanceTotal);

//Mostrar el listado completo de gastos en div#listado-gastos-completo (funciones listarGastos y mostrarGastoWeb)
let listadoGasto = gp.listarGastos();

for (let i of listadoGasto)
{
    gpw.mostrarGastoWeb('listado-gastos-completo',i);
}

//Mostrar el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1 (funciones filtrarGastos y mostrarGastoWeb)
let object,gastosFiltrados,eti;

    object = {fechaDesde : "2021-09-01", fechaHasta:"2021-09-30"};
    gastosFiltrados = gp.filtrarGastos(object);
    for( let item of gastosFiltrados){
        gpw.mostrarGastoWeb('listado-gastos-filtrado-1',item);
    }
    //Mostrar el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2 (funciones filtrarGastos y mostrarGastoWeb)
    object = {valorMinimo : 50};
    gastosFiltrados = gp.filtrarGastos(object);

    for( let item of gastosFiltrados){
        gpw.mostrarGastoWeb('listado-gastos-filtrado-2',item);
    }    
    //Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3 (funciones filtrarGastos y mostrarGastoWeb)
    eti = ["seguros"];
    object = {valorMinimo : 200, etiquetasTiene:eti};
    gastosFiltrados = gp.filtrarGastos(object);
    for( let item of gastosFiltrados){
        gpw.mostrarGastoWeb('listado-gastos-filtrado-3',item);
    }    
    //Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4 (funciones filtrarGastos y mostrarGastoWeb)
    eti = ["comida", "transporte"];
    object = {valorMaximo : 50, etiquetasTiene:eti};
    gastosFiltrados = gp.filtrarGastos(object);
    for( let item of gastosFiltrados){
        gpw.mostrarGastoWeb('listado-gastos-filtrado-4',item);
    }

    //Mostrar el total de gastos agrupados por día en div#agrupacion-dia (funciones agruparGastos y mostrarGastosAgrupadosWeb)
    gpw.mostrarGastosAgrupadosWeb('agrupacion-dia',gp.agruparGastos("dia"),"día");
    //Mostrar el total de gastos agrupados por mes en div#agrupacion-mes (funciones agruparGastos y mostrarGastosAgrupadosWeb)
    gpw.mostrarGastosAgrupadosWeb('agrupacion-mes',gp.agruparGastos("mes"),"mes");
    //Mostrar el total de gastos agrupados por año en div#agrupacion-anyo (funciones agruparGastos y mostrarGastosAgrupadosWeb)
    gpw.mostrarGastosAgrupadosWeb('agrupacion-anyo',gp.agruparGastos("anyo"),"año");

