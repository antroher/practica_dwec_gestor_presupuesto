'use strict'

function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let p = document.createElement('p');
    p.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.classList.add('gasto');
    elem.append(divGasto);

    let divGastoDes = document.createElement('div');
    divGastoDes.classList.add('gasto-descripcion');
    divGastoDes.innerHTML = `${gasto.descripcion}`;
    divGasto.append(divGastoDes);

    let divGastoFec = document.createElement('div');
    divGastoFec.classList.add('gasto-fecha');
    divGastoFec.innerHTML = `${gasto.fecha}`;
    divGasto.append(divGastoFec); 

    let divGastoVal = document.createElement('div');
    divGastoVal.classList.add('gasto-valor');
    divGastoVal.innerHTML = `${gasto.valor}`;
    divGasto.append(divGastoVal);

    let divGastoEti = document.createElement('div');
    divGastoEti.classList.add('gasto-etiquetas');
    divGasto.append(divGastoEti);

    for (let et of gasto.etiquetas){
        let spanGastoEti = document.createElement('span');
        spanGastoEti.classList.add('gasto-etiquetas-etiqueta');
        spanGastoEti.innerHTML = et;
        divGastoEti.append(spanGastoEti);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.classList.add('agrupacion');
    elem.append(divAgrupacion);

    let hacheUno = document.createElement('h1');
    hacheUno.innerHTML = 'Gastos agrupados por ' + periodo;
    divAgrupacion.append(hacheUno);

    for (let propiedad in agrup){

        let divAgrupDato = document.createElement('div');
        divAgrupDato.classList.add('agrupacion-dato');
        divAgrupacion.append(divAgrupDato);

        let spanClave = document.createElement('span');
        spanClave.classList.add('agrupacion-dato-clave');
        spanClave.innerHTML = `${propiedad}`;
        divAgrupDato.append(spanClave);

        let spanValor = document.createElement('span');
        //spanValor.classList.add('agrupacion-dato-valor');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.innerHTML = `${agrup[propiedad]}`;
        divAgrupDato.append(spanValor);

    }
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}