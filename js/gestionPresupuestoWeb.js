'use strict'


function mostrarDatoEnId(idElemento ,valor){

    let elem = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elem.appendChild(parrafo);
            
}

function mostrarGastoWeb(idElemento ,gastos){

    /* Coloco el primer bloque de código html ya que este no va a variar .*/
    let string1 = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${gasto.fecha} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`

    for(let etiq of gastos.etiquetas)
        {
            string1 += ` <span class="gasto-etiquetas-etiqueta"> ${etiq} </span> `
        }
    string1 += `</div></div>`

    document.getElementById(idElemento).innerHTML += string1;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    /*Hago el primer bloque de html que no va a cambiar ------------------*/
    let string1 = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elem of agrup)
    {
        string1 += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elem} </span>
                        <span class="agrupacion-dato-valor">${agrup[elem]}</span
                        </div> `
    }
    string1 += `</div>`

    document.getElementById(idElemento).innerHTML += string1;
                 
}



/*Exportar las funciones necesarias.*/ 
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
