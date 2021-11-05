

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML= `<p>${valor}</p>`;

}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);    
    let texto = "<div class='gasto'>" +
    "<div class= 'gasto-descripcion'>" + gasto.descripcion + "</div>" +  
    "<div class='gasto-fecha'>" + gasto.fecha + "</div>" +
    "<div class='gasto-valor'>" + gasto.valor + "</div>" +    
    "<div class= 'gasto-etiquetas'>";

        gasto.etiquetas.forEach(etiqueta => {
            texto +="<span class='gasto-etiquetas-etiqueta'>";
            texto += etiqueta;
            texto += "</span>";             
        });
        texto+= "</div> </div>";
        
        elem.innerHTML += texto; 
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