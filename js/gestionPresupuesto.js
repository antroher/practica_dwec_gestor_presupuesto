'use strict'

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

function comprobarNumNegativo(num){
    let negativo = false;

    if (num >= 0)
    {
        negativo = false;
    }
    else
    {
        negativo = true;
    }   
    return negativo;
}
function actualizarPresupuesto(num) {
    // TODO
    let valor;

    if (comprobarNumNegativo(num))
    {
        console.log('Error. No se puede introducir valores negativos.');
        valor = -1;
    }
    else
    {
        presupuesto = num;
        valor = presupuesto;
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    let texto = 'Tu presupuesto actual es de ' + presupuesto + ' €';
    return texto;
}

    function CrearGasto(des, v, fec = Date.now(), ...etiq) {
    // TODO

    if (comprobarNumNegativo(v)){
        v = 0;
    }
    
    let gasto = {

        descripcion: des,

        valor: v,
  
        etiquetas: [...etiq],

        fecha: (typeof fec == 'string') ? Date.parse(fec) : fec,

        mostrarGasto(){

            let texto = 'Gasto correspondiente a ' + this.descripcion + 
            ' con valor ' + this.valor + ' €';
            return texto;
        },


        mostrarGastoCompleto(){
              
            let fechaDate = new Date(this.fecha);
            let texto = this.mostrarGasto() + '.' + '\nFecha: ' + fechaDate.toLocaleString() + 
            '\nEtiquetas:';

            for (let eti of this.etiquetas){
                texto += '\n- ' + eti;
            }
            texto += '\n';
            return texto;
        },

        actualizarDescripcion(newDes){
            this.descripcion = newDes;
        },

        actualizarValor(newV){
            if (!comprobarNumNegativo(newV)){
                this.valor = newV;
            }
        },

        actualizarFecha(newFec){
            if (isNaN(Date.parse(newFec))){ 
            }
            else{
                this.fecha = Date.parse(newFec);
            }
        },

        anyadirEtiquetas(...eti){
            for (let elem of eti){
                if (!this.etiquetas.includes(elem)){
                    this.etiquetas.push(elem);
                }
            }
        },

        borrarEtiquetas(...nombres){
            for (let nom of nombres){
                if (this.etiquetas.includes(nom)){
                    this.etiquetas.splice(this.etiquetas.indexOf(nom),1);
                }
            }  
        },

        obtenerPeriodoAgrupacion(periodo){

            let fec = new Date(this.fecha); //convierte en objeto fecha

            let cadena = '';
            switch (periodo){
                case 'dia':{//aaaa-mm-dd
                    let mes = fec.getMonth()<10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                    let dia = fec.getDate() <10 ? `0${fec.getDate()}` : `${fec.getDate()}`;
                        cadena = fec.getFullYear() + '-' + mes + '-' + dia;
                        break;
                }
                case 'mes':{//aaaa-mm
                    let mes = fec.getMonth()<10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                    cadena = `${fec.getFullYear()}-` + mes;
                    break;
                }
                case 'anyo':{
                    cadena = fec.getFullYear();
                    break;
                }
                default:{
                    //console.log("error");
                }
            }
            return cadena;
        }
    };

    return gasto;
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    for (let i = 0; i < gastos.length; i++){
        if (id == gastos[i].id){
            gastos.splice(i,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;
    for (let gasto of gastos){
        total += gasto.valor;
    }
    return total;
}

function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos(objeto){

    let fd, fh, vmin, vmax, dc, et;

    if ('fechaDesde' in objeto){
        fd = objeto.fechaDesde;
    }
    if ('fechaHasta' in objeto){
        fh = objeto.fechaHasta;
    }
    if ('valorMinimo' in objeto){
        vmin = objeto.valorMinimo;
    }
    if ('valorMaximo' in objeto){
        vmax = objeto.valorMaximo;
    }
    if ('descripcionContiene' in objeto){
        dc = objeto.descripcionContiene;
    }
    if ('etiquetasTiene' in objeto){
        et = objeto.etiquetasTiene;
    }

    let results = gastos.filter(function(gasto){
        let devuelve = true;
        if (fd !== undefined){
            if (gasto.fechaDesde < fd){
                devuelve = false;   
            }  
        }
        if (fh !== undefined){
            if (gasto.fechaHasta > fh){
                devuelve = false;
            }
        }
        if (vmin !== undefined){
            if (gasto.valorMinimo < vmin){
                devuelve = false;
            }
        }
        if (vmax !== undefined){
            if (gasto.valorMaximo > vmax){
                devuelve = false;
            }
        }
        if (dc !== undefined){
            if (!gasto.descripcionContiene.includes(dc)){
                devuelve = false;
            }
        }
        if (et !== undefined){
            if (!gasto.etiquetasTiene.includes(et)){
                devuelve = false;
            }
        }
        return devuelve;
    })
    if (results !== {}){
        return results;
    }
    else{
        return gastos;
    }
}

function agruparGastos(){

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
    agruparGastos
}
