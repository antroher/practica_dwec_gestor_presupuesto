//import de los archivos
import * as gestionPresupuesto from './gestionPresupuesto.js'
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js'

//actualizar presupuesto
gestionPresupuesto.actualizarPresupuesto(1500);

//obtener cadena del presupuesto
let cad = gestionPresupuesto.mostrarPresupuesto();

//mostramos la cadena en el documento id=presupuesto
gestionPresupuestoWeb.mostrarDatoEnID('presupuesto',cad);

//creamos gastos
let gasto = new gestionPresupuestoWeb();
    gasto=gasto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
    gasto.anyadirGasto(gasto);

    gasto=gasto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
    gasto.anyadirGasto(gasto);

    gasto=gasto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
    gasto.anyadirGasto(gasto);

    gasto=gasto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
    gasto.anyadirGasto(gasto);

    gasto=gasto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
    gasto.anyadirGasto(gasto);

    gasto=gasto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
    gasto.anyadirGasto(gasto);

//mostramos los gastos totales en el documetos id=gastos-totales
let gastosTotales = gestionPresupuestoWeb.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnID('gastos-totales',gastosTotales);

//mostramos el balance total en el documento id=balance-total
let balanceTotal = gestionPresupuesto.calcularBalance();
gestionPresupuesto.mostrarDatoEnID('balance-total',balanceTotal);

//mostrar el listado completo de los gastos en le documento id=listado-gastos-completo
let listadoGastoCompletos = gestionPresupuesto.gastos.listarGastos();
gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',listadoGastoCompletos);

//gastos filtrados
let obj,gastoFiltrado,etiq;
    //mostrar los gastos de septiembre de 2021 id=listado-gastos-filtrado-1
    obj = {fechaDesde = "01/08/2021", fechaHAsta="30/08/2021"};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gastoFiltrado);
    //mostrar los gastos mas de 50 id=listado-gastos-filtrado-2
    obj = {valorMinimo = 50};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gastoFiltrado);
    //mostrar los gastos mas de 200 con etiq seguros id=listado-gastos-filtrado-3
    etiq = ["seguros"];
    obj = {valorMinimo = 200, etiquetasTiene=etiq};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    gestionPresupuesto.mostrarGastoWeb('listado-gastos-filtrado-3', gastoFiltrado);
    //mostrar los gastos menos de 50 con etiq comida o transporte id=listado-gastos-filtrado-4
    etiq = ["comida", "transporte"];
    obj = {valorMaximo = 50, etiquetasTiene=etiq};
    gastoFiltrado = gestionPresupuesto.filtrarGastos(obj);
    gestionPresupuesto.mostrarGastoWeb('listado-gastos-filtrado-4', gastoFiltrado);

//mostrar total de gastos agrupados
let gastosAgrupados;
    //dia div=agrupacion-dia
    gastosAgrupados=gestionPresupuesto.agruparGastos("dia");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gastosAgrupados);
    //mes div=agrupacion-mes
    gastosAgrupados=gestionPresupuesto.agruparGastos("mes");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gastosAgrupados);
    //año div=agrupacion-año
    gastosAgrupados=gestionPresupuesto.agruparGastos("año");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gastosAgrupados);
