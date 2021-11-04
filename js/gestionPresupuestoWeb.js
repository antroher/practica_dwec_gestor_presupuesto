import { calcularTotalGastos } from "./gestionPresupuesto";

/*Importar las funciones necesarias de otros js */



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
            let acumulaEtiquetas = "";
            string1 += ` <span class="gasto-etiquetas-etiqueta"> ${etiq} </span> `
        }
    string1 += `</div></div>`

    document.getElementById(idElemento).innerHTML += string1;

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){

}



/*Exportar las funciones necesarias.*/ 
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
