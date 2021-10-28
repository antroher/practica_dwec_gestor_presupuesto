
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
//variables globales con VAR
// TODO: Variable global
var presupuesto = 0;
let gastos = [];
let idGasto = 0;

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
    console.log ("Tu presupuesto actual es de" + presupuesto + "€, siendo" +
    presupuesto + "el Numero de la variable global presupuesto");
}


function CrearGasto(NewDescriptio,NewValu,fec = Date.now(),...etiq) {
    if(NewValu < 0 || isNaN(NewValu)){
        NewValu = 0;
    }
    //if (etiquetas.length == 0) { etiquetas = [] };
    let gasto = {
        descripcion: NewDescriptio,
        valor: NewValu,
        etiquetas: [...etiq],
        fecha: (typeof fec === 'string') ? Date.parse(fec) : fec,
        mostrarGasto(){
            console.log(`Gasto correspondiente a  ${descripcion} 
            con valor  ${Numero} €`);
        },
        actualizarDescripcion(newDescription){
            this.descripcion = newDescription;
        },
        actualizarValor(newValue){
            let RetournValue

            if(newValue >= 0)
            {
                this.valor = newValue;
            console.log("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor +" €");
            return ("Gasto correspondiente a "+ this.descripcion + " con valor " + this.valor +" €")
            }
        },
        actualizarDescripcion(NewDescript){
            this.descripcion = NewDescript;
        },
        actualizarValor(NewVal){

            if(NewVal >= 0)
            {
                this.valor = NewVal;
            }
        },
        mostrarGastoCompleto(){
            let acumulador = "";
            var fechanueva = new Date(this.fecha);
            for (var i = 0; i < this.etiquetas.length; i++)
            {
                acumulador += `- ${this.etiquetas[i]}\n`;
            }
            
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechanueva.toLocaleString()}\nEtiquetas:\n${acumulador}`;s
        },
        actualizarFecha(NewDate){
            //si la fecha es válida se comprueba al comienzo del objeto
            if(!isNaN(Date.parse(NewDate))){
                this.fecha = Date.parse(NewDate);
            } //si no se define la fecha
        },
        anyadirEtiquetas(...etiq){

            let etiquetaComparada;
            for (var i = 0; i < etiq.length; i++){
                etiquetaComparada = this.etiquetas.includes(etiq[i],1);
                if(!(etiquetaComparada == true)) { //si la etiqueta introducida no esta en el array
                    this.etiquetas.push(etiq[i]); //insertal el elemento al final
                }
            }
        },
        borrarEtiquetas(...etiq){
            let buscar = 0;
            for(var i = 0; i < etiq.length; i++){
                buscar = this.etiquetas.indexOf(etiq[i]);
                if(buscar != -1){
                    this.etiquetas.splice(buscar,1);    
                }
            }
        },
        obtenerPeriodoAgrupacion(periodo){
            let nuevaFecha = new Date(this.fecha);
            switch (periodo){
                case "mes":
                    if(nuevaFecha.getMonth() == 0 || nuevaFecha.getMonth() > 12){ return `Error, no hay mes 0 o mayor a 12`}
                    else if(nuevaFecha.getMonth() < 10){return (`${nuevaFecha.getFullYear()}-0${nuevaFecha.getMonth()+1}` );}
                    else if(nuevaFecha.getMonth() <= 12){return (`${nuevaFecha.getFullYear()}-${nuevaFecha.getMonth()+1}`);}
                    break;
                case "dia":
                    if(nuevaFecha.getDate() == 0 || nuevaFecha.getDate() > 31){ return `Eror`}
                    else if(nuevaFecha.getDate() < 10){return (`${nuevaFecha.getFullYear()}-0${nuevaFecha.getMonth()+1}-0${nuevaFecha.getDate()}`) ;}
                    else if(nuevaFecha.getDate() <= 31){return (`${nuevaFecha.getFullYear()}-${nuevaFecha.getMonth()+1}-${nuevaFecha.getDate()}`);}
                    break;
                case "anyo":
                    if(nuevaFecha.getFullYear() === NaN){return `Eror`}
                    else {return (`${nuevaFecha.getFullYear()}`);}
                    break;
                default:
                    `valor no válido`;
                    break;
            }
        }
    };
    return gasto;
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
    function filtrarGastos(miObjeto){
        let fechDesde,Fd;
        let fechHasta,Fh;
        let minimo;
        let maximo;
        let ParamDesc;
        let etiquetas;
        let gastosfiltrados;

        console.log(JSON.stringify(miObjeto));
        if (!miObjeto === {})
        {
            console.log("1");
            if(miObjeto.hasOwnProperty('fechaDesde'))
            {
                console.log("2");
                fechDesde = Date.parse(miObjeto.fechaDesde);
                if (typeof miObjeto.fechaDesde === 'string')
                {
                    console.log("3");
                    if(!isNaN(fechDesde))
                    {
                        Fd = fechDesde; //en el caso de no ser número
                    }
                    else
                    {
                        Fd  = undefined;
                    }
                } 
            }

            if(miObjeto.hasOwnProperty('fechaHasta'))
            {
                fechHasta=Date.parse(miObjeto.fechaHasta);
                if(typeof miObjeto.fechaHasta === 'string')
                {
                    if(!isNaN(fechHasta)){ 
                        Fh = fechHasta;
                    }
                    else{
                        Fh = undefined;
                    }
                }
            }
            if(miObjeto.hasOwnProperty('valorMinimo'))
            {
                minimo = miObjeto.valorMinimo;
            }
            if(miObjeto.hasOwnProperty('valorMaximo')){
                maximo = miObjeto.valorMaximo;
            }
            if(miObjeto.hasOwnProperty('descripcionContiene')){
                ParamDesc = miObjeto.descripcionContiene;
            }
            if(miObjeto.hasOwnProperty('etiquetasTiene')){
                etiquetas = [...miObjeto.etiquetasTiene];//array vaciío
            }
            gastosfiltrados = gastos.filter(function(item){
            
                let devuelve = true;
                let latiene = false;

                if(typeof fechDesde !== 'undefined') {
                    if(item.fecha < fechDesde)
                        devuelve = false;
                }
                
                if(typeof fechHasta !== 'undefined'){
                    if(item.fecha > fechHasta)
                        devuelve = false;
                }
                

                if((typeof minimo !== 'undefined') && (item.valor < minimo))
                {
                    devuelve = false;
                }

                if((typeof maximo !== 'undefined') && (item.valor > maximo))
                {
                    devuelve = false;
                }

                if((typeof ParamDesc !== 'undefined') && (!item.descripcion.includes(ParamDesc)))
                {
                    devuelve = false;
                }
            
                if ((etiquetas !== 'undefined') && (etiquetas.length > 0)){//comprobar tamaño mayor que cero
                    for(let it of etiquetas){
                        for(let ot of item.etiquetas)
                            if(it === ot)
                            latiene= true;
                    }
                }
                else { latiene = true;}

                return devuelve && latiene;
            });
            //return gastosfiltrados;
            for (let z of gastosfiltrados)
            console.log("GastosFiltrados" + JSON.stringify(z));


        }
        else{
            gastosfiltrados = [...gastos];
            return gastosfiltrados;
        }
    }
    //substring()método devuelve un subconjunto de un objeto String
    //PathState js
    //si no tiene etiqueta le creo un array vaio, sino objt.etiquetasTiene = []
    function agruparGastos(periodo ='mes',etiquetas = [], FecDes='', FecHas=''){//fecha en formato de cadena
        let objet = {};
        let DateNow = new Date();
        let peri;

        if(typeof etiquetas === 'undefined'){
            etiquetas = [];
            objet.etiquetasTiene = etiquetas;
        }
        else{objet.etiquetasTiene = etiquetas;}

        if(typeof FecDes === "string" || !isNaN(Date.parse(FecDes)) || typeof FecDes !== 'undefined'){
            objet.fechaDesde = FecDes;
        }
        else{
            FecDes = "";
        }

        if(typeof FecHas === "string" || isNaN(Date.parse(FecHas)) || typeof FecHas !== 'undefined'){
            FecHas = DateNow;
        }
        else{
            FecHas = "";
        }

        let SubConjunto = filtrarGastos(objet);

        let Reduce = SubConjunto.reduce(function(accumulador,item){//si empiezo por cero el accomulador empuieza por 0
            peri = item.obtenerPeriodoAgrupacion(periodo); //devuelve año - mes

            if(accumulador.hasOwnProperty(peri)){
                if(isNaN(accumulador[peri])){
                    accumulador[peri] = 0; //en ves de punto [] para llamar a la propiedad
                }
            }
            else{
                accumulador[peri] = 0;
            }
            accumulador[peri] = accumulador[peri] + item.valor;

            return accumulador;

        },{}); //valor inicial del acumulador
        return Reduce;
    }
//las funciones y objetos deben tener los nombres que indican en el enunciado
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
//padStart(2,0) si es de longitud 2 añade a la izquierda un 0
/*JSON.stringify(objeto)  --> muestra el objeto completo
también se puede meter un método*/
