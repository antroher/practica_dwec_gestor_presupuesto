
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto= 0;
let gastos = [];
let idGasto= 0;


function actualizarPresupuesto(valor) {
    if(valor > 0){
        presupuesto = valor;
        return presupuesto;
    }else{
        console.log("El valor introducido es menor que 0.")
        return -1;
    }
}
function mostrarPresupuesto() {
    
    return "Tu presupuesto actual es de " + presupuesto + " €";
    
}
function CrearGasto(desc, val, fech, ...etiq) { 
    
    this.descripcion = desc;
    this.etiquetas = new Array();       
    this.valor = null;
    this.fecha = null;

    if(parseFloat(val) > 0) {
        this.valor = val;

    }
    else{
        this.valor = 0;
    }

    if(fech === undefined || isNaN(Date.parse(fech))){  

        this.fecha = new Date(Date.now()).toISOString().substring(0,16);
    }
    else{

        this.fecha = Date.parse(fech);

    }


    if(etiq !== undefined){

        this.etiquetas = etiq; 

    }

    this.mostrarGastoCompleto = function(){

        let res = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for(let i = 0; i < this.etiquetas.length; i++){

            res += "- " + this.etiquetas[i]+`\n`

        }

        return res;
        }
        
    

    this.mostrarGasto = function() {

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion_nueva){

        this.descripcion = descripcion_nueva;
    }

    this.actualizarValor = function(valor_nuevo){
        if(parseFloat(valor_nuevo) > 0){

            this.valor = valor_nuevo;
        }
    }
    this.actualizarFecha = function(fecha_nueva){
        if(!isNaN(Date.parse(fecha_nueva))){

            this.fecha = Date.parse(fecha_nueva);
        }
    }

    this.anyadirEtiquetas = function(...etiqueta_nueva){
        etiqueta_nueva.forEach(e => {
            if(!this.etiquetas.includes(e)){
                this.etiquetas.push(e);
            }
        });
    }

    this.borrarEtiquetas = function(...borrar_etiquetas){
        borrar_etiquetas.forEach(b => {

            if(this.etiquetas.includes(b)){

                this.etiquetas.splice(this.etiquetas.indexOf(b),1)
            }
        });
    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        switch(periodo){

            case "dia":
                return new Date(this.fecha).toISOString().substring(0, 10);
                
            case "mes":
                return new Date(this.fecha).toISOString().substring(0, 7);

            case "anyo":
                return new Date(this.fecha).toISOString().substring(0, 4);
        }
    }
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gastoPasado){

    gastoPasado.id = idGasto;
    gastos.push(gastoPasado);
    idGasto++;

}
function borrarGasto(idBorrar){
    gastos.forEach(g => {
        if(g.id == idBorrar){
            gastos.splice(gastos.indexOf(g),1);
        }
    });
}
function calcularTotalGastos(){
    let total_gastos = 0;
    gastos.forEach(g => {
        total_gastos += g.valor;
    });
    return total_gastos;

}
function calcularBalance(){
    let gastos_totales = calcularTotalGastos();
    return (presupuesto - gastos_totales)

}
function filtrarGastos(filt){
    if(filt !== undefined || Object.entries(filt != 0)){

        let gastosFiltrados = gastos.filter((gast) => {
            if (filt.hasOwnProperty("fechaDesde")) {

              if (gast.fecha < Date.parse(filt.fechaDesde)) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("fechaHasta")) {

              if (gast.fecha > Date.parse(filt.fechaHasta) ) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("valorMinimo")) {

              if (gast.valor < filt.valorMinimo) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("valorMaximo")) {

              if (gast.valor > filt.valorMaximo) {

                return;
              }
            }
      
            if (filt.hasOwnProperty("descripcionContiene")) {

              if (!gast.descripcion.includes(filt.descripcionContiene)) {

                return;
              }
            }
            if (filt.hasOwnProperty("etiquetasTiene") && filt.etiquetasTiene !== undefined) {

              if ( filt.etiquetasTiene.length != 0){

              let comprobado = false;
              for (let des of filt.etiquetasTiene) {

                if (gast.etiquetas.includes(des)) {

                  comprobado = true;
                }
              }
              if (!comprobado) {

                return;
              }
            }
          }
            return gast;
          });  

          if(gastosFiltrados.length === 0){

            return gastos;
        }else{

            return gastosFiltrados;
        }
    }
}
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) 
{
    let filtrar = {
        etiquetasTiene : etiquetas,
        fechaDesde : fechaDesde,
        fechaHasta : fechaHasta
        }

    let rtnFiltrarGastos = filtrarGastos(filtrar);

    let res =
            rtnFiltrarGastos.reduce((acc, item) => 
            {
                let key = item.obtenerPeriodoAgrupacion(periodo);

                if (acc[key] == null)
                {

                    acc[key] = item.valor;
                }
                else {
                    
                    acc[key] += item.valor;
                }
                return acc;
            }, {});

    return res;
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