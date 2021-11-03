function mostrarDatoEnId(idElemento, valor){
    let Elemen = document.getElementById(idElemento);
    Elemen.innerHTML = valor;
}
function mostrarGastoWeb(idElemento, gastos){
  let Elemen = document.getElementById(idElemento);
  for (let gasto of gastos) {
      let datos = "";
      for (let e of gasto.etiquetas) {
          datos += `
          <span class="gasto-etiquetas-etiqueta">
              ${e}
          </span>`
      }
      Elemen.innerHTML += 
      `<div class="gasto">
          <div class="gasto-descripcion">${gasto.descripcion}</div>
          <div class="gasto-fecha">${gasto.fecha}</div> 
          <div class="gasto-valor">${gasto.valor}</div> 
          <div class="gasto-etiquetas">
          ${datos}`;
    }
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
  const Elemen = document.getElementById(idElemento);
  let datos = ""
  for (let [llave, val] of Object.entries(agrup)) {
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
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}