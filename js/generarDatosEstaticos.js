"use strict";
function test(){

    import * as gpw from './gestionPresupuestoWeb.js';
    import * as gp from './gestionPresupuesto.js';
    
    gp.actualizarPresupuesto(1500);
    let variable = gp.mostrarPresupuesto();
    
    gpw.mostrarDatoEnId(variable, "presupuesto");
    
    let gasto1 = gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
    let gasto2 = gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
    let gasto3 = gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
    let gasto4 = gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
    let gasto5 = gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
    let gasto6 = gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
    
    gp.anyadirGasto(gasto1);
    gp.anyadirGasto(gasto2);
    gp.anyadirGasto(gasto3);
    gp.anyadirGasto(gasto4);
    gp.anyadirGasto(gasto5);
    gp.anyadirGasto(gasto6);
    
    let variable2 = gp.calcularTotalGastos();
    gpw.mostrarDatoEnId(variable2, "gastos-totales");
    
    let variable3 = gp.calcularBalance();
    gpw.mostrarDatoEnId(variable3, "balance-total");
    
    let variable4 = gp.listarGastos();
    gpw.mostrarGastoWeb(variable4, "listado-gastos-completo");
    
    let variable5 = gp.filtrarGastos(["01-09-2021","31-09-2021"]);
    gpw.mostrarGastoWeb(variable5, "listado-gastos-filtrado-1");
    
    let variable6 = gp.filtrarGastos([null,null,50]);
    gpw.mostrarGastoWeb(variable6, "listado-gastos-filtrado-2");
    
    let variable7 = gp.filtrarGastos([null,null,200,null,null,["seguros"]]);
    gpw.mostrarGastoWeb(variable7, "listado-gastos-filtrado-3");
    
    let variable8 = gp.filtrarGastos([null,null,null,50,null,["comida","transporte"]]);
    gpw.mostrarGastoWeb(variable8, "listado-gastos-filtrado-4");
    
    let variable9 = gp.agruparGastos("dia");
    gpw.mostrarGastosAgrupadosWeb(variable9,"agrupacion-dia","dia");
    
    let variable10 = gp.agruparGastos("mes");
    gpw.mostrarGastosAgrupadosWeb(variable10,"agrupacion-mes","mes");
    
    let variable11 = gp.agruparGastos("anyo");
    gpw.mostrarGastosAgrupadosWeb(variable11,"agrupacion-anyo","año");
    
}