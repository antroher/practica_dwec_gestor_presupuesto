'use strict'

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.innerHTML += `<p>${valor}</p>`;
}

function mostrarGastoWeb(idElemento, gastos)
{
    let elemento = document.getElementById(idElemento);

    for (let arrayGasto of gastos)
    {
        let lista = "";
        for (let texto of arrayGasto.etiquetas) 
        {
            lista += `<span class="gasto-etiquetas-etiqueta"> ${texto} </span>`
        }

        elemento.innerHTML +=
            `<div class="gasto">
                <div class="gasto-descripcion"> ${arrayGasto.descripcion} </div>
                <div class="gasto-fecha">${arrayGasto.fecha}</div> 
                <div class="gasto-valor">${arrayGasto.valor}</div> 
                <div class="gasto-etiquetas">
                    ${lista}
                </div>
            </div>`;
    }    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    
    let lista = ""
    for (let [nombre, valor] of Object.entries(agrup))
    {
        lista +=    `<div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave"> ${nombre} </span>
                        <span class="agrupacion-dato-valor"> ${valor} </span>
                    </div>`
    };

    elemento.innerHTML +=   `<div class="agrupacion">
                                <h1> Gastos agrupados por ${periodo} </h1>

                            ${lista}`
}

function EditarHandle ()
{
    this.handleEvent = function(e) 
    {
        //Pedir al usuario datos del gasto, etc
        var desc = prompt('Por favor, introduce la descripción');
        this.gasto.actualizarDescripcion(desc);
    }
}

let el = new EditarHandle();

el.handleEvent(); //1:08:43


//********** NO TOCAR **************
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}