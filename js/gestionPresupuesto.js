import { strict } from "assert";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
let gastos = [];
let idGasto = 0;


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
                    else {return (`${nuevaFecha.getFullYear()}`)}
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
    /*objeto.hasOwnProperty(''); comprobar si existe las propiedades indicadas*/
    let fechaDesde = miObjeto.fechaDesde; //fechaDesde.MIN_VALUE;
    let fechaHasta  = miObjeto.fechaHasta;
    let minimo = miObjeto.valorMinimo;
    let maximo = miObjeto.valorMaximo;
    let descripcion = miObjeto.descripcionContiene;
    let etiquetas =miObjeto.etiquetasTiene;
    let date = new Date(Date.parse(this.fecha));

    if(miObjeto == {}){return `${miObjeto.gastos}`} //Si se pasa un objeto vacío, devolverá todos los gastos que haya.
        
    }
    //substring()método devuelve un subconjunto de un objeto String
    //PathState js
    function agruparGastos(){

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
