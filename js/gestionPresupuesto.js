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

     //Valor1 = a lo que introduce la funcion, y lo asigna a valor, para que forme parte del objeto(pq si no salen errores en el nmp)
        this.descripcion = descripcion1,
        this.valor = valor1,
        this.etiquetas = [...etiquetas],// el [] es porque si no tienes ninguna etiquetas creas el array  como por defecto
        this.fecha = (typeof fechaIn === "string") ? Date.parse(fechaIn) : fechaIn,//si es un string lo converte en fecha en milisegundos

        this.mostrarGasto = function(){
            console.log("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €")
            return("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
        
        },
        this.actualizarDescripcion = function(newdescripcion){
            this.descripcion = newdescripcion;
        },
        this.actualizarValor = function(newvalor){
            if(newvalor < 0 || isNaN(newvalor))
            {
                console.log("El valor que has metido no es correcto, ponga un número positivo")
            }
            else
            {
                this.valor = newvalor;
            }
        },
        this.mostrarGastoCompleto = function(){
            let cadenavacia = "";
            let fecha = new Date(this.fecha);
            cadenavacia += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fecha.toLocaleString()}\nEtiquetas:\n`
            for(let i = 0;i < this.etiquetas.length;i++){
                cadenavacia += `- ${this.etiquetas[i]}\n`
            }
            console.log(cadenavacia);
            return cadenavacia;            
        },
        this.actualizarFecha = function(fechaEntrada){
            if(typeof fechaEntrada === "string" && !isNaN(Date.parse(fechaEntrada)))
            {
                let fechaStamp = Date.parse(fechaEntrada);
                this.fecha = fechaStamp;
            }
        },
        this.anyadirEtiquetas = function(...nuevaEtiquetas){

            for(let i = 0; i < nuevaEtiquetas.length; i++)
            {
                if(!this.etiquetas.includes(nuevaEtiquetas[i]))
                {
                    this.etiquetas.push(nuevaEtiquetas[i]);
                }
            }
        },
       this.borrarEtiquetas = function(...borradorEtiquetas){
            borradorEtiquetas.forEach((DelEtiqueta) => {
                this.etiquetas.forEach((PropiaEtiqueta, index) => {
                    if (DelEtiqueta === PropiaEtiqueta) {
                        this.etiquetas.splice(index, 1);
                    }
                })
            })
        },
        this.obtenerPeriodoAgrupacion = function(periodo){
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
    
};  
function filtrarGastos(objeto) {
    if (objeto != undefined || objeto != null) 
    {
        let devuelve = gastos.filter(item => {
            if (objeto.hasOwnProperty("fechaDesde")) 
            {
                if (item.fecha < Date.parse(objeto.fechaDesde)) 
                    return;
            }
            if (objeto.hasOwnProperty("fechaHasta")) 
            {
                if (item.fecha > Date.parse(objeto.fechaHasta)) 
                    return;
            }
            if (objeto.hasOwnProperty("valorMinimo")) 
            {
                if (item.valor < objeto.valorMinimo) 
                    return;
            }
            if (objeto.hasOwnProperty("valorMaximo")) 
            {
                if (item.valor > objeto.valorMaximo)
                    return;
            }
            if (objeto.hasOwnProperty("descripcionContiene")) 
            {
            if (!item.descripcion.includes(objeto.descripcionContiene))
                return;
            }
            if (objeto.hasOwnProperty("etiquetasTiene") && Array.isArray(objeto.etiquetasTiene)) 
            {
                if (objeto.etiquetasTiene.length != 0)
                {
                    let resu = false;

                    for (let descripcion of objeto.etiquetasTiene) 
                        if (item.etiquetas.includes(descripcion)) 
                            resu = true;   
                    if (!resu) 
                        return;
                }
            }
            return item;
        });
            return devuelve;
    } 
    else 
        return gastos;
};   

function agruparGastos(periodo = "mes", etiquetas = [], fechaDes, fechaHas=Date.now()) {
    let resultfil = filtrarGastos({fechaDesde: fechaDes, fechaHasta:fechaHas, etiquetasTiene: etiquetas});
    let agrupacionDeGastos = resultfil.reduce(function(acumulador, item)
    {
        let periodo2 = item.obtenerPeriodoAgrupacion(periodo);

        if (acumulador.hasOwnProperty(periodo2))
        {
            if(!isNaN(acumulador[periodo2]))
            {
                acumulador[periodo2] += item.valor;
            }
        }
        else
        {
            acumulador[periodo2] = item.valor;
        }
        return acumulador;
    }, {});   
    return agrupacionDeGastos;
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
