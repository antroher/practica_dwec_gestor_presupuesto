// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto = 0;
var gastos = new Array();
var idGasto = 0;

function actualizarPresupuesto(numero) {
    if(numero >= 0)
        presupuesto = numero;
    else
    {
        console.log("ERROR. Valor no valido");
        return -1;
    }
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiquetas) {
    if(valor <= 0 || isNaN(valor))
    {
        valor = 0;
    }   

    let gasto = {
        valor: valor,
        descripcion: descripcion,
        etiquetas: [...etiquetas],
        fecha: (typeof fecha === 'string') ? Date.parse(fecha) : fecha,
        mostrarGasto() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },

        actualizarDescripcion(NDescripcion) {
            this.descripcion = NDescripcion;
        },

        actualizarValor(NValor) {
            if(NValor > 0)
                this.valor = NValor;
        },

        anyadirEtiquetas(...Netiquetas){
            var contador = 0;
            for(var i = 0; i < Netiquetas.length; i++)
            {
                contador = this.etiquetas.indexOf(Netiquetas[i]);
                if(contador == -1)
                {
                    this.etiquetas.push(Netiquetas[i]);
                }                   
            }
        },

        borrarEtiquetas(...Netiquetas){
            var contador = 0;
            for(var i = 0; i < Netiquetas.length; i++)
            {
                contador = this.etiquetas.indexOf(Netiquetas[i]);
                if(contador != -1)
                {
                    this.etiquetas.splice(contador, 1);
                }                   
            }
        },

        mostrarGastoCompleto(){
            var fechaT = new Date(this.fecha);
            fechaT = fechaT.toLocaleString();
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaT}\nEtiquetas:\n- ${this.etiquetas[0]}\n- ${this.etiquetas[1]}\n- ${this.etiquetas[2]}\n`;
        },

        actualizarFecha(Newfecha = this.fecha){ 
            var Newfecha2 = Date.parse(Newfecha);
            if((typeof Newfecha === 'string') && Newfecha2)
                this.fecha = Newfecha2;
        },
        obtenerPeriodoAgrupacion(periodo){
            let fechaT = new Date(this.fecha);

            switch(periodo){
                case 'dia':{
                    if(fechaT.getDate() < 10)
                    {
                        if(fechaT.getMonth()+1 < 10)
                            return `${fechaT.getFullYear()}-0${fechaT.getMonth()+1}-0${fechaT.getDate()}`;
                        else
                            return `${fechaT.getFullYear()}-${fechaT.getMonth()+1}-0${fechaT.getDate()}`;
                    }                 
                    else 
                    {
                        if(fechaT.getMonth()+1 < 10)
                            return `${fechaT.getFullYear()}-0${fechaT.getMonth()+1}-${fechaT.getDate()}`;
                        else
                            return `${fechaT.getFullYear()}-${fechaT.getMonth()+1}-${fechaT.getDate()}`;
                    }
                    break;
                }               
                case 'mes':{
                    if(fechaT.getMonth()+1 < 10)
                        return `${fechaT.getFullYear()}-0${fechaT.getMonth()+1}`;
                    else
                        return `${fechaT.getFullYear()}-${fechaT.getMonth()+1}`;
                    break;
                }                  
                case 'anyo':{
                    return `${fechaT.getFullYear()}`;
                    break;
                }                
                default:{
                    return `Periodo no valido`;
                }                  
            }
        }
    }

    return gasto;
}

    function listarGastos(){
        return gastos;
    }

    function anyadirGasto(gasto){
        Object.defineProperty(gasto, 'id', {value: idGasto});
        idGasto = idGasto + 1;
        gastos.push(gasto);        
    }

    function borrarGasto(id){
        for(var i = 0; i < gastos.length; i++)
        {
            if(id == gastos[i].id)
            {
                gastos.splice(i, 1);
            }
        }
    }

    function calcularTotalGastos(){
        var totalGastos = 0;
        for(var i = 0; i < gastos.length; i++)
        {
            totalGastos = totalGastos + gastos[i].valor;
        }
        return totalGastos;
    }

    function calcularBalance(){
        var balance = 0;
        balance = presupuesto - calcularTotalGastos();
        return balance;
    }

    function filtrarGastos(param1PRO) {
        let resultado = Object.assign(gastos);
        if (typeof param1PRO === 'object' && param1PRO !== null && param1PRO !== undefined && Object.entries(param1PRO).length > 0) {
            if (param1PRO.hasOwnProperty('fechaDesde') && typeof param1PRO.fechaDesde === 'string') 
            {
                resultado = resultado.filter((variable) => { 
                    return variable.fecha >= (Date.parse(param1PRO.fechaDesde))
                })
            }
            if (param1PRO.hasOwnProperty('fechaHasta') && typeof param1PRO.fechaHasta === 'string') 
            {
                resultado = resultado.filter((variable) => {
                    return variable.fecha <= Date.parse(param1PRO.fechaHasta);
                })
            }
            if (param1PRO.hasOwnProperty('valorMinimo') && typeof param1PRO.valorMinimo === 'number') 
            {
                resultado = resultado.filter((variable) => {
                    return variable.valor >= param1PRO.valorMinimo
                })
            }
            if (param1PRO.hasOwnProperty('valorMaximo') && typeof param1PRO.valorMaximo === 'number') 
            {
                resultado = resultado.filter((variable) => {                
                    return variable.valor <= param1PRO.valorMaximo
                })
            }
            if (param1PRO.hasOwnProperty('descripcionContiene') && typeof param1PRO.descripcionContiene === 'string') 
            {
                resultado = resultado.filter((variable) => {
                    let var1able = (variable.descripcion).toLowerCase();
                    let var2able = (param1PRO.descripcionContiene).toLowerCase();
                    let arr1 = var1able.split(" ");
                    let arr1join = arr1.join('');
                    if (arr1join.indexOf(var2able) !== -1) 
                        return true;
                })
            }
            if (param1PRO.hasOwnProperty('etiquetasTiene') && Array.isArray(param1PRO.etiquetasTiene)) 
            {
                resultado = resultado.filter((variable) => {
                    for (let i = 0; i < param1PRO.etiquetasTiene.length; i++) {
                        if (param1PRO.etiquetasTiene.includes(variable.etiquetas[i])) {
                            return true;
                        }
                    }
                })
            }
            return resultado;
        }
        return gastos;
    }

    //                                      LA FUNCIÓN NO FUNCIONA CORRECTAMENTE (COPIADA DEL PROFESOR)
    // function filtrarGastos(param1PRO){
    //     let fd;
    //     let fh;
    //     let vM;
    //     let vMx;
    //     let dc;
    //     let eT;

    //     if(objeto.hasOwnProperty('fechaDesde'))
    //     {
    //         if(typeof objeto.fechaDesde === 'string')
    //         {
    //             if(isNaN(Date.parse(objeto.fechaDesde)))
    //                 fd = undefined;
    //             else
    //                 fd = Date.parse(objeto.fechaDesde);
    //         }               
    //     }

    //     if(objeto.hasOwnProperty('fechaHasta'))
    //     {
    //         if(typeof objeto.fechaHasta === 'string')
    //         {
    //             if(isNaN(Date.parse(objeto.fechaHasta)))
    //                 fh = undefined;
    //             else
    //                 fh = Date.parse(objeto.fechaHasta);
    //         }
    //     }

    //     if(objeto.hasOwnProperty('valorMinimo'))
    //     {
    //         vM = objeto.valorMinimo;
    //     }

    //     if(objeto.hasOwnProperty('valorMaximo'))
    //     {
    //         vMx = objeto.valorMaximo;
    //     }

    //     if(objeto.hasOwnProperty('descripcionContiene'))
    //     {
    //         dc = objeto.descripcionContiene;         
    //     }

    //     if(objeto.hasOwnProperty('etiquetasTiene'))
    //     {
    //         eT = [...objeto.etiquetasTiene];
    //     }

    //     let gastosfiltrados = gastos.filter(function(item)
    //     {
    //         let devuelve = true;
    //         let latiene = false;

    //         if(typeof fd !== 'undefined')
    //         {
    //             if(item.fecha < fd)
    //                 devuelve = false;                   
    //         }

    //         if(typeof fh !== 'undefined')
    //         {
    //             if(item.fecha > fh)
    //                 devuelve = false;                    
    //         }

    //         if(typeof vM !== 'undefined')
    //         {
    //             if(item.valor < vM)
    //                 devuelve = false;
    //         }

    //         if(typeof vMx !== 'undefined')
    //         {
    //             if(item.valor > vMx)
    //                 devuelve = false;
    //         }

    //         if(typeof dc !== 'undefined')
    //         {
    //             if(!item.descripcion.includes(dc))
    //                 devuelve = false;
    //         }
            
    //         if(typeof eT !== 'undefined' && Array.isArray(objeto.etiquetasTiene))
    //         {
    //             if(eT.length > 0)
    //             {
    //                 for(var i = 0; i < objeto.etiquetasTiene.length; i++)
    //                 {
    //                     if(objeto.etiquetasTiene.includes(item.etiquetas[i]))
    //                         latiene = true;
    //                 }
    //             }
    //         }
    //         else{
    //             latiene = true;
    //         }
    //         return devuelve && latiene;
    //         });    

    //     return gastosfiltrados;              
    // }

    function agruparGastos(periodo = 'mes', etiquetas, fd, fh){
        let filtrar = {etiquetasTiene: etiquetas, fechaDesde: fd, fechaHasta:fh};
        let subconj = filtrarGastos(filtrar);

        let reducido = subconj.reduce(function(acu, item){
            let per = item.obtenerPeriodoAgrupacion(periodo);
            if(!acu.hasOwnProperty(per)){
                acu[per] = 0;
            }
            else{
                if (isNaN(acu[per])){
                    acu[per] = 0;
                }
            }

            acu[per] = acu[per] + item.valor;

            return acu;
        }, {});

        return reducido;
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
