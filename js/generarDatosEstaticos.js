import {mostrarDatoEnId} from './generarDatosEstaticos.js';
import {mostrarPresupuesto} from './generarDatosEstaticos.js';
import {CrearGasto} from './generarDatosEstaticos.js';
import {anyadirGasto} from './generarDatosEstaticos.js';
import {actualizarPresupuesto} from './generarDatosEstaticos.js';
import {calcularTotalGastos} from './generarDatosEstaticos.js';
import {calcularBalance} from './generarDatosEstaticos.js';
import {listarGastos} from './generarDatosEstaticos.js';
import {mostrarGastoWeb} from './generarDatosEstaticos.js';
import {filtrarGastos} from './generarDatosEstaticos.js';
import {gastos} from './generarDatosEstaticos.js';
import {mostrarGastosAgrupadosWeb} from './generarDatosEstaticos.js';
import {agruparGastos} from '.generarDatosEstaticos.js';
import {mostrarDatoEnId, mostrarGastoWeb,mostrarGastosAgrupadosWeb} from './gestionPresupuestoWeb.js';


let valor1 = 23.44,
    valor2 = 14.25,
    valor3 = 18.60,
    valor4 = 60.42,
    valor5 = 206.45,
    valor6 = 195.78;

let gasto1 = new CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida" );
let gasto2 = new CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida" );
let gasto3 = new CrearGasto("Bonobús", valor3, "2020-05-26", "transporte" );
let gasto4 = new CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina" );
let gasto5 = new CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros" );
let gasto6 = new CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros" );
anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

actualizarPresupuesto(1500);