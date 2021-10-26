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
        console.log(`Tu presupuesto actual es de ${presupuesto} €`)
        return(`Tu presupuesto actual es de ${presupuesto} €` )

    }

function CrearGasto(descripcionIn,valorIn, fech = Date.now(), ...etiqueta) {
        
        if(valorIn < 0 || isNaN(valorIn)){
            valorIn = 0;
        }

    let gasto = {
        descripcion:descripcionIn,
        valor:parseFloat(valorIn),
        etiquetas: [...etiqueta], //El [] ES PARA CREAR EL ARRAY POR DEFECTO
        fecha: (typeof fech === "string") ? Date.parse(fech) : fech,

         mostrarGasto() {
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        },

        actualizarDescripcion(NewDescripcion){
            gasto.descripcion = NewDescripcion;
        },
        actualizarValor(NewValor){
            if(NewValor >= 0)
            {
                gasto.valor= NewValor;
            }
        },
        mostrarGastoCompleto: function(){
            let espacioGasto = "";
            let FechNow = new Date(this.fecha);

                this.etiquetas.forEach((i) =>{
                    espacioGasto += `- ${i}\n`
            })

            let txtGasto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${FechNow.toLocaleString()}\nEtiquetas:\n${espacioGasto}`;

            console.log(txtGasto);
            return txtGasto;
        },
            actualizarFecha:function(inFecha){
                if(typeof inFecha !== "string" || isNaN(Date.parse(inFecha))){
                    return;
                } 

                    this.fecha = Date.parse(inFecha);
            },
                anyadirEtiquetas(...NewEtiqueta){
                    for (let f = 0; f < NewEtiqueta.length; f++) {
                        if(this.etiquetas.includes(NewEtiqueta[f])) {
                            continue;
                        }
                        this.etiquetas.push(NewEtiqueta[f]);
                    }
                },
                    borrarEtiquetas(...DelEtiqueta){
                        for(let f = 0; f < DelEtiqueta.length; f++){
                            for(let i = 0; i < this.etiquetas.length;i ++){
                                if(DelEtiqueta[f] === this.etiquetas[i])
                                {
                                    this.etiquetas.splice(i,1)
                                }
                            }
                        }
                    },
                    obtenerPeriodoAgrupacion(periodo){
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
    return gasto;
}

function filtrarGastos(objeto){
    let fD;
    let fH;
    let valMin;
    let valMax;
    let desCon;
    let etiTie;

    if(objeto.hasOwnProperty("fechaDesde"))
    {
        fD = objeto.fechaDesde;
        if(typeof(objeto.fechaDesde === "string") && !isNaN(date.parse(objeto.fechaDesde)))
        {
            fD = Date.parse(objeto.fechaDesde);
        }
        else{
            fD = undefined
        }
    }
    if(objeto.hasOwnProperty("fechaHasta"))
    {
        fH = objeto.fechaHasta;
        if(!isNaN(Date.parse(fH)) || typeof(objeto.fechaHasta === "string"))
        {
            fH = Date.parse(objeto.fechaHasta);
        } 
        else{
            fH = undefined;
        }
    }
    if(objeto.hasOwnProperty("valorMinimo"))
    {
        valMin = objeto.valorMinimo;
    }
    if(objeto.hasOwnProperty("valorMaximo"))
    {
        valMax = objeto.valorMaximo;
    }
    if(objeto.hasOwnProperty("descripcionContiene"))
    {
        desCon = objeto.descripcionContiene;
    }
    if(objeto.hasOwnProperty("etiquetasTiene")){etiTie=objeto.etiquetasTiene}


    /*FILTRADO*/

    let results = gastos.filter(function(item){
        // Si devuelve true el elemento es ingresado ak¡l array y la iteración
        //Si ada es encontrado, devuelve un array vacio
        let devuelve = true;
        
        if(typeof fD !== "undefined")
            if(item.fecha < fD)
                devuelve = false;
    
                if(typeof fH !== "undefined")
            if(item.fecha > fH)
                devuelve = false;
    
                if(item.includes(descr)){
                    devuelve = true;
                }
                    if(item.includes(etiTie)){
                        devuelve = true
                    }
        return devuelve;
    });
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
    agruparGastos,
    filtrarGastos
    
}
