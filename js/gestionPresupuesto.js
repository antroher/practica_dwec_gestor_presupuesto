// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = []; //UN PUTO ARRAY
var idGasto = 0;



function actualizarPresupuesto(valores) {
    // TODO
    let devolvimiento = 0;
    if(valores < 0 || isNaN(valores))
    {
        console.log("Error, es un número negativo")
        devolvimiento = -1; 
    }
    else 
    {
        presupuesto = valores;
        devolvimiento = presupuesto;
    }
    return devolvimiento;
}

function mostrarPresupuesto() {
    // TODO
    console.log("Tu presupuesto actual es de " + presupuesto + " €");
    return("Tu presupuesto actual es de " + presupuesto + " €");

}

function CrearGasto(descripcion1, valor1 = 0, fechaIn = new Date(), ...etiquetas ) {
    // TODO
    if(valor1 < 0 || isNaN(valor1)) //Porque asi comprueba q no es un string
    {
        valor1 = 0;
    }

    let gasto = { //Valor1 = a lo que introduce la funcion, y lo asigna a valor, para que forme parte del objeto(pq si no salen errores en el nmp)
        descripcion: descripcion1,
        valor: valor1,
        etiquetas: [...etiquetas],// el [] es porque si no tienes ninguna etiquetas creas el array  como por defecto
        fecha: (typeof fechaIn === "string") ? Date.parse(fechaIn) : fechaIn,//si es un string lo converte en fecha en milisegundos

        mostrarGasto(){
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €")
            return("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
        
        },
        actualizarDescripcion(newdescripcion){
            this.descripcion = newdescripcion;
        },
        actualizarValor(newvalor){
            if(newvalor < 0 || isNaN(newvalor))
            {
                console.log("El valor que has metido no es correcto, ponga un número positivo")
            }
            else
            {
                this.valor = newvalor;
            }
        },
        mostrarGastoCompleto (){
            let cadenavacia = "";
            let fecha = new Date(this.fecha);
            cadenavacia += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fecha.toLocaleString()}\nEtiquetas:\n`
            for(let i = 0;i < this.etiquetas.length;i++){
                cadenavacia += `- ${this.etiquetas[i]}\n`
            }
            console.log(cadenavacia);
            return cadenavacia;            
        },
        actualizarFecha(fechaEntrada){
            if(typeof fechaEntrada === "string" && !isNaN(Date.parse(fechaEntrada)))
            {
                let fechaStamp = Date.parse(fechaEntrada);
                this.fecha = fechaStamp;
            }
        },
        anyadirEtiquetas(...nuevaEtiquetas){

            for(let i = 0; i < nuevaEtiquetas.length; i++)
            {
                if(!this.etiquetas.includes(nuevaEtiquetas[i]))
                {
                    this.etiquetas.push(nuevaEtiquetas[i]);
                }
            }
        },
        borrarEtiquetas(...borradorEtiquetas){
            borradorEtiquetas.forEach((DelEtiqueta) => {
                this.etiquetas.forEach((PropiaEtiqueta, index) => {
                    if (DelEtiqueta === PropiaEtiqueta) {
                        this.etiquetas.splice(index, 1);
                    }
                })
            })
        },
        obtenerPeriodoAgrupacion(periodo){
            let devuelve = "";
            let fecha = new Date(this.fecha);
            let dd = String(fecha.getDate()).padStart(2,"0");//longitud de dos sino un cero
            let mm = String(fecha.getMonth()+1).padStart(2,"0");
            let yy = fecha.getFullYear();// +1 porque esta fnción te devuelve del 0 al 11 , el 0 es enero , por eso se le suma uno, para que el 1 sea enero y el 12 diciembre
            switch(periodo){
                case "dia" :
                    devuelve = `${yy}-${mm}-${dd}`
                    return devuelve;
                case "mes" :
                    devuelve = `${yy}-${mm}`
                    return devuelve;;
                case "anyo" :
                    devuelve = `${yy}`
                    return devuelve;
                default:
                    console.log( " Ponga dia , mes , año" );
            }
        }  

    } 
    return gasto;
}

function filtrarGastos(objeto){
    let fd;
    let fh;
    let vmin;
    let vmax;
    let desc;
    let etitiene;
    
    if(objeto.hasOwnProperty("fechaDesde"))
    {
        fd = objeto.fechaDesde;
        if(typeof(fd === "string") && (!isNaN(Date.parse(fd))))
        {
            fd = Date.parse(fd);
        }
        else
        {
            fd = undefined;
        }
    }
    
    if(objeto.hasOwnProperty("fechaHasta"))
    {
        fh = objeto.fechaHasta;
        if(typeof(fh === "string") && (!isNaN(Date.parse(fh))))
        {
            fh = Date.parse(fh);
        }
        else
        {
            fh = undefined;
        }
        // fh = objeto.fechaDesde;
        // if(!isNaN(Date.parse(fh)))
        // {
        //     fh = Date.parse(fh);
        // } 
    }
    if(objeto.hasOwnProperty("valorMinimo"))
    {
        vmin = objeto.valorMinimo;
    }
    if(objeto.hasOwnProperty("valorMaximo"))
    {
        vmax = objeto.valorMaximo;
    }
    if(objeto.hasOwnProperty("descripcionContiene"))
    {
        desc = objeto.descripcionContiene;
    }
    if(objeto.hasOwnProperty("etiquetasTiene"))
    {
        etitiene = objeto.etiquetasTiene;    
    }
    let result = gastos.filter(function(item){
        let devuelve = true;
    
        if(typeof fd === "undefined")
        {
            if(item.fecha < fd)
            {
                devuelve = false;
            }
        }
        if(typeof fh === "undefined")
        {
            if(item.fecha > fh)
            {
                devuelve = false;
            }
        }
        if(typeof vmax === "undefined")
        {
            if(vmax > item.valor)
            {
                devuelve = false;
            }
        }
        if(typeof vmin === "undefined")
        {
            if(vmin > item.valor)
            {
                devuelve = false;
            }
        }
        if(typeof desc === "undefined" && item.descripcion.includes(desc))
        {
            devuelve = false;
        }
        if(type of d)
            
        return devuelve
    });
    Console.log(JSON.stringify(gastosfiltrados))
    return result;
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);/*push para añadir al array al final, y el .pop sacas la ultima posi del array*/
}
function borrarGasto(idrandom){
    for(let i = 0; i < gastos.length; i++)
    {
        if(idrandom === gastos[i].id)
        {
            gastos.splice(i,1);/*igual al remove at*/ 
        }
    }
}
function agruparGastos(){

}
function calcularTotalGastos(){
    let acumulado = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        acumulado += gastos[i].valor;
    }
    return acumulado;
} 

function calcularBalance(){
    let result = 0;
    let TotalDeGastos = calcularTotalGastos();
    result = presupuesto - TotalDeGastos
    return result;
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
    agruparGastos,
    filtrarGastos
}
