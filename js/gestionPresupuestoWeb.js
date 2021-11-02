function mostrarDatoEnId(idElemento, valor) {
    idElemento.innerHTML = + valor;
}

/*function mostrarGastoWeb(idElemento, gasto) {
    let eti;
    for (let i = 0; i < gasto.etiquetas.length; i++) {
        if (i === gasto.etiquetas.length - 1) {
            eti += '<span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span><br/>';
        } else {
            eti += '<span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span>';
        }
        
    }
    Element.idElemento.innerHTML =  <div class="gasto-descripcion">`${gasto.descripcion}`</div><br/>
                                    <div class="gasto-fecha">`${gasto.fecha}`</div><br/>
                                    <div class="gasto-valor">`${gasto.valor}`</div><br/>

}*/
    

    
        
    

    /*foreach (gasto) {
        let div = document.createElement('div');
        div.className = gasto;
        div.innerHTML = <div class="gasto-descripcion">`${gasto.descripcion}`</div><br/>
                        <div class="gasto-fecha">`${gasto.fecha}`</div><br/>
                        <div class="gasto-valor">`${gasto.valor}`</div><br/>
                        <div class="gasto-etiquetas">
                            `for (let i = 0; i < gasto.etiquetas.length; i++)` {
                                <span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span>
                            }
                        </div>      */ 
        // `
        // <div class="gasto">
        //     <div class="gasto-descripcion">`${gasto.descripcion}`</div>
        //     <div class="gasto-fecha">`${gasto.fecha}`</div> 
        //     <div class="gasto-valor">`${gasto.valor}`</div>
        //     <div class="gasto-etiquetas">
        //         `for (let i = 0; i < ${gasto.etiquetas.length}; i++)` {
        //             <span class="gasto-etiquetas-etiqueta">
        //                 `${gasto.etiquetas[i]}`
        //             </span>
        //         }
        //     </div> 
            
            
        // </div>
        // `
   
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}