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
            let acomulador = "";
            var fechaNueva = new Date(this.fecha);
            for(var i = 0; i < this.etiquetas.length; i++){
                acomulador += this.etiquetas[i];
            }
            return `Gasto correspondiente a ${this.NewDescriptio} con valor
            ${this.NewValu} €. \n Fecha: ${(fechaNueva.toLocaleString())}
            \n Etiquetas: \n - ${acomulador}\n`;
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
            for(var i = 0; i < this.etiquetas.length; i++){
                let buscar = this.etiquetas.includes(etiq[i]);
                if(buscar == true){
                    this.etiquetas.splice(buscar,1);    
                }
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
    calcularBalance
}
