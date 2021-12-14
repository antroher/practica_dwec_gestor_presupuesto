import {mostrarDatoEnId, mostrarGastoWeb,mostrarGastosAgrupadosWeb} from './gestionPresupuestoWeb.js';
import {mostrarPresupuesto}    from './gestionPresupuesto.js';
import {CrearGasto} from './gestionPresupuesto.js';
import {listarGastos} from './gestionPresupuesto.js';
import {anyadirGasto} from './gestionPresupuesto.js';
import {calcularTotalGastos} from './gestionPresupuesto.js';
import {calcularBalance} from './gestionPresupuesto.js';
import {filtrarGastos} from './gestionPresupuesto.js';
import {agruparGastos} from './gestionPresupuesto.js';
import {actualizarPresupuesto} from './gestionPresupuesto.js';

actualizarPresupuesto(1500);

mostrarDatoEnId('presupuesto', mostrarPresupuesto());

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida" );
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida" );
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte" );
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros" );
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros" );
anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

mostrarDatoEnId("gastos-totales", calcularTotalGastos());
mostrarDatoEnId("balance-total", calcularBalance());


let gastosLista = listarGastos();

for (let gasto of gastosLista)
  {
   mostrarGastoWeb("listado-gastos-completo", gasto);
  }

  let gastosFechas = filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
  
  for (let gasto of gastosFechas)
  {
    mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
  }
  
  let gastosValores = filtrarGastos({valorMinimo: 50});
  
  for (let gasto of gastosValores)
  {
    mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
  }

  let gastosValoresEtiqueta = filtrarGastos({valorMinimo: 200, etiquetas:"seguros"});
  
  for (let gasto of gastosValoresEtiqueta)
  {
    mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
  }

  let gastosValoresEtiquetas = filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});
  
  for (let gasto of gastosValoresEtiquetas)
  {
    mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
  }
  

let gastosdia = agruparGastos("dia");
mostrarGastosAgrupadosWeb("agrupacion-dia", gastosdia, "día");


let gastosmes = agruparGastos("mes");
mostrarGastosAgrupadosWeb("agrupacion-mes", gastosmes, "mes");


let gastosanyo = agruparGastos("anyo");
mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosanyo, "año");
