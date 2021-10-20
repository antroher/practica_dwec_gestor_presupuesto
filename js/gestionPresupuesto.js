// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

var presupuesto='0';
var gastos=[];
var idGasto='0';


function actualizarPresupuesto(canti) {
    // TODO
    if (canti > -1)
    {
        return presupuesto = canti;
    }
    else
    {
        console.log("Error: ha introducido un valor negativo")
         return -1;
    }
}
function mostrarPresupuesto() {
    // TODO
    let x = "Tu presupuesto actual es de " + presupuesto + " €";
    return x;
}


function CrearGasto(descripcion, valor, fecha = Date.now(), ...etiqueta) 
{
    // TODO
    this.mostrarGasto=function()
    {
        return `Gasto ${this.descripcion} con valor ${this.valor} €`;
    }
    this.mostrarGastoCompleto=function()
    {
        
        let date = new Date(this.fecha);
        let txt_Fecha = date.toLocaleString();

        let txt_eti = "";
        for (let i = 0; i < this.etiquetas.length; i++) 
        {
            txt_eti += `- ${this.etiquetas[i]}\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${txt_Fecha}\nEtiquetas:\n${txt_eti}`;
    }
    this.actualizarDescripcion =function (actdescrip){
        this.descripcion=actdescrip;
    }

    this.actualizarValor=function(d1)
    {
        if ( !isNaN(d1) )
        {
			if ( d1 >=  0 )
            {
				this.valor=d1;
			}
		}
    }
    this.actualizar =function(d2){
        if ( !isNaN(d2) )
        {
            return this.valor=d2 < 0 ? 0:d2;
        }
        else 
        {
            return this.valor=0;
        }
    }
    //dato=d1 o d2
    this.FechaValida=function(fecha_string)
    {
        let fecha_ok=Date.parse(fecha_string);
        if ( isNaN(fecha_ok) )
        {
            fecha_ok=Date.now();
        }
        return fecha_ok;
    }
    
	this.actualizarFecha=function(fecha_string)
    {
		let fecha_ok=Date.parse(fecha_string);
		if ( !isNaN(fecha_ok) )
        {
			this.fecha=fecha_ok;
        }
	}

    this.anyadirEtiquetas=function(...valores)
    {
        for (let eti1 of valores)
        {
            if ( this.etiquetas.indexOf(eti1) == -1)
            {
                this.etiquetas.push(eti1);
            }
        }
    }
    this.borrarEtiquetas=function(...valores)
    {
        let ind=0;
        for (let d3 of valores)
        {
            ind=this.etiquetas.indexOf(d3)
            if ( ind !== -1) 
            {
                this.etiquetas.splice(ind,1);
            }
        }
    }
    this.obtenerPeriodoAgrupacion=function(...periodo)
    {  
            let fec;
            fec = new Date(this.fecha);// convierto en objeto fecha
           
            let cadena = '';
            switch (periodo) 
            {

                case 'dia'://aaaa-mm-dd
                {
                    let mes = fec.getMonth()<10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;//El método fec.getMonth() cuenta los meses del 0(Enero) al 11(Diciembre) lo que hacemos es decirle que a los meses menor que 10n les añada un 0 delante.
                    let dia = fec.getDate()<10 ? `0${fec.getDate()}` : `${fec.getDate()}`;
                        cadena = '' + fec.getFullYear() + '-' + mes + '-' + dia;
                        break;
                }
                case 'mes'://aaaa-mm
                {
                    let mes = fec.getMonth()<10 ? `0${fec.getMonth()+1}` : `${fec.getMonth()+1}`;
                    cadena = ''+ `${fec.getFullYear()}-` + mes;
                    break;
                }
                case 'anyo'://aaaa
                {
                    cadena = '' + fec.getFullYear();
                    break;
                }
                default:
                {
                    console.log("error");
                }
        
            return cadena;
        }

    }

    this.valor=this.actualizar(valor);
    this.descripcion=descripcion;
	this.fecha=this.FechaValida(fecha);
	this.etiquetas=etiqueta;
}
function listarGastos() 
{
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);


}
function borrarGasto(id)
{
    let ind = gastos.findIndex(gasto => gasto.id == id);
    if(ind !== -1)
    {
        gastos.splice(ind, 1);
    }

}

function calcularTotalGastos()
{
    let totalgas = 0;

    for (let i = 0; i < gastos.length; i++) 
    {
        
        totalgas = totalgas + gastos[i].valor;
    }
    return totalgas;

}

function calcularBalance()
{
    let gTotales = calcularTotalGastos();
    let bal = presupuesto - gTotales;
    return bal;
}

function filtrarGastos()
{
    let gTotales = calcularTotalGastos();
    let bal = presupuesto - gTotales;
    return bal;
}

function agruparGastos()
{
    let gTotales = calcularTotalGastos();
    let bal = presupuesto - gTotales;
    return bal;
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
