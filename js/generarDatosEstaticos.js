import * as gp from './js/gestionPresupuesto'
import * as gpw from './js/gestionPresupuestoWeb'

gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId(gp.mostrarPresupuesto(),"presupuesto");
gp.anyadirDasto(gp.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gp.anyadirDasto(gp.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gp.anyadirDasto(gp.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gp.anyadirDasto(gp.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gp.anyadirDasto(gp.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gp.anyadirDasto(gp.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));
gpw.mostrarDatoEnId(gp.calcularTotalGastos(),"gastos-totales");
gpw.mostrarDatoEnId(gp.calcularBalance(),"balance-total");

let gastos = gp.listarGastos();
gastos.forEach(g => {
    gpw.mostrarGastoWeb("listado-gastos-completo",g);
});

let gastosF=gp.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-30"});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-1",gf);
});

let gastosF=gp.filtrarGastos({valorMinimo:50});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-2",gf);
});

let gastosF=gp.filtrarGastos({valorMinimo:200,etiquetasTiene:["seguros"]});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-3",gf);
});

let gastosF=gp.filtrarGastos({valorMaximo:50,etiquetasTiene:["comida","transporte"]});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-4",gf);
});

gpw.mostrarGastosAgrupadosWeb("agrupacion-dia",gp.agruparGastos("dia"),"dia");

gpw.mostrarGastosAgrupadosWeb("agrupacion-mes",gp.agruparGastos("mes"),"mes");

gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo",gp.agruparGastos("anyo"),"anyo");
