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
        return `Tu presupuesto actual es de ${presupuesto} €`;
    }

    function CrearGasto(des, v, fec=Date.now(), ...etiq){
        if((parseFloat(v)<0) || isNaN(v))
            v=0;
    
            this.descripcion=des;
            this.valor=v;
            this.fecha=(typeof fec==='string') ? Date.parse(fec) : fec;
            this.etiquetas=etiq;
    
            this.mostrarGasto=function(){
                return 'Gasto correspondiente a '+this.descripcion+' con valor '+this.valor+' €';
            };
            this.actualizarDescripcion=function(des){
                this.descripcion=des;
            },
            this.actualizarValor=function(val){
                if(parseFloat(val)>0)
                this.valor=val;  
            };
            this.mostrarGastoCompleto=function(){
                let fec;
                    if(typeof this.fecha === 'string')                
                        fec = Date.parse(this.fecha);                  
                    else
                        fec = this.fecha;                    
                let aux = "";
                    for(let elem of this.etiquetas) { 
                        aux += `- ${elem}\n`;
                    };        
                let fecN = new Date(fec);   
                let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${(fecN.toLocaleString())}\nEtiquetas:\n`;
                return texto + aux;
            };
            this.actualizarFecha=function(fec){
                fec=Date.parse(fec);
                if(!isNaN(fec))
                this.fecha=fec;
            };
            this.anyadirEtiquetas=function(...etiq){
                for(let elem of etiq)
                {
                    if(!this.etiquetas.includes(elem))
                    this.etiquetas.push(elem);
                }
            };
            this.borrarEtiquetas=function(...etiq){
                for(let elem of etiq)
                {
                    if(this.etiquetas.includes(elem))
                    {
                        this.etiquetas.splice(this.etiquetas.indexOf(elem),1);
                    }
                }
            };
            this.obtenerPeriodoAgrupacion=function(periodo){
                let a = new Date(this.fecha), texto="";
                switch(periodo){
                    case "dia":{
                        let m=a.getMonth()+1<10 ? `0${a.getMonth()+1}` : `${a.getMonth()+1}`;
                        let d=a.getDate()<10 ? `0${a.getDate()}` : `${a.getDate()}`;
                            texto=a.getFullYear() + '-' + m + '-' + d; //aaaa-mm-dd
                            break;
                    }
                    case "mes":{
                        let m=a.getMonth()+1<10 ? `0${a.getMonth()+1}` : `${a.getMonth()+1}`;
                            texto=a.getFullYear() + '-' + m; //aaaa-mm
                            break;
                    }
                    case "anyo":{
                            texto=a.getFullYear(); //aaaa
                            break;
                    }
                    default:{
                        console.log("Error, el formato de la cadena introducida no es valido.");
                    }
                }
                return texto;
            };
    
    }              
               
               
                /* let fec; --> ME DA ERRORES ESTA FUNCION obtenerPeriodoAgrupacion
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
    }*/
    /*------------------------------COMPROBACIÓN */

    
let gasto1 = new CrearGasto("Gasto 1", 23.55, "2021-09-06", "casa", "supermercado" );
let gasto2 = new CrearGasto("Gasto 2", 27.55, "2021-11-24", "casa", "supermercado", "comida" );

gasto1.obtenerPeriodoAgrupacion("mes");
// Resultado: "2021-09"
gasto1.obtenerPeriodoAgrupacion("anyo");
// Resultado: "2021"
gasto1.obtenerPeriodoAgrupacion("dia");
// Resultado: "2021-09-06"

gasto2.obtenerPeriodoAgrupacion("mes");
// Resultado: "2021-11"
gasto2.obtenerPeriodoAgrupacion("anyo");
// Resultado: "2021"
gasto2.obtenerPeriodoAgrupacion("dia");
// Resultado: "2021-11-24"

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
                gastos.splice(gastos.indexOf(x),1);
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
        if (objetoGasto != undefined && objetoGasto != null) /*Corregir Primer Error del test Cannot convert undefined or null object*/
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

                if (!gasto.descripcion.includes(objetoGasto.descripcionContiene))
                        return;

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



  /*  function agruparGastos(periodo = "mes",fechaD,fechaH = Date.now(),etiq = []) { ME ESTÁ DANDO PROBLEMAS Y NO CONSIGO ARREGLARLO
        let today = new Date();
        let dd = String(today.getDate()).padStart(2,'0');
        let mm = String(today.getMonth() + 1).padStart(2,'0');
        let yyyy = today.getFullYear();

        let objetoGasto = {};

        if((typeof fechaD !== 'string')|| isNaN((Date.parse(fechaD)))|| typeof fechaD == "undefined")
            fechaD = ""
        else
            objetoGasto.fechaDesde = fechaD;

        if((typeof fechaH !== 'string')|| isNaN((Date.parse(fechaH)))|| typeof fechaH == "undefined")
        {
            fechaH = `${yyyy}-${mm}-${dd}`;
            objetoGasto.fechaHasta = fechaH;
        }
        else
            objetoGasto.fechaHasta = fechaH;
    
            
        let subconjG = filtrarGastos({fechaDesde:fechaD,fechaHasta:fechaH,etiquetasTiene:etiq});

        let reducido = subconjG.reduce(function(acu,item) {
            let periodoAgrup = item.obtenerPeriodoAgrupacion(periodo);

            if(acu.hasOwnProperty(periodo))
                acu[periodoAgrup] += item.valor;

            else
                acu[periodoAgrup] = item.valor;
                           
            return acu
        },{});
        return reducido;
    }
*/
   function agruparGastos(periodo = "mes", etiquetas = [], fechaDes, fechaHas=Date.now()) { //Obtenido gracias a ayuda de compañero ya que me estaba dando errores con los formatos de las fechas.
        let ResultadoFiltros = filtrarGastos({fechaDesde: fechaDes, fechaHasta:fechaHas, etiquetasTiene: etiquetas});
        let gastosAgrupados = ResultadoFiltros.reduce(function(acumulador, item)
        {
            let periodoA = item.obtenerPeriodoAgrupacion(periodo);
    
            if (acumulador.hasOwnProperty(periodoA))
                acumulador[periodoA] += item.valor;
            else     
                acumulador[periodoA] = item.valor;
            
            return acumulador
            }, {});
    
        return gastosAgrupados;
    }
  
    //Ejercicio 8------
    function cargarGastos(gastosAlmacenamiento) {
        // gastosAlmacenamiento es un array de objetos "planos"
        // No tienen acceso a los métodos creados con "CrearGasto":
        // "anyadirEtiquetas", "actualizarValor",...
        // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
      
        // Reseteamos la variable global "gastos"
        gastos = [];
        // Procesamos cada gasto del listado pasado a la función
        for (let g of gastosAlmacenamiento) {
            // Creamos un nuevo objeto mediante el constructor
            // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
            // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
            let gastoRehidratado = new CrearGasto();
            // Copiamos los datos del objeto guardado en el almacenamiento
            // al gasto rehidratado
            // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
            Object.assign(gastoRehidratado, g);
            // Ahora "gastoRehidratado" tiene las propiedades del gasto
            // almacenado y además tiene acceso a los métodos de "CrearGasto"
              
            // Añadimos el gasto rehidratado a "gastos"
            gastos.push(gastoRehidratado)
        }
    }

    function transformarListadoEtiquetas(eti){

        let a = eti.match(/\w+/g); // AYUDA DE COMPAÑERO Buscar bien el funcionamiento
    
        return a;
    
    }

    filtrarGastos({});
    filtrarGastos({fechaDesde: "2021-10-10"});
    filtrarGastos({fechaDesde: "2021-10-10", fechaHasta: "2021-10-15"});
    filtrarGastos({valorMinimo: 10});
    filtrarGastos({valorMinimo: 10, valorMaximo: 50});
    filtrarGastos({fechaDesde: "2021-10-10", fechaHasta: "2021-10-15", valorMaximo: 100});
    filtrarGastos({descripcionContiene: "carne", valorMinimo: 10, valorMaximo: 50});
    filtrarGastos({valorMaximo: 50, etiquetasTiene: ["alimentacion"]});
    filtrarGastos({etiquetasTiene: ["alimentacion", "gasolina"]});
    filtrarGastos({etiquetasTiene: ["alimentacion", "gasolina"], fechaDesde: "2021-10-10"});
    filtrarGastos({etiquetasTiene: ["alimentacion", "gasolina"], fechaHasta: "2020-12-31", valorMaximo: 200});

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
    agruparGastos,
    cargarGastos,
    transformarListadoEtiquetas

}
