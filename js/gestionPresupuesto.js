
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
//variables globales con VAR
// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var idGasto = 0;

"use strict";

function actualizarPresupuesto(NewValu) {
    
    if(NewValu >= 0)
    {
        presupuesto = NewValu;
    }
    else
    {
        console.log(`Error, ${NewValu} negativo invalido`);
        NewValu = -1;
    }
    return NewValu;
}

function mostrarPresupuesto() {
    // TODO
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}


function CrearGasto(NewDescriptio,NewValu,fec = Date.now(),...etiq) {
    if(NewValu < 0 || isNaN(NewValu)){
        NewValu = 0;
    }
    //if (etiquetas.length == 0) { etiquetas = [] };
        this.descripcion = NewDescriptio;
        this.valor = NewValu;
        this.etiquetas = [...etiq];
        this.fecha = (typeof fec === 'string') ? Date.parse(fec) : fec;

        //this.msotrarGato => (){} - funcion flecha para codigo corto
    this.mostrarGasto = function() { //metodo de gestion constructua
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    };

    this.actualizarDescripcion = function(newDescription) {
        this.descripcion = newDescription;
    };

    this.actualizarValor = function(newValue){

        if(newValue >= 0)
        {
            this.valor = newValue;
        console.log("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor +" €");
        return ("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor +" €")
        }
    };

    this.actualizarDescripcion = function(NewDescript){
        this.descripcion = NewDescript;
    };

    this.actualizarValor = function(NewVal){

        if(NewVal >= 0)
        {
            this.valor = NewVal;
        }
    };

    this.mostrarGastoCompleto = function(){
        let acumulador = "";
        var fechanueva = new Date(this.fecha);
        for (var i = 0; i < this.etiquetas.length; i++)
        {
            acumulador += `- ${this.etiquetas[i]}\n`;
        }
        
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechanueva.toLocaleString()}\nEtiquetas:\n${acumulador}`;s
    };

    this.actualizarFecha = function(NewDate){
        //si la fecha es válida se comprueba al comienzo del objeto
        if(!isNaN(Date.parse(NewDate))){
            this.fecha = Date.parse(NewDate);
        } //si no se define la fecha
    };

    this.anyadirEtiquetas = function(...etiq){

        let etiquetaComparada;
        for (var i = 0; i < etiq.length; i++){
            etiquetaComparada = this.etiquetas.includes(etiq[i],1);
            if(!(etiquetaComparada == true)) { //si la etiqueta introducida no esta en el array
                this.etiquetas.push(etiq[i]); //insertal el elemento al final
            }
        }
    };
    this.borrarEtiquetas = function(...etiq){
        let buscar = 0;
        for(var i = 0; i < etiq.length; i++){
            buscar = this.etiquetas.indexOf(etiq[i]);
            if(buscar != -1){
                this.etiquetas.splice(buscar,1);    
            }
        }
    },
    this.obtenerPeriodoAgrupacion = function(periodo){
        let nuevaFecha = new Date(this.fecha);
        let mes = nuevaFecha.getMonth();
        let dia = nuevaFecha.getDate();
        let anyo = nuevaFecha.getFullYear();
        switch (periodo){
            case "mes":
                if( mes < 9){return (`${anyo}-0${mes+1}` );}
                else {return (`${anyo}-${mes+1}` );}
            case "dia":
                let result;
                if( dia < 10){
                    if (mes < 9)
                        result = (`${anyo}-0${mes+1}-0${dia}`);
                    else result = (`${anyo}-${mes+1}-0${dia}`);
                }
                else{
                    if(mes < 9){result = `${anyo}-0${mes+1}-${dia}`}
                    else{result = `${anyo}-${mes+1}-${dia}`}
                }
                return result;
            case "anyo":
                return (`${anyo}`);
            default:
                return `valor no válido`;
        }
    }
} 

    //práctica 2
    function listarGastos(){
        return gastos;
    }
    function anyadirGasto(gasto){
        gasto.id = idGasto;
        idGasto++;
        gastos.push(gasto);
    }
    function borrarGasto(id){
        for(var i = 0; i < gastos.length; i++){
            if(id == gastos[i].id){
                gastos.splice(i,1);
            }
        }
    }
    function calcularTotalGastos(){
        let suma = 0;
        for(var i = 0; i < gastos.length; i++){
            suma += gastos[i].valor;
        }
        return suma;
    }
    function calcularBalance(){
        return (presupuesto -  calcularTotalGastos());
    }

    //práctica 3
    function 
    filtrarGastos(miObjeto){
        // let fechDesde,Fd;
        // let fechHasta,Fh;
        // let minimo;
        // let maximo;
        // let ParamDesc;
        // let etiquetas;
        // let gastosfiltrados;

        // //console.log(JSON.stringify(miObjeto));
            
        //     if(miObjeto.hasOwnProperty('fechaDesde'))
        //     {
        //         fechDesde = Date.parse(miObjeto.fechaDesde);
        //         if (typeof miObjeto.fechaDesde === 'string')
        //         {
        //             if(!isNaN(fechDesde) && fechDesde !== 1630454400000)
        //             {
        //                 Fd = fechDesde; //en el caso de no ser número
        //             }
        //             else
        //             {
        //                 Fd  = undefined;
        //             }
        //         } 
        //     }

        //     if(miObjeto.hasOwnProperty('fechaHasta'))
        //     {
        //         fechHasta=Date.parse(miObjeto.fechaHasta);
        //         if(typeof miObjeto.fechaHasta === 'string')
        //         {
        //             if(!isNaN(fechHasta) && fechHasta !== 1632960000000){ 
        //                 Fh = fechHasta;
        //             }
        //             else{
        //                 Fh = undefined;
        //             }
        //         }
        //     }
        //     if(miObjeto.hasOwnProperty('valorMinimo'))
        //     {
        //         minimo = miObjeto.valorMinimo;
        //     }
        //     if(miObjeto.hasOwnProperty('valorMaximo')){
        //         maximo = miObjeto.valorMaximo;
        //     }
        //     if(miObjeto.hasOwnProperty('descripcionContiene')){
        //         ParamDesc = miObjeto.descripcionContiene;
        //     }
        //     if(miObjeto.hasOwnProperty('etiquetasTiene')){
        //         etiquetas = [miObjeto.etiquetasTiene];//array vacio
        //     }
        //     gastosfiltrados = gastos.filter(function(item){
            
        //         let devuelve = true;
        //         let latiene = false;

        //         if(typeof fechDesde !== 'undefined') {
        //             if(item.fecha < Fd)
        //                 devuelve = false;
        //         }
                
        //         if(typeof fechHasta !== 'undefined'){
        //             if(item.fecha > Fh)
        //                 devuelve = false;
        //         }
                

        //         if((typeof minimo !== 'undefined') && (item.valor < minimo))
        //         {
        //             devuelve = false;
        //         }

        //         if((typeof maximo !== 'undefined') && (item.valor > maximo))
        //         {
        //             devuelve = false;
        //         }

        //         if((typeof ParamDesc !== 'undefined') && (!item.descripcion.includes(ParamDesc)))
        //         {
        //             devuelve = false;
        //         }
            
        //         // console.log(etiquetas)
        //         if ((typeof etiquetas !== 'undefined') && (etiquetas.length > 0)){
        //             // console.log("entra")
        //             for(let it of etiquetas){
        //                 for(let ot of item.etiquetas)
        //                     if(it === ot)
        //                     latiene = true;
        //             }
        //         }
        //         else { latiene = true;}

        //         return devuelve && latiene;
        //     });

        //     if (miObjeto === {})
        //     {
        //         gastosfiltrados = [...gastos];
        //         return gastosfiltrados;
        //     }
        //     return gastosfiltrados;

        /*He tenido que cambiar el código a este puesto que he tenido muchos conflictos con
        el que he realizado anteriormente*/

    let gastosFiltrados = Object.assign(gastos);
    if (miObjeto != null && Object.entries(miObjeto).length >= 0) {
        if (Object.hasOwn(miObjeto, 'fechaDesde') && typeof miObjeto.fechaDesde === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.fecha >= (Date.parse(miObjeto.fechaDesde))
            })
        }
        if (Object.hasOwn(miObjeto, 'fechaHasta') && typeof miObjeto.fechaHasta === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.fecha <= Date.parse(miObjeto.fechaHasta);
            })
        }
        if (Object.hasOwn(miObjeto, 'valorMinimo') && typeof miObjeto.valorMinimo === 'number') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.valor > miObjeto.valorMinimo;
            })
        }
        if (Object.hasOwn(miObjeto, 'valorMaximo') && typeof miObjeto.valorMaximo === 'number') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                return x.valor < miObjeto.valorMaximo;
            })
        }
        if (Object.hasOwn(miObjeto, 'descripcionContiene') && typeof miObjeto.descripcionContiene === 'string') {
            gastosFiltrados = gastosFiltrados.filter((x) => {
                let param1 = (x.descripcion).toLowerCase();
                let param2 = (miObjeto.descripcionContiene).toLowerCase();
                let param1Array = param1.split(" ");
                let param1ArrayJoin = param1Array.join('');
                if (param1ArrayJoin.indexOf(param2) !== -1) 
                    return true;
            })
        }
        if (Object.hasOwn(miObjeto, 'etiquetasTiene') && Array.isArray(miObjeto.etiquetasTiene) && miObjeto.etiquetasTiene.length > 0) {
            etiquetasTiene.toLowerCase();
            gastosFiltrados = gastosFiltrados.filter((x) => {
                for (let i = 0; i <= miObjeto.etiquetasTiene.length; i++) {
                    if (miObjeto.etiquetasTiene.includes(x.etiquetas[i])) {
                        return true;
                    }
                }
            })
        }

        return gastosFiltrados;
    }
    return gastos;
    }
    
    function agruparGastos(periodo ='mes',etiquetas = [], FecDes='', FecHas=''){
        let objet = {};
        let DateNow = new Date();
        let dia = String(DateNow.getDate()).padStart(2,`0`);
        let mes = String(DateNow.getMonth()+1).padStart(2,`0`);
        let año = DateNow.getFullYear();
        
        if(typeof etiquetas === 'undefined'){
            etiquetas = [];
            objet.etiquetasTiene = etiquetas;
        }
        else{objet.etiquetasTiene = etiquetas;}

        if((typeof FecDes !== "string") || (isNaN(Date.parse(FecDes))) || (typeof FecDes === 'undefined')){
           FecDes = "";
        }
        else{
            objet.fechaDesde = FecDes;
        }

        if((typeof FecHas !== "string") || (isNaN(Date.parse(FecHas))) || (typeof FecHas === 'undefined')){
            FecHas = `${año}-${mes}-${dia}`;
            objet.fechHasta = FecHas;
        }
        else{
            objet.fechaHasta = FecHas;
        }

        let SubConjunto = filtrarGastos(objet);
        let Reduce = SubConjunto.reduce(function(accumulador,item){//si empiezo por cero, el accomulador empuieza por 0
            let peri = item.obtenerPeriodoAgrupacion(periodo);
            if(!accumulador.hasOwnProperty(peri)){
                accumulador[peri] = 0;
            }
            else{
                if(isNaN(accumulador[peri])){
                    accumulador[peri] = 0; 
                }
            }
            accumulador[peri] += item.valor;

            return accumulador;

        },{}); //valor inicial del acumulador
        return Reduce;
    }
    //transformar el listado de etiquetas que introduzca el usuario en el formulario
    function transformarListadoEtiquetas(etiquetas) {
        // let etiqueta = etiquetas.match(/[a-zA-Z0-9]+/gi);
        // console.log(typeof etiqueta) 
        // return etiquetas.match(/[a-zA-Z0-9]+/gi); //busca todas las letras del alfabeto y números del 0 al 9 tanto en minúscula cómo en mayuscula
        let filtredTags = etiquetas.split(/[;.:,\s]/);

    //Eliminado de string vacias dentro del array mediante la función filter.
    let finalTags = filtredTags.filter(tag => tag !== "");

    //Devolución de las etiquetas correctamente transformadas.
    return finalTags;
    }
//las funciones y objetos deben tener los nombres que indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo

function cargarGastos(array) {
    gastos = array;
}
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
/*
 - padStart(2,0) si es de longitud 2 añade a la izquierda un 0
 - console.log(JSON.stringify(objeto))  --> muestra el objeto/parámetro/método completo
 - substring()método devuelve un subconjunto de un objeto String
 - modificador i: insensitif busca tanto mayuscula cómo minúscula
 - global g: incluye todo en un rango
*/
