import * as gestionPresupuesto from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);
let erFiltrar = new filtrarGastosWeb();
document.getElementById("formulario-filtrado").addEventListener("submit", erFiltrar);
let guardar = new guardarGastosWeb();
let cargar = new cargarGastosWeb(); 
document.getElementById("guardar-gastos").addEventListener('click', guardar);
document.getElementById("cargar-gastos").addEventListener('click', cargar);
//API
document.getElementById("cargar-gastos-api").addEventListener('click', CargarGastosApi);


function mostrarDatoEnId(idElemento, valor) 
{
    let elemento = document.getElementById(idElemento);
    let parrafo = document.createElement("p");
    parrafo.textContent = valor;
    elemento.appendChild(parrafo);
}


function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento); 
    
    let divGasto = document.createElement('div');
    divGasto.className += 'gasto';

    let texto = "<h2> Presupuesto </h2>";                                                                          

    let divPresupuesto = document.createElement('div');
    divPresupuesto.className = 'presupuesto';

    let divGPresup = document.createElement('div');
    divGPresup.className = 'presupuesto';
    divGPresup.textContent = texto;

    let divDescrip  = document.createElement('div');
    divDescrip.className = 'gasto-descripcion'; 
    divDescrip.textContent = gasto.descripcion;

    let divFec   = document.createElement('div');
    divFec.className = 'gasto-fecha'; 
    divFec.textContent = new Date(gasto.fecha).toLocaleDateString();
    
    let divVal  = document.createElement('div');
    divVal.className = 'gasto-valor'; 
    divVal.textContent = gasto.valor + '';
    
    let divEtiq = document.createElement('div');
    divEtiq.className = 'gasto-etiquetas'; 

    elem.append(divGasto);
    divGasto.append(divDescrip);
    divGasto.append(divFec);
    divGasto.append(divVal);
    divGasto.append(divPresupuesto);

    gasto.etiquetas.forEach(label =>
        {
            let borrarEtiquetas = new BorrarEtiquetasHandle();
            borrarEtiquetas.gasto = gasto;
            borrarEtiquetas.etiqueta = label;
            
            let span = document.createElement('span');
            span.className = 'gasto-etiquetas-etiqueta';
            span.textContent = label + '';  
            if(idElemento == "listado-gastos-completo"){
                span.addEventListener("click", borrarEtiquetas);
            }

            divEtiq.append(span);   
                 
        });
    
    
    divGasto.append(divEtiq);
    
     // boton editar
    let btnEditar = document.createElement('button');
    btnEditar.className = 'gasto-editar';
    btnEditar.type = 'button';
    btnEditar.textContent = 'Editar';

    // evento editar
    let evento_editar = new EditarHandle();
    evento_editar.gasto = gasto;
    btnEditar.addEventListener('click', evento_editar);    

    // boton borrar
    let btnBorrar = document.createElement('button');
    btnBorrar.className = 'gasto-borrar';
    btnBorrar.type = 'button';
    btnBorrar.textContent = 'Borrar';

    // evento borrar API
    let evBorrarAPI = new BorrarGastoApiHandle();
    evBorrarAPI.gasto = gasto;

    // boton borrar API
    let btnBorrarAPI = document.createElement("button");
    btnBorrarAPI.className = "gasto-borrar-api";
    btnBorrarAPI.type = "button";
    btnBorrarAPI.textContent = "Borrar (API)";
    btnBorrarAPI.addEventListener('click', evBorrarAPI);

    // evento borrar
    let ev_borrar = new BorrarHandle();
    ev_borrar.gasto = gasto;
    btnBorrar.addEventListener('click', ev_borrar);
    
    //boton editar form
    let btnEditarFormulario=document.createElement("button");
    btnEditarFormulario.className="gasto-editar-formulario";
    btnEditarFormulario.type="button";
    btnEditarFormulario.textContent="Editar Form";

    // evento editar form
    let evEditarForm = new EditarHandleformulario();
    evEditarForm.gasto=gasto;
    evEditarForm.boton=btnEditarFormulario;
    evEditarForm.elem= divGasto;
    btnEditarFormulario.addEventListener("click",evEditarForm);

    btnEditarFormulario.addEventListener("click", evEditarForm);

    if(idElemento == "listado-gastos-completo"){
        divGasto.append(btnEditar);
        divGasto.append(btnBorrar);
        divGasto.append(btnEditarFormulario);
        divGasto.append(btnBorrarAPI)
 
    } 
}    
function mostrarGastosAgrupadosWeb( idElemento, agrup, periodo )
{
    // Crea dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro

    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código
    var divP = document.getElementById(idElemento);
    // Borrar el contenido de la capa para que no se duplique el contenido al repintar
    divP.innerHTML = "";
        

        let arrayAgrup = "";


        for( let [nombre, valor] of Object.entries( agrup ) ){
            arrayAgrup += `
                <div class="agrupacion-dato">
                    <span class="agrupacion-dato-clave">${nombre}</span>
                    <span class="agrupacion-dato-valor">${valor}</span>
                </div>
            `;
        }


        divP.innerHTML = `
            <div class="agrupacion">
                <h1>Gastos agrupados por ${periodo}</h1>
                ${arrayAgrup}
            </div>
        `;

    // Estilos
    divP.style.width = "33%";
    divP.style.display = "inline-block";
    // Crear elemento <canvas> necesario para crear la gráfica
    // https://www.chartjs.org/docs/latest/getting-started/
    let chart = document.createElement("canvas");
    // Variable para indicar a la gráfica el período temporal del eje X
    // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
    let unit = "";
    switch (periodo) {
    case "anyo":
        unit = "year";
        break;
    case "mes":
        unit = "month";
        break;
    case "dia":
    default:
        unit = "day";
        break;
    }

    // Creación de la gráfica
    // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
    const myChart = new Chart(chart.getContext("2d"), {
        // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
        type: 'bar',
        data: {
            datasets: [
                {
                    // Título de la gráfica
                    label: `Gastos por ${periodo}`,
                    // Color de fondo
                    backgroundColor: "#33E9FF",
                    // Datos de la gráfica
                    // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                    data: agrup
                }
            ],
        },
        options: {
            scales: {
                x: {
                    // El eje X es de tipo temporal
                    type: 'time',
                    time: {
                        // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                        unit: unit
                    }
                },
                y: {
                    // Para que el eje Y empieza en 0
                    beginAtZero: true
                }
            }
        }
    });
    // Añadimos la gráfica a la capa
    divP.append(chart);
}

function repintar()
{
    document.getElementById("presupuesto").innerHTML="";
    document.getElementById("gastos-totales").innerHTML="";
    document.getElementById("balance-total").innerHTML="";
   
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());
   
    document.getElementById("listado-gastos-completo").innerHTML = "";
    gestionPresupuesto.listarGastos().forEach(p => {
        mostrarGastoWeb("listado-gastos-completo", p);
    });

    document.getElementById("listado-gastos-filtrado-1").innerHTML="";
    gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}).forEach(pr => {
        mostrarGastoWeb("listado-gastos-filtrado-1",pr);
    });

    document.getElementById("listado-gastos-filtrado-2").innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMinimo: 50}).forEach(pr => {
        mostrarGastoWeb("listado-gastos-filtrado-2", pr);
    });

    document.getElementById("listado-gastos-filtrado-3").innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]}).forEach(pr => {
        mostrarGastoWeb("listado-gastos-filtrado-3", pr);
    });

    document.getElementById("listado-gastos-filtrado-4").innerHTML = "";
    gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida" , "transporte"]}).forEach(pr => {
        mostrarGastoWeb("listado-gastos-filtrado-4", pr);
    });

    document.getElementById("agrupacion-dia").innerHTML="";
    mostrarGastosAgrupadosWeb("agrupacion-dia", gestionPresupuesto.agruparGastos("dia"), "día");

    document.getElementById("agrupacion-mes").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-mes", gestionPresupuesto.agruparGastos("mes"), "mes");

    document.getElementById("agrupacion-anyo").innerHTML = "";
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionPresupuesto.agruparGastos("anyo"), "año");

}



function actualizarPresupuestoWeb() 
{
    let presupuesto = parseFloat(prompt("Introduzca un presupuesto: "))
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb()
{
    let descrip = prompt("Introduce la descripción del gasto");
    let v1 = parseFloat(prompt("Introduce el valor del gasto"));
    let fec = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd");
    let etiq = prompt("Introduce las etiquetas del gasto separadas por ,");
    let etiquetas= etiq.split(',');
    let gAnyadido = new gestionPresupuesto.CrearGasto(descrip,v1,fec,...etiquetas);
    gestionPresupuesto.anyadirGasto(gAnyadido);
    repintar();
  }



function EditarHandle() 
{
    this.handleEvent = function (event)
    {
        let descrip = prompt("Introduce la nueva descripción del gasto");
        let v1 = parseFloat(prompt("Introduce la nueva valor del gasto"));
        let fec = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd");
        let etiq = prompt("Introduce las etiquetas del gasto separadas por ,");
        let etiquetas = etiq.split(',');
        this.gasto.actualizarValor(v1);
        this.gasto.actualizarDescripcion(descrip);
        this.gasto.actualizarFecha(fec);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle() 
{
    this.handleEvent = function()
    {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() 
{
    this.handleEvent = function ()
    {
    this.gasto.borrarEtiquetas(this.etiqueta);
    repintar();
   }
}

function nuevoGastoWebFormulario() 
{
    
    let pFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var form = pFormulario.querySelector("form");
    
    let divControlesPrincipales = document.getElementById("controlesprincipales")
    divControlesPrincipales.appendChild(form);
    let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").setAttribute("disabled", "");
    
    
    let SendObj = new EnviarGastoFormHandle();
    form.addEventListener('submit', SendObj);
    
    let cancelObj = new CancelarFormHandle();
    let btnCancel = form.querySelector("button.cancelar");
    btnCancel.addEventListener("click", cancelObj);

    let apiEnviar = form.querySelector("button.gasto-enviar-api");
    apiEnviar.addEventListener("click", EnviarGastoApi);
}

function CancelarFormHandle() 
{
    this.handleEvent = function (event)
    {
        event.currentTarget.parentNode.remove();
        let btnAnyadirGastoForm = document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
        repintar();
    }
}



function EnviarHandle()
{
    this.handleEvent = function(event)
    {
        
        event.preventDefault();
        
        let form = event.currentTarget;
        let descrip = form.elements.descripcion.value;
        this.gasto.actualizarDescripcion(descrip);
        let v1 = parseFloat(form.elements.valor.value);
        this.gasto.actualizarValor(v1);
        let fec = form.elements.fecha.value;
        this.gasto.actualizarFecha(fec);
        let etiq = form.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(etiq);
        repintar();
    }
}

function EnviarGastoFormHandle()
{
    this.handleEvent = function(e)
    {
        e.preventDefault();
         let form = e.currentTarget;
         let descrip = form.elements.descripcion.value;
         let v1 = parseFloat(form.elements.valor.value);
         let fec = form.elements.fecha.value;
         let etiq = form.elements.etiquetas.value;
        let gNuevo = new gestionPresupuesto.CrearGasto(descrip, v1, fec, etiq);
        gestionPresupuesto.anyadirGasto(gNuevo);
        repintar();
        document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
    }
}


function EditarHandleformulario() 
{
    this.handleEvent = function (event)
    {

        let pFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
        var form = pFormulario.querySelector("form");
        
        let divControlesPrincipales = document.getElementById("controlesprincipales")
        divControlesPrincipales.appendChild(form);
       
        let btnEditarFormulario = event.currentTarget;
        btnEditarFormulario.appendChild(form);
        form.elements.descripcion.value  = this.gasto.descripcion;
        form.elements.valor.value = this.gasto.valor;
        form.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        form.elements.etiquetas.value = this.gasto.etiquetas;

        
        let EditarFormHandle1 = new EnviarHandle();
        EditarFormHandle1.gasto = this.gasto;
        form.addEventListener('submit', EditarFormHandle1);
        
        let btnCancel = form.querySelector("button.cancelar");
        let cancelObj = new CancelarFormHandle();
        btnCancel.addEventListener("click", cancelObj);

        
        btnEditarFormulario.setAttribute("disabled", "");

        let editarFormularioApi = form.querySelector("button.gasto-enviar-api");
        let eventEditar = new EditarGastoApi();
        eventEditar.gasto = this.gasto;
        editarFormularioApi.addEventListener("click", eventEditar);
    }
}

function filtrarGastosWeb() 
{
    this.handleEvent = function(event) 
    {
        event.preventDefault();
        let form = event.currentTarget;
        let descrip = form.elements["formulario-filtrado-descripcion"].value;
        let mnVal = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let mxVal = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let fDesde = form.elements["formulario-filtrado-fecha-desde"].value;
        let fHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiq = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        
        if (etiq !== undefined) {
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }
        let gFilter = ({fechaDesde : fDesde, fechaHasta : fHasta, valorMinimo : mnVal, valorMaximo : mxVal, descripcionContiene : descrip, etiquetasTiene : etiq});
        let gFiltradosForm = gestionPresupuesto.filtrarGastos(gFilter);
        document.getElementById("listado-gastos-completo").innerHTML = " ";
        for (let gForm of gFiltradosForm) {
            mostrarGastoWeb("listado-gastos-completo", gForm);
        }
    }
}

function guardarGastosWeb() 
{
    this.handleEvent = function(event) 
    {
        let lGastos = gestionPresupuesto.listarGastos();
        localStorage.GestorGastosDWEC = JSON.stringify(lGastos);
    }
}

function cargarGastosWeb() 
{
    this.handleEvent = function(event) 
    {
        if (localStorage.GestorGastosDWEC == null) 
            gestionPresupuesto.cargarGastos([]);
        else 
            gestionPresupuesto.cargarGastos(JSON.parse(localStorage.GestorGastosDWEC));
        repintar();    
    }
}

function CargarGastosApi(){
    let usuario = document.getElementById('nombre_usuario').value;

    if(usuario != '')
    {
        let url =  `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;

        fetch(url, {

            method: "GET",
        })
        .then(response => response.json())

        .then(function(gastosAPI)
        {

            gestionPresupuesto.cargarGastos(gastosAPI);
            repintar();
        })
        .catch(err => alert(err));
    }else
    {
        alert('No has introducido usuario');
    }
}

function BorrarGastoApiHandle()
{
    
    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;

        if (usuario == "") 
        {
            console.log("Input vacío sin nombre");
        } 
        else 
        {
            fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .then(datos => {
                if(!datos.errorMessage)
                {
                    CargarGastosApi();
                } 
                else 
                {
                    console.log(datos.errorMessage);
                }
            })
            .catch(err => console.error(err));
        }
    }
}

function EnviarGastoApi(event)
{
    let usuario = document.getElementById("nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
    let form = event.currentTarget.form;
    let descrip = form.elements.descripcion.value;
    let val = form.elements.valor.value;
    let fec = form.elements.fecha.value;
    let etiq = form.elements.etiquetas.value;

    val = parseFloat(val);
    etiq = etiq.split(",");

    let nObjeto = {
        descripcion: descrip,
        fecha: fec,
        valor: val,
        etiquetas: etiq
    }

    console.log(nObjeto);

    if(usuario == "")
    {
        console.log("Nombre de usuario vacio");
    }
    
    else
    {
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(nObjeto),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            
            if(response.ok)
            {
                console.log("Añadido Correctamente");
                CargarGastosApi();
            }
            
            else
            {
                console.log("Añadido Incorrectamente");
            }
        })
        .catch(err => console.error(err));
    }
}

function EditarGastoApi()
{

    this.handleEvent = function(event){
        let usuario = document.getElementById("nombre_usuario").value;
        let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`;
        
        let form = event.currentTarget.form;
        let descrip = form.elements.descripcion.value;
        let val = form.elements.valor.value;
        let fec = form.elements.fecha.value;
        let etiq = form.elements.etiquetas.value;

        val = parseFloat(val);
        etiq = etiq.split(",");
    
        let nObjeto = {
            descripcion: descrip,
            fecha: fec,
            valor: val,
            etiquetas: etiq
        }

        if(usuario == ""){
            console.log("Nombre de usuario vacio");
        } else {
            fetch(url, {
                method: 'PUT', 
                body: JSON.stringify(nObjeto),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                
                if(response.ok){
                    console.log("Modificacion correcta");
                    CargarGastosApi();
                }else{
                    console.log("Modificacion INcorrecta");
                }
            })
            .catch(err => console.error(err));
        }
    }
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}