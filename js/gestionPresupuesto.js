// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;
var gastos = [];
var IDGasto = 0;

    function actualizarPresupuesto(valorIntroducido) {
    // TODO
        
        if(valorIntroducido >= 0)
        {
            presupuesto = valorIntroducido;
            return presupuesto;
        }      
        else{
            console.log(`Error : -1. \n El valor introducido es negativo, pon uno positivo.`);
            return -1;
        }

    }

    function mostrarPresupuesto() {
        // TODO
        return`Tu presupuesto actual es de ${presupuesto} €`;
    }

    function CrearGasto(desc,numIntroducido,fecha = Date.now(),...etiq) {
        
        // TODO
        if(numIntroducido <= 0 || isNaN(numIntroducido)){
            numIntroducido = 0;
        }
            let gasto = {
                descripcion:desc,
                valor:numIntroducido,
                fecha : (typeof fecha === "string") ? Date.parse(fecha) : fecha,
                etiquetas : [...etiq],
            mostrarGasto(){
                return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
            },
            actualizarDescripcion(desc){
                this.descripcion = desc;
            },
            actualizarValor(numIntroducido){
                if(numIntroducido >= 0)
                    this.valor = parseFloat(numIntroducido); 
            },
            actualizarFecha(stringFecha){
                if(!isNaN(Date.parse(stringFecha)))              
                    this.fecha = Date.parse(stringFecha);           
            },
            anyadirEtiquetas (...etiquetas) {
               // let valoresUnicos = etiquetas.filter((x) => { // el .filter lo vamos a usar para generar un nuevo array con todos los elementos que cumplan con la condición que le hemos puesto.
               //     if (!this.etiquetas.includes(x))  // el . includes nos dice si el elemento (x) se encuentra dentro del array devolviendo true o false según corresponda.
               //         return x;                   
               // });
               // this.etiquetas.push(...valoresUnicos);

               for(let elem of etiquetas){  //Añadido y usando la lógica de clase ya que me resulta más simple.
                   if(!this.etiquetas.includes(elem))
                   this.etiquetas.push(elem);
               }
            }, 
            
            borrarEtiquetas (...etiquetas) {
                //etiquetas.forEach((x) => { // x es por cada etiqueta dentro del array etiquetas que le aplique la lógica utilizada.
                //    for (let i = 0; i < this.etiquetas.length; i++) {
                 //       if (this.etiquetas[i] === x) 
                //            this.etiquetas.splice(i, 1); // Cambia el contenido del array eliminando elementos existentes y añadimos otros nuevos.
                //        
                //    }
                //})
                
                for(let elem of etiquetas) //Lógica sacada en clase, voy a usar esta por comodidad y mejor comprensión.
                {
                    if(this.etiquetas.includes(elem))
                        this.etiquetas.splice(this.etiquetas.indexOf(elem),1);
                    }
                },
            mostrarGastoCompleto() {
                let fec1;
                    if(typeof this.fecha === 'string')                
                        fec1 = Date.parse(this.fecha);                  
                    else
                        fec1 = this.fecha;                    
                let aux = "";
                    for(let etiqueta of this.etiquetas) { // Sacamos todas las etiquetas con --> for (let ... of...) Iteramos un array con un objecto creado para ir variando su valor en este caso etiqueta va a coger el valor de cada etiqueta en cada repetición.
                        aux += `- ${etiqueta}\n`;
                    };        
                let fec2 = new Date(fec1);   
                let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fec2.toLocaleString())}\nEtiquetas:\n`;
                return texto + aux;
            },
            obtenerPeriodoAgrupacion(periodo) {
                let fec;
                fec = new Date(this.fecha);

                let cadena = "";

                switch(periodo) {
                    case 'dia' : { //aaaa-mm-dd
                        let mes = fec.getMonth()<10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`; //Concatenamos el 0 seguido de la variable porque el test quiere tener dos dígitos en mes y dia (por si sale algún mes o día menor que 10).
                        let dia = fec.getDate()<10 ? `0${fec.getDate()}` : `${fec.getDate()}`;
                        cadena = '' + fec.getFullYear() + '-' + mes + '-' + dia;
                        break;
                    }

                    case 'mes' : { // aaaa-mm
                        let mes = fec.getMonth()<10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                        cadena = '' + fec.getFullYear() + '-' + mes;
                        break;
                    }
                    case 'anyo' : { // aaaa
                        cadena = '' + fec.getFullYear();
                        break;
                    }
                    default : {
                        break;
                    }

                }
                return cadena;
            }
            
        }

        return gasto;

    }

    function listarGastos() {

            return gastos;
    }

    function anyadirGasto(gasto) {
        gasto.id = IDGasto;
        IDGasto++;
        gastos.push(gasto);
    }

    function borrarGasto(IDGasto) {
            gastos.forEach(x => {
                if(x.id == IDGasto )           
                gastos.splice(gastos.indexOf(x),1); // El splice es lo que explicó antonio en clase pero tengo que volver a preguntarle el funcionamiento.     
            })
          
        
    }

    function calcularTotalGastos(){
        let sumaGastos = 0;

        gastos.forEach((x) => sumaGastos += x.valor); // Iteramos sobre la lista de gastos con el método forEach en el que x va ir valiendo en cada repetición el valor de cada gasto y luego simplemente acumulamos el número del parámetro --> gasto.valor <-- en una variable auxiliar.

        return sumaGastos;    
        
    }

    function calcularBalance() {
        let totalGastos = calcularTotalGastos();

        let balance = presupuesto - totalGastos;

        return balance;
    }

    function filtrarGastos(objetoGasto) {
        if (objetoGasto != undefined && objetoGasto != null && Object.entries(objetoGasto).length != 0) 
        {
          let gastosFiltrados = gastos.filter((gasto) => {
            if (objetoGasto.hasOwnProperty('fechaDesde')) {
              if (gasto.fecha < Date.parse(objetoGasto.fechaDesde)) {
                return;
              }
            }
      
            if (objetoGasto.hasOwnProperty("fechaHasta")) {
              if (gasto.fecha > Date.parse(objetoGasto.fechaHasta) ) {
                return;
              }
            }
      
            if (objetoGasto.hasOwnProperty("valorMinimo")) {
              if (gasto.valor < objetoGasto.valorMinimo) {
                return;
              }
            }
      
            if (objetoGasto.hasOwnProperty("valorMaximo")) {
              if (gasto.valor > objetoGasto.valorMaximo) {
                return;
              }
            }
      
            if (objetoGasto.hasOwnProperty("descripcionContiene")) {
              if (!gasto.descripcion.includes(objetoGasto.descripcionContiene)) {
                return;
              }
            }
            if (objetoGasto.hasOwnProperty("etiquetasTiene")) {
              if (objetoGasto.etiquetasTiene.length != 0){
                    let devuelve = false;

              for (let descripcion of objetoGasto.etiquetasTiene) {
                    if (gasto.etiquetas.includes(descripcion)) {
                        devuelve = true;
                }
              }

              if (!devuelve) {
                return;
              }

            }

          }

            return gasto;
            
          });
      
          return gastosFiltrados;
      
            } else 
            return gastos;
          
      }   

    function agruparGastos() {

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
