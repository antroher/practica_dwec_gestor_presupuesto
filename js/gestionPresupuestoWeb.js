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

    for (et of gasto.etiquetas){
        let spanGastoEti = document.createElement('span');
        spanGastoEti.classList.add('gasto-etiquetas-etiqueta');
        spanGastoEti.innerHTML = et;
        divGastoEti.append(spanGastoEti);
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