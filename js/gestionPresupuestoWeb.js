 "use strict";

 //Función que recibe id y valor y lo muestra en un elemento <p> de HTML
 function mostrarDatoEnId(idElemento, valor){

    let dataId = document.getElementById(idElemento);
    dataId.innerHTML += `<p>${valor}<p>`

 }

 //Función que recibe un id y un gasto y despues muestra eses gasto con sus propiedades. 
 //Especial atención a los bucles para poder recorrer el array de etiquetas y mostrarlas. Tambien lo utilizamos para mostrar los datos filtrados.
 function mostrarGastoWeb(idElemento, gastos){
    let dataId = document.getElementById(idElemento);

    gastos.forEach((gasto) => {
        let etiquetas = "";

        gasto.etiquetas.forEach((etiqueta) => {
            etiquetas += 

                `<span class="gasto-etiquetas-etiqueta"> 
                    ${etiqueta}
                </span>`;
        });

        dataId.innerHTML += 

            `<div class="gasto">

                <div class="gasto-descripcion">${gasto.descripcion}</div>
                <div class="gasto-fecha">${gasto.fecha}</div> 
                <div class="gasto-valor">${gasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${etiquetas}
                </div> 

            </div>`;
    });
 }

 //Función que recibe un id, una forma de agruparse y un periodo y que mostrara los gastos agrupados segun ese periodo determinado.
 function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let dataId = document.getElementById(idElemento);
    let gastos ="";

    for(let [key, value] of Object.entries(agrup)){
        gastos +=

            `<div class='agrupacion-dato'>

                <span class='agrupacion-dato-clave'>${key}</span>
                <span class='agrupacion-dato-valor'>" ${value}</span>

            </div>`;


        dataId.innerHTML += 
            `< class='agrupacion'>

                <h1>Gastos agrupados por ${periodo} </h1>
                ${gastos}`
                
    }
 }

 export{

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
 }