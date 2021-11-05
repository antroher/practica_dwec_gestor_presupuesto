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
        let texto;
        texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return texto;
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
    this.obtenerPeriodoAgrupacion=function(periodo)
    {  
            let fec;
            fec = new Date(this.fecha);// convierto en objeto fecha
           
            let yyyy=String(fec.getFullYear());
            
            let mm=String(fec.getMonth()+1).padStart(2,0);
            
            let dd=String(fec.getDate()).padStart(2,0);
           
            let cadena = '';
            
            switch (periodo) 
            {

                case 'dia'://aaaa-mm-dd
                {
                        cadena = `${yyyy}-${mm}-${dd}`;
                        break;
                }
                case 'mes'://aaaa-mm
                {
                    cadena = `${yyyy}-${mm}`;
                    break;
                }
                case 'anyo'://aaaa
                {
                    cadena = `${yyyy}`;
                    break;
                }
                default:
                {
                    console.log("error");
                }
        
           
        }
        return cadena;
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

function filtrarGastos(objfil)
{
    let res = Object.assign(gastos);
    if (typeof objfil === 'object' && objfil !== null && objfil !== undefined && Object.entries(objfil).length > 0) 
    {
        if (Object.hasOwn(objfil, 'fechaDesde') && typeof objfil.fechaDesde === 'string') {
            res = res.filter((aux) => {
                return aux.fecha >= (Date.parse(objfil.fechaDesde))
            })
        }
        if (Object.hasOwn(objfil, 'fechaHasta') && typeof objfil.fechaHasta === 'string') {
            res = res.filter((aux) => {
                return aux.fecha <= Date.parse(objfil.fechaHasta);
            })
        }
        if (Object.hasOwn(objfil, 'valorMinimo') && typeof objfil.valorMinimo === 'number') {
            res = res.filter((aux) => {
                return aux.valor >= objfil.valorMinimo
            })
        }
        if (Object.hasOwn(objfil, 'valorMaximo') && typeof objfil.valorMaximo === 'number') {
            res = res.filter((aux) => {                
                return aux.valor <= objfil.valorMaximo
            })
        }
        if (Object.hasOwn(objfil, 'descripcionContiene') && typeof objfil.descripcionContiene === 'string') 
        {
            res = res.filter((aux) => 
            {
                let a1 = (aux.descripcion).toLowerCase();
                let a2 = (objfil.descripcionContiene).toLowerCase();
                let b1 = a1.split(" ");
                let a1join = b1.join('');
                if (a1join.indexOf(a2) !== -1) 
                    return true;
            })
        }
        if (Object.hasOwn(objfil, 'etiquetasTiene') && Array.isArray(objfil.etiquetasTiene)) 
        {
            res = res.filter((aux) => {
                for (let i = 0; i < objfil.etiquetasTiene.length; i++) 
                {
                    if (objfil.etiquetasTiene.includes(aux.etiquetas[i])) 
                    {
                        return true;
                    }
                }
            })
        }
        return res;
    }
    return gastos;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) 
{
    let funfil = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let rtnFiltrarGastos = filtrarGastos(funfil);
    let agrupar =
            rtnFiltrarGastos.reduce((acc, item, index, rtnFiltrarGastos) => 
            {
                let periRed = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[periRed] == null)
                {
                    acc[periRed] = item.valor;
                }     
                else 
                {
                    acc[periRed] += item.valor;
                }
                return acc;
            }, {});
    return agrupar;
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
