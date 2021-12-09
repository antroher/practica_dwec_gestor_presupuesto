// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict"
// TODO: Variable global
var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

// Ejercicio 1

function actualizarPresupuesto(num) {
    // TODO
    let retorno ;

    if(isNaN(num)){
        retorno = -1;
    } else {    
        if(num < 0)
        {
            console.log('El dato introducido tiene que ser positivo');
            retorno = -1;
        }
        else
        {
            presupuesto = num;
            retorno = presupuesto;
        }
    }

    return retorno;
}

function mostrarPresupuesto() {
    // TODO
    let texto = `Tu presupuesto actual es de ${presupuesto} €`;
    return texto;
}

//constructor

function CrearGasto(desintro, valorintro, fecha = Date.now(), ...etiquetas) {
    // TODO
    if(valorintro < 0 || isNaN(valorintro))
    {
        valorintro = 0;
    }
    /*if(etiquetas == null)
    {
        etiquetas = new Array();
    }*/

        this.valor = valorintro
        this.descripcion = desintro
        this.etiquetas = [...etiquetas]
        this.fecha = (typeof fecha === 'string') ? Date.parse(fecha) : fecha

        this.mostrarGasto = function() {

            let mostrar = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
            return mostrar;

        }
        

        this.mostrarGastoCompleto = function() {

            let Afecha;
            if(typeof this.fecha === 'string')
            {
                Afecha = Date.parse(this.fecha);
            }
            else
            {
                Afecha = this.fecha;
            }
            
            let Bfecha = new Date(Afecha);
            let texto2 = "";

            for(let etiqueta of this.etiquetas) {
                texto2 = texto2 + `- ${etiqueta}\n`;
            };

            let textoFin = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(Bfecha.toLocaleString())}\nEtiquetas:\n`;
            textoFin = textoFin + texto2;

            return textoFin;
            
        }

        this.actualizarFecha = function(nFecha) {

            let iFecha = Date.parse(nFecha);

            if(!isNaN(iFecha))
            {
                this.fecha = Date.parse(nFecha);
            }

        }
        
        this.actualizarDescripcion = function(description2) { 
            this.descripcion = description2;
        }
        
        this.actualizarValor = function(valor2) { 
            if(valor2 > 0)
            {
                this.valor = valor2;
            }
        }

        this.anyadirEtiquetas = function(...etiquetas) {

            const nEtiquetas = etiquetas.filter((aux) => {
                if (!this.etiquetas.includes(aux)) {
                    return aux;
                }
            });

            this.etiquetas.push(...nEtiquetas)
        }

        this.borrarEtiquetas = function(...etiquetas) {
            etiquetas.forEach((aux) => {
                for (let i = 0; i < this.etiquetas.length; i++) {
                    if (this.etiquetas[i] === aux) {
                        this.etiquetas.splice(i, 1);
                    }
                }
            })
        }

        this.obtenerPeriodoAgrupacion = function(intro) {
 
            //let str = "";
            //let result = "";

            let fechaA = new Date(this.fecha);
            //fechaA.toISOString().split('T')[0];
            //fechaA.toISOString().slice(0, 10);
            //let offset = fechaA.getTimezoneOffset();
            //let dateofftime = new Date(fechaA.getTime() - (offset*60*1000));
            let dateofftime = fechaA.toISOString();
            dateofftime = dateofftime.slice(0,10);
            
            switch(intro) {
                case "dia": {
                    let result = dateofftime;
                    return result;
                    break;
                }

                case "mes": {
                    let str = dateofftime;
                    let result = str.substring(0,7);
                    return result;   
                    break;
                }
                
                case "anyo": {
                    let str = dateofftime;
                    let result = str.substring(0,4);
                    return result;
                    break;
                }
                
                default:{
                    return 'Error';
                }
            }

        }
        
    
};

    


// Ejercicio 2 funciones

function listarGastos() {

    return gastos;

}

function anyadirGasto(gasto) {

    gasto.id = idGasto;
    idGasto = idGasto + 1;
    gastos.push(gasto);

}

function borrarGasto(id) {

    for(let i = 0; i < gastos.length; i++) {

        if(gastos[i].id == id)
        {
            gastos.splice(i, 1);
        }

    }

}

function calcularTotalGastos() {

    let num = 0;

    for(let i = 0; i < gastos.length; i++) {
        num = gastos[i].valor + num;
    }

    return num;
}

function calcularBalance() {
    
    let totalGastos = calcularTotalGastos();
    let balance = presupuesto - totalGastos;
    return balance;

}

// ejercicio 3 funciones

/*function filtrarGastos(filtro) {
    let gastosB = Object.assign(gastos);

    if(typeof filtro === 'object' && filtro != null && Object.entries(filtro).length > 0) {

        //fechaDesde
        if(Object.hasOwn(filtro, 'fechaDesde') && typeof filtro.fechaDesde === 'string') { 
          
            gastosB = gastosB.filter((y) => {
                return y.fecha >= (Date.parse(filtro.fechaDesde));
            })

        }

        //fechaHasta
        if(Object.hasOwn(filtro, 'fechaHasta') && typeof filtro.fechaHasta === 'string') {

            gastosB = gastosB.filter((y) => {
                return y.fecha <= (Date.parse(filtro.fechaHasta));
            })
        }

        //valorMinimo
        if(Object.hasOwn(filtro, 'valorMinimo') && typeof filtro.valorMinimo === 'number') {

            gastosB = gastosB.filter((y) => {
                return y.valor >= filtro.valorMinimo;
            })
        }

        //valorMaximo
        if(Object.hasOwn(filtro, 'valorMaximo') && typeof filtro.valorMaximo === 'number') {

            gastosB = gastosB.filter((y) => {
                return y.valor <= filtro.valorMaximo;
            })

        }

        //descripcionContiene
        if(Object.hasOwn(filtro, 'descripcionContiene') && typeof filtro.descripcionContiene === 'string') {

            gastosB = gastosB.filter((y) => {
                let descripcion1 = (y.descripcion).toLowerCase();
                let descripcion2 = (filtro.descripcionContiene).toLowerCase();
                let Array1 = descripcion1.split(" ");
                let Array1Join = Array1.join('');
                if(Array1Join.indexOf(descripcion2) !== -1) {
                    return true;
                }
            })

        }

        //etiquetasTiene
        if(Object.hasOwn(filtro, 'etiquetasTiene') && Array.isArray(filtro.etiquetasTiene)) {

            gastosB = gastosB.filter((y) => {
                for(let i = 0; i < filtro.etiquetasTiene.length; i++) {
                    if(filtro.etiquetasTiene.includes(y.etiquetas[i])) {
                        return true;
                    }
                }
            })

        }
        return gastosB;
    }


    return gastos;
}*/


function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let gastosFiltrados;
    gastosFiltrados = gastos.filter(function(gasto){
     let exist = true;
     if(fechaDesde){
         if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
     }
     if(fechaHasta){
         if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
     }
     if(valorMinimo){
         if(gasto.valor < Date.parse(valorMinimo)) exist = false;
     }
     if(valorMaximo){
         if(gasto.valor > Date.parse(valorMaximo)) exist = false;
     }
     if(descripcionContiene){
             if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
     }
     if(etiquetasTiene){
         let inside = false;                   
             for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                 for (let j= 0; j < etiquetasTiene.length; j++) {
                     if(gasto.etiquetas[i] == etiquetasTiene[j]) inside = true;                  
                 }
             }
        if(inside == false) exist = false;
     }
         return exist;
    });
return gastosFiltrados;  
}
/*
function filtrarGastos(objeto){
    let gastosFiltrados;

    if(objeto.hasOwnProperty(fecha, valor, descripcion, etiquetas)){
        
        gastosFiltrados = gastos.filter(function(gasto){
            let exist = true;
            if(fechaDesde){
                if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
            }
            if(fechaHasta){
                if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
            }
            if(valorMinimo){
                if(gasto.valor < valorMinimo) exist = false;
            }
            if(valorMaximo){
                if(gasto.valor > valorMaximo) exist = false;
            }
            if(descripcionContiene){
                    if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
            }
            if(etiquetasTiene){
                let inside = false;                   
                    for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                        for (let j= 0; j < etiquetasTiene.length; j++) {
                            if(gasto.etiquetas[i] == etiquetasTiene[j]) inside = true;                  
                        }
                    }
               if(inside == false) exist = false;
            }
                return exist;
           });
    } 
return gastosFiltrados;
}
*/
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {

    let filtro = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta};
    let filtrarGastosA = filtrarGastos(filtro);
    
    let grupos = filtrarGastosA.reduce((acc, item) => {
        let filtroreducido = item.obtenerPeriodoAgrupacion(periodo);
        if(acc[filtroreducido] == null) {
            acc[filtroreducido] = item.valor;
        }
        else {
            acc[filtroreducido] += item.valor;
        }
        return acc;
    }, {});
    return grupos;
}

function transformarListadoEtiquetas(valor) {

    let etiquetas = valor.match(/[a-z0-9]+/gi);
    return etiquetas;
    
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas
}
