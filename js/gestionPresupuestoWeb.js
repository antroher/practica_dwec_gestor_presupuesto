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


function mostrarGastoWeb(idElemento, gasto) 
{
    let elemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    elemento.append(divGasto);
    divGasto.innerHTML += 
    `
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div> 
        <div class="gasto-valor">${gasto.valor}</div> 
    `;
                        
    let gEtiqs = document.createElement("div");
    gEtiqs.className = "gasto-etiquetas";
    divGasto.append(gEtiqs);

    for (let etiq of gasto.etiquetas) {
        
        let NOEtiq = new BorrarEtiquetasHandle(); 
        NOEtiq.gasto = gasto;

        
        let gEtiq = document.createElement("span");
        gEtiq.className = "gasto-etiquetas-etiqueta";
        gEtiq.innerHTML = etiq + "<br>";
        NOEtiq.etiqueta = etiq;

        
        gEtiqs.append(gEtiq);

        
        gEtiq.addEventListener('click',NOEtiq);
    }

    let btnEdit = document.createElement("button");
                        btnEdit.className += 'gasto-editar'
                        btnEdit.textContent = "Editar";
                        btnEdit.type = 'button';

    let btnBorrar = document.createElement("button");
                        btnBorrar.className += 'gasto-borrar'
                        btnBorrar.textContent = "Borrar";
                        btnBorrar.type = 'button';

    let edit = new EditarHandle();
    let delet = new BorrarHandle();
    edit.gasto = gasto;
    delet.gasto = gasto;
    
    btnEdit.addEventListener('click', edit);
    btnBorrar.addEventListener('click', delet);
  
    
    divGasto.append(btnEdit);
    divGasto.append(btnBorrar);

    let btnBorrarGastoApi = document.createElement("button");
                            btnBorrarGastoApi.className += 'gasto-borrar-api';
                            btnBorrarGastoApi.textContent = 'Borrar (API)';
                            btnBorrarGastoApi.type = 'button';

    let objBorrarGastoApi = new BorrarGastoApiHandle();
    objBorrarGastoApi.gasto = gasto;
    btnBorrarGastoApi.addEventListener("click", objBorrarGastoApi);

    divGasto.append(btnBorrarGastoApi);


    let btnEditGastoForm = document.createElement("button");
                            btnEditGastoForm.className += 'gasto-editar-formulario';
                            btnEditGastoForm.textContent = 'Editar (formulario)';
                            btnEditGastoForm.type = 'button';

    let editForm = new EditarHandleformulario();
    editForm.gasto = gasto;

    btnEditGastoForm.addEventListener('click', editForm);

    divGasto.append(btnEditGastoForm);  
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
                    backgroundColor: "#555555",
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
    
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let lGastos = gestionPresupuesto.listarGastos();
    for(let gasto of lGastos)
    {
    mostrarGastoWeb("listado-gastos-completo", gasto);
    }

    let pDia = "dia";
    let gDia = gestionPresupuesto.agruparGastos(pDia);
    mostrarGastosAgrupadosWeb("agrupacion-dia", gDia, "día");

    let pMes = "mes";
    let gMes = gestionPresupuesto.agruparGastos(pMes);
    mostrarGastosAgrupadosWeb("agrupacion-mes", gMes, "mes");

    let pAnyo = "anyo";
    let gAnyo = gestionPresupuesto.agruparGastos(pAnyo);
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gAnyo, "año");


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
        let MNVal = parseFloat(form.elements["formulario-filtrado-valor-minimo"].value);
        let MXVal = parseFloat(form.elements["formulario-filtrado-valor-maximo"].value);
        let fDesde = form.elements["formulario-filtrado-fecha-desde"].value;
        let fHasta = form.elements["formulario-filtrado-fecha-hasta"].value;
        let etiq = form.elements["formulario-filtrado-etiquetas-tiene"].value;
        
        if (etiq !== undefined) {
            etiq = gestionPresupuesto.transformarListadoEtiquetas(etiq);
        }
        let gFilter = ({fechaDesde : fDesde, fechaHasta : fHasta, valorMinimo : MNVal, valorMaximo : MXVal, descripcionContiene : descrip, etiquetasTiene : etiq});
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

function CargarGastosApi() 
{
    let usuario = document.querySelector("#nombre_usuario").value;
    let url = `https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`;
    
    if (usuario != '') 
    {
        fetch(url, {method: 'GET'})
            .then(respuesta => respuesta.json())
            .then((result) => {
                let resultado = result;
                if(resultado == "") 
                {
                    console.log("No se encuentran gastos en la API")
                } 
                else 
                {
                    gestionPresupuesto.cargarGastos(resultado);
                    console.log("CargasGastosApi")
                    repintar();
                }
                })
            .catch(err => console.error(err));
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

    let NObjeto = {
        descripcion: descrip,
        fecha: fec,
        valor: val,
        etiquetas: etiq
    }

    console.log(NObjeto);

    if(usuario == "")
    {
        console.log("El input del nombre de usuario esta vacio");
    }
    
    else
    {
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(NObjeto),
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
    
        let NObjeto = {
            descripcion: descrip,
            fecha: fec,
            valor: val,
            etiquetas: etiq
        }

        if(usuario == ""){
            console.log("El input del nombre de usuario esta vacio");
        } else {
            fetch(url, {
                method: 'PUT', 
                body: JSON.stringify(NObjeto),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                
                if(response.ok){
                    console.log("Peticion de modificacion correcta");
                    CargarGastosApi();
                }else{
                    console.log("Peticion de modificacion incorrecta");
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