'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
var presupuesto = 0;
var gastos = [];
var idGasto = 0;
// TODO: Variable global


    function actualizarPresupuesto(valores) {
        let DevolverValor = 0;
        if(valores < 0 || isNaN(valores))
        {
            console.log("Error numero negativo");
            DevolverValor = -1;
        }
        else
        {
            presupuesto = valores;
            DevolverValor = presupuesto;
        }
        return DevolverValor;
    }

    function mostrarPresupuesto() {
        return(`Tu presupuesto actual es de ${presupuesto} €` )

    }

function CrearGasto(descripcionIn,valorIn, fech = Date.now(), ...etiqueta) {

        if(valorIn < 0 || isNaN(valorIn)){
            valorIn = 0;
        }

       
       this.descripcion = descripcionIn,
        this.valor=parseFloat(valorIn),
        this.etiquetas= [...etiqueta], //El [] ES PARA CREAR EL ARRAY POR DEFECTO
        this.fecha= (typeof fech === "string") ? Date.parse(fech) : fech,

        this.mostrarGasto = function() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        this.actualizarDescripcion = function(NewDescripcion){
            this.descripcion = NewDescripcion;
        },
        this.actualizarValor = function(NewValor){
            if(NewValor >= 0)
            {
                this.valor= NewValor;
            }
        },
        this.mostrarGastoCompleto = function(){
            let espacioGasto = "";
            let FechNow = new Date(this.fecha);

                this.etiquetas.forEach((i) =>{
                    espacioGasto += `- ${i}\n`
            })

            let txtGasto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${FechNow.toLocaleString()}\nEtiquetas:\n${espacioGasto}`;

            console.log(txtGasto);
            return txtGasto;
        },
            this.actualizarFecha = function(inFecha){
                if(typeof inFecha !== "string" || isNaN(Date.parse(inFecha))){
                    return;
                }

                    this.fecha = Date.parse(inFecha);
            },
                this.anyadirEtiquetas = function(...NewEtiqueta){
                    for (let f = 0; f < NewEtiqueta.length; f++) {
                        if(this.etiquetas.includes(NewEtiqueta[f])) {
                            continue;
                        }
                        this.etiquetas.push(NewEtiqueta[f]);
                    }
                },
                    this.borrarEtiquetas = function(...DelEtiqueta){
                        for(let f = 0; f < DelEtiqueta.length; f++){
                            for(let i = 0; i < this.etiquetas.length;i ++){
                                if(DelEtiqueta[f] === this.etiquetas[i])
                                {
                                    this.etiquetas.splice(i,1)
                                }
                            }
                        }
                    },
                    this.obtenerPeriodoAgrupacion = function(periodo){
                        let devuelve = "";
                        let mostrarFecha = new Date(this.fecha);
                        let d = String(mostrarFecha.getDate()).padStart(2,'0')
                        let mm = String(mostrarFecha.getMonth()+1).padStart(2,'0')
                        let yyyy = String(mostrarFecha.getFullYear());
                        switch(periodo){
                            case "dia" :
                                devuelve = `${yyyy}-${mm}-${d}`;
                                return devuelve;
                            case "mes" :
                                devuelve = `${yyyy}-${mm}`;
                                return devuelve;
                            case "anyo" :
                                devuelve = `${yyyy}`
                                return devuelve;
                            default:
                                return `Error`;
                        }
                    }
}


function filtrarGastos(objetoDelGasto){
    //Primera comprobacion
    if(objetoDelGasto != undefined && objetoDelGasto !=null){  //Si el objetoDelGasto esta indefinido o es nulo que entre en el if, si no se va al else
        let gastosFil = gastos.filter((gasto)=>{
            if(objetoDelGasto.hasOwnProperty("fechaDesde")){
                if(gasto.fecha < Date.parse(objetoDelGasto.fechaDesde)){
                    return;
                }
            }
            if(objetoDelGasto.hasOwnProperty("fechaHasta")){
                if(gasto.fecha > Date.parse(objetoDelGasto.fechaHasta)){
                    return;
                }
            }
            if (objetoDelGasto.hasOwnProperty("valorMaximo")) {
                if (gasto.valor > objetoDelGasto.valorMaximo) {
                  return;
                }
              }
            if(objetoDelGasto.hasOwnProperty("valorMinimo")){
                if(gasto.valor < objetoDelGasto.valorMinimo){
                    return;
                }
            }
            if (objetoDelGasto.hasOwnProperty("descripcionContiene")) {

                if (!gasto.descripcion.includes(objetoDelGasto.descripcionContiene))
                        return;
    
            }
            if(objetoDelGasto.hasOwnProperty("etiquetasTiene") && Array.isArray(objetoDelGasto.etiquetasTiene)){
                if(objetoDelGasto.etiquetasTiene.length != 0){
                    let devu =false;

                    for(let descrip of objetoDelGasto.etiquetasTiene){
                        if(gasto.etiquetas.includes(descrip)){
                            devu = true;
                        }
                    }
                    if(!devu){
                        return;
                    }
                }
            }
            return gasto;
        });
        return gastosFil;
    }
    else{
        return gastos;
    }
}

        function listarGastos(){
            return gastos;
        }

            function anyadirGasto(gasto){
                gasto.id = idGasto
                idGasto ++
                gastos.push(gasto);
            }

            function borrarGasto(Idin){
                for(let i = 0; i < gastos.length; i++){
                    if(Idin === gastos[i].id)
                    {
                        gastos.splice(i,1);
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
                            let TotaldeGastos = calcularTotalGastos();

                            result = presupuesto - TotaldeGastos;

                            return result;
                        }


                               function agruparGastos(periodo = "mes", etiquetas = [],fechaDes,fechaHas) {
                                    let resFil =  filtrarGastos({fechaDesde: fechaDes, fechaHasta: fechaHas, etiquetasTiene: etiquetas});
                                    let gastAgrup = resFil.reduce(function(acumular,gasto){
                                        let obtPeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

                                        if(acumular.hasOwnProperty(obtPeriodo))
                                        {
                                            acumular[obtPeriodo] += gasto.valor;
                                        }
                                        else{
                                            acumular[obtPeriodo] = gasto.valor;
                                        }
                                        return acumular;
                                    },{});
                                  
                                    return gastAgrup;
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
