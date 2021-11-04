function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement('p');
    if(id == elemento){
        parrafo.textContent(valor)
    }  
}

function mostrarGastoWeb(idElemento, gastos){
    let descripcion=gasto.descripcion;
    let fecha=gasto.fecha;
    let valor=gasto.valor;
    let etiqueta = new Array();
    let spa = document.createElement('span class="gasto-etiquetas-etiqueta"');
    let 
    for(let i = 0; i<gasto.etiqueta.length;i++)
    {
        if(gasto.etiqueta!=null){
            etiqueta += span(gasto.etiqueta)
        }
    }


    if(id ==idElemento){
        document.id=<div class="gasto">
        <div class="gasto-descripcion">gasto.descripcion</div>
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
    }
}


function mostraGastosAgrupadosWeb(){
    
}






export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostraGastosAgrupadosWeb
}