import * as gestionPresupuesto from './gestionPresupuesto.js';

//Para iterar sobre un collection del node usar for...of
/*
! Hola caracola
*/

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    let p = document.createElement("p");
    p.textContent = valor;
    elemento.appendChild(p);
}

//aqui gasto es un array, con lo que habria que cambiarlo y meterlo todo dentro de una iteracción
// function mostrarGastoWeb(idElemento, gastos) {
//     let elemento = document.getElementById(idElemento);
//     for (let gasto of gastos) {
//         // let data = "";
//         // for (let i of gasto.etiquetas) {
//         //     data += `
//         //     <span class="gasto-etiquetas-etiqueta">
//         //         ${i}
//         //     </span>`
//         // }
//         elemento.innerHTML += 
//         `<div class="gasto">
//             <div class="gasto-descripcion">${gasto.descripcion}</div>
//             <div class="gasto-fecha">${gasto.fecha}</div> 
//             <div class="gasto-valor">${gasto.valor}</div> 
//             <div class="gasto-etiquetas">
//             `;

//             let gastoEtiquetas = document.createElement("div");
//             gastoEtiquetas.className = "gasto-etiquetas";
//             elemento.append(gastoEtiquetas);

//             let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
//             nuevoObjEtiqueta.gasto = gasto;

//             for (let x of gasto.etiquetas) {
//                 let gastoEtiqueta = document.createElement("span");
//                 gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
//                 gastoEtiqueta.innerHTML = x + "<br>";
//                 nuevoObjEtiqueta.etiqueta = x;
//                 gastoEtiquetas.append(gastoEtiqueta);
//             }

//             gastoEtiquetas.addEventListener('click',nuevoObjEtiqueta);
            
//             let nuevoObj = new EditarHandle(); 
//             nuevoObj.gasto = gasto;
//             let button = document.createElement('button'); 
//             button.type = 'button'; 
//             button.innerText = 'Editar';
//             button.className = "gasto-editar";
//             button.addEventListener('click',nuevoObj);
//             elemento.append(button);
          

//             let nuevoObjBorrar = new BorrarHandle(); 
//             nuevoObjBorrar.gasto = gasto;
//             let buttonBorrar = document.createElement('button'); 
//             buttonBorrar.type = 'button'; 
//             buttonBorrar.innerText = 'Borrar';
//             buttonBorrar.className = "gasto-borrar";
//             buttonBorrar.addEventListener('click',nuevoObjBorrar);
//             elemento.append(buttonBorrar);

//     }
// }
function mostrarGastoWeb(idElemento, gasto) {
    let identificador = document.getElementById(idElemento);
  
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    identificador.append(divGasto);
  
    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.className = "gasto-descripcion";
    gastoDescripcion.innerHTML = gasto.descripcion;
    divGasto.append(gastoDescripcion);
  
    let gastoFecha = document.createElement("div");
    gastoFecha.className = "gasto-fecha";
    let fechaNueva = new Date(gasto.fecha);
    gastoFecha.innerHTML = fechaNueva.toLocaleString();
    divGasto.append(gastoFecha);
  
    let gastoValor = document.createElement("div");
    gastoValor.className = "gasto-valor";
    gastoValor.innerHTML = gasto.valor;
    divGasto.append(gastoValor);
  
    let gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    divGasto.append(gastoEtiquetas);
  
    let nuevoObjEtiqueta = new BorrarEtiquetasHandle(); 
    nuevoObjEtiqueta.gasto = gasto;
  
    for (let x of gasto.etiquetas) {
      let gastoEtiqueta = document.createElement("span");
      gastoEtiqueta.className = "gasto-etiquetas-etiqueta";
      gastoEtiqueta.innerHTML = x + "<br>";
      nuevoObjEtiqueta.etiqueta = x;
      gastoEtiquetas.append(gastoEtiqueta);
  
    }
  
    gastoEtiquetas.addEventListener('click',nuevoObjEtiqueta);
    
    let nuevoObj = new EditarHandle(); 
    nuevoObj.gasto = gasto;
    
    
    let button = document.createElement('button'); 
    button.type = 'button'; 
    button.innerText = 'Editar';
    button.className = "gasto-editar";
    button.addEventListener('click',nuevoObj);
    divGasto.append(button);
  
  
    let nuevoObjBorrar = new BorrarHandle(); 
    nuevoObjBorrar.gasto = gasto;
    
    let buttonBorrar = document.createElement('button'); 
    buttonBorrar.type = 'button'; 
    buttonBorrar.innerText = 'Borrar';
    buttonBorrar.className = "gasto-borrar";
    buttonBorrar.addEventListener('click',nuevoObjBorrar);
    divGasto.append(buttonBorrar);
  
    
  
   }
  

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    let data = ""
    for (let [key, value] of Object.entries(agrup)) {
        data += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>
        </div>`
    };
    elemento.innerHTML += 
    `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${data}
    `
}

function repintar() {
    //Presupuesto
    let mostPresupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId('presupuesto', mostPresupuesto);

    //Total de gastos
    let calcularTotalGastos = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", calcularTotalGastos);

    //Balance actual
    let calcularBalance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", calcularBalance);

    //Borrar div#listado-gastos-completo | Listado con los gastos y sus datos
    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listaGastos = gestionPresupuesto.listarGastos();
    mostrarGastoWeb("listado-gastos-completo", listaGastos);
}

function formatearFecha(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function actualizarPresupuestoWeb() {
    let presupuesto = parseFloat(prompt("Introduzca un presupuesto: "))
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca la descripción: ");
    let valor = parseFloat(prompt("Introduzca el valor: "));
    let fecha = formatearFecha(Date.parse(prompt("Introduzca la fecha: ")));
    let etiquetas = prompt("Introduce las etiquetas: ");
    let etiquetasArray = etiquetas.split(',');
    let newGasto = gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetasArray);
    gestionPresupuesto.anyadirGasto(newGasto);
    repintar();
}


/* https://stackoverflow.com/questions/2230992/javascript-creating-objects-based-on-a-prototype-without-using-new-constructo*/
function EditarHandle() {
    this.handleEvent = function(event){
        let descripcion1 = prompt("Introduzca la nueva descripción: ");
        let valor1 = parseFloat(prompt("Introduzca el nuevo valor: "));
        let fecha1 = formatearFecha(Date.parse(prompt("Introduzca la nueva fecha: ")));
        let etiquetas1 = prompt("Introduce las nuevas etiquetas: ");
        let etiquetas1Array = etiquetas1.split(',');
        this.gasto.actualizarValor(valor1);
        this.gasto.actualizarDescripcion(descripcion1);
        this.gasto.actualizarFecha(fecha1);
        this.gasto.anyadirEtiquetas(...etiquetas1Array);

    repintar();
   }
}

function BorrarHandle() {
    this.handleEvent = function (event){
      let number = this.gasto.id;
      datosPresupuesto.borrarGasto(number);
      repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event){
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}

//Botones
const actualizarpresupuesto = document.getElementById("actualizarpresupuesto");
const anyadirgasto = document.getElementById("anyadirgasto");

const gastoBorrar = document.getElementById("gasto-borrar");

//Eventos
actualizarpresupuesto.addEventListener('click', actualizarPresupuestoWeb);
anyadirgasto.addEventListener('click', nuevoGastoWeb);


export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
