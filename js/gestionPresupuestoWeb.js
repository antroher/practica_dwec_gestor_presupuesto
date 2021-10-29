function mostrarDatoEnId(idElemento, valor) {
    
}

function mostrarGastoWeb(idElemento, gasto) {
    foreach (gasto) {
        <div class="gasto">
            <div class="gasto-descripcion">`${gasto.descripcion}`</div>
            <div class="gasto-fecha">`${gasto.fecha}`</div> 
            <div class="gasto-valor">`${gasto.valor}`</div>
            <div class="gasto-etiquetas">
                `for (let i = 0; i < ${gasto.etiquetas.length}; i++)` {
                    <span class="gasto-etiquetas-etiqueta">
                        `${gasto.etiquetas[i]}`
                    </span>
                }
            </div> 
            
            
        </div>
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}