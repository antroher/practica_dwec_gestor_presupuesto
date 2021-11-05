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
    divg.className="gasto";

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
    let elem = document.getElementById(idElemento);

    //div class="agrupacion"
    let div=document.createElement('div');
    div.className="agrupacion";

        //h1 Gastos agrupados por PERIODO
        let h1=document.createElement('h1');
        h1.textContent=`Gastos agrupados por ${periodo}`;
    div.append(h1);

        agru.forEach(elem => {
            //div class="agrupacion-dato"
            let divAD=createElement('div'),span=createElement('span');
            divAD.className="agrupacion-dato";
                //span class="agrupacion-dato-clave"
                span.className="agrupacion-dato-clave";
                span.textContent=elem[0];
                divAD.append(span);
                //span class="agrupacion-dato-valor"
                span.className="agrupacion-dato-valor";
                span.textContent=elem[1];
                divAD.append(span);
            div.append(divAD);
        })
        

        
        
}


export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}