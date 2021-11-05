//import de los archivos
import * as gestionPresupuesto from './gestionPresupuesto.js'
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js'

//actualizar presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

//mostramos la cadena en el documento id=presupuesto
gestionPresupuestoWeb.mostrarDatoEnID('presupuesto',gestionPresupuesto.mostrarPresupuesto());

//creamos gastos
let gasto;
    gasto=gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
    gestionPresupuesto.anyadirGasto(gasto);
    
    gasto=gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
    gestionPresupuesto.anyadirGasto(gasto);

    gasto=gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
    gestionPresupuesto.anyadirGasto(gasto);

    gasto=gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
    gestionPresupuesto.anyadirGasto(gasto);

    gasto=gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
    gestionPresupuesto.anyadirGasto(gasto);

    gasto=gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
    gestionPresupuesto.anyadirGasto(gasto);

//mostramos los gastos totales en el documetos id=gastos-totales
let gastosTotales = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnID('gastos-totales',gastosTotales);

//mostramos el balance total en el documento id=balance-total
let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnID('balance-total',balanceTotal);

//mostrar el listado completo de los gastos en le documento id=listado-gastos-completo
let listadoGastoCompletos = gestionPresupuesto.listarGastos();

for (let elem of listadoGastoCompletos)
{
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',elem);
}



//gastos filtrados
let obj,gastoFiltrado,etiq;
    //mostrar los gastos de septiembre de 2021 id=listado-gastos-filtrado-1
    obj = {fechaDesde : "2021-09-01", fechaHasta:"2021-09-30"};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    for( let key of gastoFiltrado){
        gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',key);
    }
    //mostrar los gastos mas de 50 id=listado-gastos-filtrado-2
    obj = {valorMinimo : 50};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    for( let key of gastoFiltrado){
        gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',key);
    }    
    //mostrar los gastos mas de 200 con etiq seguros id=listado-gastos-filtrado-3
    etiq = ["seguros"];
    obj = {valorMinimo : 200, etiquetasTiene:etiq};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    for( let key of gastoFiltrado){
        gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',key);
    }    
    //mostrar los gastos menos de 50 con etiq comida o transporte id=listado-gastos-filtrado-4
    etiq = ["comida", "transporte"];
    obj = {valorMaximo : 50, etiquetasTiene:etiq};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    for( let key of gastoFiltrado){
        gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',key);
    }
//mostrar total de gastos agrupados
let gastosAgrupados;
    //dia div=agrupacion-dia
    gastosAgrupados=gestionPresupuesto.agruparGastos("dia");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gastosAgrupados,"día");
    //mes div=agrupacion-mes
    gastosAgrupados=gestionPresupuesto.agruparGastos("mes");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gastosAgrupados,"mes");
    //año div=agrupacion-año
    gastosAgrupados=gestionPresupuesto.agruparGastos("anyo");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-año',gastosAgrupados,"año");
