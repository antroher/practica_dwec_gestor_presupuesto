'use strict';

function mostrarDatoEnID(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p=document.createElement('p');
    p.textContent=valor;
    elem.append(p);

}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    //div class=gasto
    let divg = document.createElement('div'), 
    divg2 = document.createElement('div');
    divg.className="gasto";

        //div class=gasto-descripcion
        console.log(gasto.descripcion)
        divg2.className="gasto-descripcion";
        divg2.textContent=gasto.descripcion ;
        divg.append(divg2);

        //div class=gasto-fecha

        divg2.className="gasto-fecha";
        divg2.textContent=gasto.fecha;
        divg.append(divg2);

        //div class=gasto-valor
        divg2.className="gasto-valor";
        divg2.textContent=gasto.valor;
        divg.append(divg2);

        //div class=gasto-etiquetas
        let span=document.createElement('span');
        span.className="gasto-etiquetas-etiqueta";
        divg2.className="gasto-etiqueta";
            //span
            
            gasto.etiquetas.forEach(etiq => {
                span.textContent=etiq;
                divg2.append(span);
            });

           /* for(let i=0;i<gasto.etiquetas.length;i++)
            {
                span.textContent=gasto.etiquetas[i];
                divg2.append(span);
            }*/
    
    elem.append(divg);
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

    for (let i in agrup){
      
            //div class="agrupacion-dato"
            let divAD=document.createElement('div'),span=document.createElement('span');
            divAD.className="agrupacion-dato";
                //span class="agrupacion-dato-clave"
                span.className="agrupacion-dato-clave";
                span.textContent=i;
                divAD.append(span);
                //span class="agrupacion-dato-valor"
                span.className="agrupacion-dato-valor";
                span.textContent=agrup[i];
                divAD.append(span);
            div.append(divAD);
    }    
}

export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}