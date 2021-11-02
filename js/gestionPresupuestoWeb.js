

function mostrarDatoEnId(idElemento, gasto){
    let res = String(idElemento);
    return res;
}

function mostrarGastoWeb(idElemento, gasto){
    let texto1 = `<div class="gasto">
    <div class="gasto-descripcion">${gasto.descrpcion} </div>
    <div class="gasto-fecha">${gasto.fecha}</div> 
    <div class="gasto-valor">${gasto.valor}</div> 
    <div class="gasto-etiquetas">"`
    for (let i = 0; i < gasto.etiquetas.length; i++) {
        const element = array[i];
        
    }
}

function mostrarGastosAgrupadosWeb(){
    

}





// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}