 function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML += valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    
    <div class="gasto">
    <div class="gasto-descripcion">DESCRIPCIÓN DEL GASTO</div>
    <div class="gasto-fecha">FECHA DEL GASTO</div> 
    <div class="gasto-valor">VALOR DEL GASTO</div> 
    <div class="gasto-etiquetas">
    <span class="gasto-etiquetas-etiqueta">
        ETIQUETA 1
    </span>
    <span class="gasto-etiquetas-etiqueta">
        ETIQUETA 2
    </span>
    </div> 
    </div>

    /*foreach (gasto) {
        let div = document.createElement('div');
        div.className = gasto;
        div.innerHTML = <div class="gasto-descripcion">`${gasto.descripcion}`</div><br/>
                        <div class="gasto-fecha">`${gasto.fecha}`</div><br/>
                        <div class="gasto-valor">`${gasto.valor}`</div><br/>
                        <div class="gasto-etiquetas">
                            for (let i = 0; i < gasto.etiquetas.length; i++) {
                                <span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span>
                            }
                        </div>       
    }*/   
         
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}