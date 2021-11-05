

function mostrarDatoEnId(idElemento, valor){
    let elem = document.getElementById(idElemento);
    let parrafo = document.createElement('p')
    parrafo.textContent = valor;
    elem.appendChild(p);
}

function mostrarGastoWeb(idElemento, valor){
    if (IdElemento !== undefined) {
        let texto1 = `<div class="gasto">
        <div class="gasto-descripcion">${gasto.descrpcion} </div>   
        <div class="gasto-fecha">${gasto.fecha}</div>
        <div class="gasto-valor">${gasto.valor}</div> 
        <div class="gasto-etiquetas">"`
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            texto1 +=`<span class="gasto-etiquetas-etiqueta">
            ${gasto.etiquetas[i]}
        </span>   
        </div> 
        </div>`
        }
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);
    let html = `<div class="agrupacion">` 


}





// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}