import * as gestionPresupuesto from './gestionPresupuesto.js'


function repintar(){

    
}
 function actualizarPresupuestoWeb(){


 }

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).innerHTML= `<br> ${valor} <br>`;

}

function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);    
    let texto = "<div class='gasto'>" +
    "<div class= 'gasto-descripcion'>" + gasto.descripcion + " </div>" +  
    "<div class='gasto-fecha'> " + gasto.fecha + " </div>" +
    "<div class='gasto-valor'> " + gasto.valor + " </div>" +    
    "<div class= 'gasto-etiquetas'>";

        gasto.etiquetas.forEach(etiqueta => {
            texto +="<span class='gasto-etiquetas-etiqueta'> ";
            texto += etiqueta;
            texto += " </span>";             
        });
        texto+= "</div> </div>";
        
        elem.innerHTML += texto; 
    }      

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elem = document.getElementById(idElemento);
    let texto = "";
    for (let [clave, valor] of Object.entries(agrup)) {
        texto += "<div class='agrupacion-dato'> <span class='agrupacion-dato-clave'> " + clave + " </span>" +
            "<span class='agrupacion-dato-valor'> " + valor + "\n </span></div>";
        
    };
    elem.innerHTML += "<div class='agrupacion'><h1>Gastos agrupados por " + periodo + " </h1>" + texto;
    
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}