import * as gp from './gestionPresupuesto.js'
import * as gpw from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId(gp.mostrarPresupuesto(),"presupuesto");
gp.anyadirGasto(gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gp.anyadirGasto(gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gp.anyadirGasto(gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gp.anyadirGasto(gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gp.anyadirGasto(gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gp.anyadirGasto(gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));
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

gastosF=gp.filtrarGastos({valorMinimo:50});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-2",gf);
});

gastosF=gp.filtrarGastos({valorMinimo:200,etiquetasTiene:["seguros"]});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-3",gf);
});

gastosF=gp.filtrarGastos({valorMaximo:50,etiquetasTiene:["comida","transporte"]});
gastosF.forEach(gf => {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-4",gf);
});

gpw.mostrarGastosAgrupadosWeb("agrupacion-dia",gp.agruparGastos("dia"),"dia");

gpw.mostrarGastosAgrupadosWeb("agrupacion-mes",gp.agruparGastos("mes"),"mes");

gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo",gp.agruparGastos("anyo"),"anyo");
