// let pb = "";
// pb = `<span class="clase">hola</span>`;
// let div = document.getElementById("presupuesto");
// div.innerHTML = pb;
// console.log(div);

let divTarget = document.getElementById('presupuesto')

const gasto = { descripcion: 'Monitor 20 Pulgadas', valor: 500, id: 5, fecha: '' };

let spanEtiquetas = "";
let divGasto = document.createElement('div');

divGasto.classList.add('gasto');

// divGasto.innerHTML = `<div class="gasto-descripcion">Tipo - ${gasto.nombre}</div>
                    
//                     <div class="gasto-valor">Valor - ${gasto.precio}</div>
//                     <div class="gasto-id">id - ${gasto.id}</div>
//                    `;
// divTarget.append(divGasto);

let elemento = document.getElementById('presupuesto')
let etiquetas = 'etiquetas 0';
elemento.innerHTML +=
    `<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">
                        ${etiquetas}
                    </div>
        </div>`;








// console.log(divTarget);

/*
`<div class="gasto">
                    <div class="gasto-descripcion">${gasto.descripcion}</div>
                    <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleString()}</div> 
                    <div class="gasto-valor">${gasto.valor}</div> 
                    <div class="gasto-etiquetas">
                        ${etiquetas}
                    </div>*/