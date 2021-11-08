'use strict';


function mostrarDatoEnId(idElemento ,valor){
    
    /*
    let parrafo = document.createElement('p');
    parrafo.textContent = valor;
    elem.appendChild(parrafo); */

    let elem = document.getElementById(idElemento);
    elem.innerHTML += valor;

            
}

function mostrarGastoWeb(idElemento ,gasto){
    /* Coloco el primer bloque de código html ya que este no va a variar ----------------------------------------------------------------------------.*/
    let string1 = `<div class="gasto">
                            <div class="gasto-descripcion"> ${gasto.descripcion} </div>
                            <div class="gasto-fecha"> ${new Date(gasto.fecha).toLocaleDateString()} </div>
                            <div class="gasto-valor"> ${gasto.valor} </div>
                            <div class="gasto-etiquetas">`;


                        
    /*Recorro el array de etiquetas de cada gasto y las voy añadiendo mientras queden. -------------------------------------------*/
    
    console.log(gasto.etiquetas);
    gasto.etiquetas.forEach(etiq => {
            string1 += ` <span class="gasto-etiquetas-etiqueta"> ${etiq} </span> `;

    });

        
    string1 += `</div></div>`;

    document.getElementById(idElemento).innerHTML += string1;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
    /*Hago el primer bloque de html que no va a cambiar ------------------*/
    let string1 = `<div class="agrupacion">
                        <h1>Gastos agrupados por ${periodo}</h1>`
    
    for(let elem in agrup)
    {
        string1 += `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${elem} </span>
                        <span class="agrupacion-dato-valor">${agrup[elem]}</span>
                        </div> `;
    }
    string1 += `</div>`;

    document.getElementById(idElemento).innerHTML += string1;
                 
}


/*Exportar las funciones necesarias.*/ 
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
