// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
function mostrarDatoEnId(idElemento,valor)
{
    let elem=document.getElementById(idElemento);
    let parrafo=document.createElement('p');
    parrafo.textContent=valor;
    elem.appendChild(parrafo);
}
function mostrarGastoWeb(gasto,idElemento)
{
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    const Elemen = document.getElementById(idElemento);
    let datos = ""
    for (let [llave, val] of Object.entries(agrup)) 
    {
        datos += 
        `<div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${llave}</span>
            <span class="agrupacion-dato-valor">${val}</span>
        </div>`
    };
    Elemen.innerHTML += 
    `<div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datos}
    `   
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
