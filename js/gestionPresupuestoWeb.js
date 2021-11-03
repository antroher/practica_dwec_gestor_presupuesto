function mostrarDatoEnID(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p=document.createElement('p');
    p.textContent=valor;
    elem.appendChild(p);
}
function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);
    //div class=gasto
    let divg=document.createElement('div');
    divg.className=gasto;

        //div class=gasto-descripcion
        let divgD=document.createElement('div');
        divgD.className="gasto-descripcion";
        divgD.textContent=gasto.descripcion;
        divg.append(divgD);

        //div class=gasto-fecha
        let divgF=document.createElement('div');
        divgF.className="gasto-fecha";
        divgF.textContent=gasto.fecha;
        divg.append(divgF);

        //div class=gasto-valor
        let divgV=document.createElement('div');
        divgV.className="gasto-valor";
        divgV.textContent=gasto.valor;
        divg.append(divgV);

        //div class=gasto-etiquetas
        let divgE=document.createElement('div'), span;
        divgE.className="gasto-etiqueta";
            //span
            gasto[3].forEach(etiq => {
                span=document.createElement('span');
                span.textContent=etiq;
                divgE.append(span);
            });
    
    elem.appendChild(divg);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

}


export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}