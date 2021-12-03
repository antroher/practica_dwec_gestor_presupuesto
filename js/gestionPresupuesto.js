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

        this.descripcion = des,

        this.valor = v,
  
        this.etiquetas = [...etiq],

        this.fecha = (typeof fec == 'string') ? Date.parse(fec) : fec,

        this.mostrarGasto = function(){

            let texto = 'Gasto correspondiente a ' + this.descripcion + 
            ' con valor ' + this.valor + ' €';
            return texto;
        },


        this.mostrarGastoCompleto = function(){
              
            let fechaDate = new Date(this.fecha);
            let texto = this.mostrarGasto() + '.' + '\nFecha: ' + fechaDate.toLocaleString() + 
            '\nEtiquetas:';

            for (let eti of this.etiquetas){
                texto += '\n- ' + eti;
            }
            texto += '\n';
            return texto;
        },

        this.actualizarDescripcion = function(newDes){
            this.descripcion = newDes;
        },

        this.actualizarValor = function(newV){
            if (!comprobarNumNegativo(newV)){
                this.valor = newV;
            }
        },

        this.actualizarFecha = function(newFec){
            if (isNaN(Date.parse(newFec))){ 
            }
            else{
                this.fecha = Date.parse(newFec);
            }
        },

        this.anyadirEtiquetas = function(...eti){
            for (let elem of eti){
                if (!this.etiquetas.includes(elem)){
                    this.etiquetas.push(elem);
                }
            }
        },

        this.borrarEtiquetas = function(...nombres){
            for (let nom of nombres){
                if (this.etiquetas.includes(nom)){
                    this.etiquetas.splice(this.etiquetas.indexOf(nom),1);
                }
            }  
        },

        this.obtenerPeriodoAgrupacion = function(periodo){

            let fec = new Date(this.fecha); //convierte en objeto fecha

            let cadena = '';
            switch (periodo){
                case 'dia':{//aaaa-mm-dd
                    let mes = fec.getMonth()<9 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                    let dia = fec.getDate() <9 ? `0${fec.getDate()}` : `${fec.getDate()}`;
                        cadena = fec.getFullYear() + '-' + mes + '-' + dia;
                        break;
                }
                case 'mes':{//aaaa-mm
                    let mes = fec.getMonth()<9 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
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

    let fd, fh, vmin, vmax, dc, et, fechaD, fechaH;

    if (objeto.hasOwnProperty('fechaDesde')){
        fd = Date.parse(objeto.fechaDesde);
        if (typeof objeto.fechaDesde === 'string'){
            if (!isNaN(fd)){
                fechaD = fd;
            }
            else{
                fechaD = undefined;
            }
        }
    }
    if (objeto.hasOwnProperty('fechaHasta')){
        fh = Date.parse(objeto.fechaHasta);
        if (typeof objeto.fechaHasta === 'string'){
            if (!isNaN(fh)){
                fechaH = fh;
            }
            else{
                fechaH = undefined;
            }
        }
    }
    if (objeto.hasOwnProperty('valorMinimo')){
        vmin = objeto.valorMinimo;
    }
    if (objeto.hasOwnProperty('valorMaximo')){
        vmax = objeto.valorMaximo;
    }
    if (objeto.hasOwnProperty('descripcionContiene')){
        dc = objeto.descripcionContiene;
        dc.toLowerCase();
    }
    if (objeto.hasOwnProperty('etiquetasTiene')){
        et = [...objeto.etiquetasTiene];
    }

    let results = gastos.filter(function(gasto){
        let devuelve = true;
        let latiene = false;

        if (typeof fechaD !== 'undefined'){
            if (gasto.fecha < fechaD){
                devuelve = false;   
            }  
        }
        if (typeof fechaH !== 'undefined'){
            if (gasto.fecha > fechaH){
                devuelve = false;
            }
        }
        if (typeof vmin !== 'undefined'){
            if (gasto.valor < vmin){
                devuelve = false;
            }
        }
        if (typeof vmax !== 'undefined'){
            if (gasto.valor > vmax){
                devuelve = false;
            }
        }
        if (typeof dc !== 'undefined'){
            if (!gasto.descripcion.includes(dc)){
                devuelve = false;
            }
        }
        if (typeof et !== 'undefined' && (et.length > 0)){
            for (let it of et){
                it.toLowerCase();
                for (let ot of gasto.etiquetas){
                    ot.toLowerCase();
                    if (it == ot){
                        latiene ||= true;
                    }
                }
            }
        }
        else{
            latiene = true;
        }
        return devuelve && latiene;
    })
    return results;
}



function agruparGastos(periodo = 'mes', etiquetas = [], fechaDesd = '', fechaHast = Date.now()){

    let gastosFiltrados = filtrarGastos({fechaDesde: fechaDesd, fechaHasta: fechaHast, etiquetasTiene: etiquetas});


    let reducido = gastosFiltrados.reduce(function(acu, item) {
        
       let per = item.obtenerPeriodoAgrupacion(periodo); 

       if (!acu.hasOwnProperty(per)){
           acu[per] = item.valor;
       }
       else {
           if (isNaN(acu[per])){
               acu[per] = 0;
           }
           acu[per] = acu[per] + item.valor;
       }
       return acu;
    }, {});

    return reducido;
}

function transformarListadoEtiquetas(eti){

    let a = eti.match(/\w+/g);

    return a;

}

function cargarGastos(arrayGastos){

    gastos = arrayGastos;

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
    transformarListadoEtiquetas,
    cargarGastos
}
