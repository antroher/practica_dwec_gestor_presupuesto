import { threadId } from "worker_threads";

/*
1. (1’25 puntos) Crea un tipo de objeto que sirva para representar ordenadores (función constructora objeto Ordenador)

Sus propiedades son los nombres en minúsculas en negrita:

-marca, un texto

-modelo, un texto

-memoria ram, un nº que indica GB de capacidad

-Capacidad de disco duro, un nº que indica TB de capacidad

-pulgadas de pantalla, un nº que indica pulgadas.

----------------------------------------------------------------------------------------------------------------------------------------------------------
2. (1’25 puntos) Métodos del objeto Ordenador:

-toString, sirve para obtener en forma de texto los detalles del ordenador

Al crear un ordenador se pueden indicar todos los valores, pero por defecto (sin ser obligado indicarlos) se toman como valores 
17 pulgadas, 2TB de disco duro y 16 GB de RAM. La marca y el modelo sí es necesario especificarlos.

----------------------------------------------------------------------------------------------------------------------------------------------------------
3. (1’25 puntos) Crear otro tipo de objeto (función constructora) que represente ordenadores portátiles, los cuales heredan todo de los 
ordenadores (prototipos) pero añaden una propiedad llamada autonomía (autonomia), que es un número que expresa horas. Se construye este objeto igual
 que los ordenadores, pero pudiendo añadir la autonomía (por defecto 4 horas). Por defecto, en los portátiles las pulgadas son 12 y el disco duro 1TB. 
 Su método toString deberá mostrar además la autonomía.

----------------------------------------------------------------------------------------------------------------------------------------------------------
4. (0'5 puntos) Declara 3 ordenadores de la siguiente forma:

let o1 = new Ordenador("HP","Pavilion", 32, 2,24);

let o2 = new Ordenador("Apple", "iMac",16,1,24);

let p1 = new Portatil("Acer", "S1");

----------------------------------------------------------------------------------------------------------------------------------------------------------
5. (0'5 puntos) Crea una variable global que será un array para contener ordenadores, y añádelos ahí.

----------------------------------------------------------------------------------------------------------------------------------------------------------

6. Basándote en la página página.html, se quiere mostrar el listado de ordenadores, así:



La página ya tiene el código html necesario, sólo tienes que incluir en ella el script con examen.js con el añadido type=”module”.

En las siguientes funciones no hace falta realizar filtrados para no perder tiempo:

(1’25 puntos) Función muestraWeb(), función que en el id “listadopc”:

Añadirá un encabezado h3 con el texto “ORDENADORES DISPONIBLES”

Añadirá un elemento de lista ordenada

irá añadiendo mediante bucle cada elemento del array de ordenadores dentro de la lista ordenada. Se recomienda añadir un id “autonumérico” 
a cada uno de los ordenadores insertados, y un salto de línea para cada ordenador o elemento.

----------------------------------------------------------------------------------------------------------------------------------------------------------
FUNCIONES MANEJADORAS DE LOS BOTONES
(2 puntos) Función anyademe:

Función manejadora del botón “Añadir pc”, que pedirá por prompt los datos necesarios para crear un ordenador nuevo y tras ello se añadirá al array de 
ordenadores global. Piensa como mostrar ahora el nuevo elemento

----------------------------------------------------------------------------------------------------------------------------------------------------------
(2 puntos) Función borrame:

Función manejadora del botón “Borrar pc”, que eliminará el pc con el número introducido por el usuario mediante prompt. 
Si se cancela el prompt NO BORRARÁ NADA.
*/

var arr = [];

function Ordenador(marca, modelo, ram = 16, disco = 2, pulgadas = 17) 
{
this.marca = marca;
this.modelo = modelo;
this.ram = ram;
this. disco = disco;
this.pulgadas = pulgadas;
    this.toString = function() {
        return `MARCA: ${this.marca} MODELO: ${this.modelo} RAM: ${this.ram} DISCO: ${this.disco} PULGADAS: ${this.pulgadas}`;
    }
}

function Portatil(marca, modelo, ram = 16, disco = 1, pulgadas = 12, autonomia = 4)
{
    this.__proto__ = new Ordenador(marca, modelo, ram, disco, pulgadas);
    this.autonomia = autonomia;
        this.toString = function(){
            return `${this.__proto__.toString()} AUTONOMIA: ${this.autonomia}`;
        }
}

let o1 = new Ordenador("HP","Pavilion", 32, 2,24);

let o2 = new Ordenador("Apple", "iMac",16,1,24);

let p1 = new Portatil("Acer", "S1");

arr.push(o1,o2,p1);

function muestraWeb()
{

    let midiv = document.querySelector('#listadopc');
    midiv.innerHTML = '';
    midiv.innerHTML = '<h3> ORDENADORES DISPONIBLES </h3>';
    let ol = document.createElement('ol');

        let i = 0;
        for (let elem of arr){
            let li = document.createElement('li');
            li.id = i;
            li.textContent = elem.toString();
            li.innerHTML += '<br>';
            ol.append(li);
            i++; 
        }
    midiv.append(ol);
}

let botonAnyade = document.querySelector('#anyadepc');
let botonBorra = document.querySelector('#borra');

botonAnyade.addEventListener('click',Anyademe);
botonBorra.addEventListener('click',Borrame);

function Anyademe(){
    let portSob;
    do{
    portSob = prompt('Dime si es portÃ¡til o sobremesa (p) (s)');
    if (portSob === null)
        return;
    }while (portSob !=="p" && portSob !== "s")

    let nuevoOrdenador;

    let ma = prompt('Dime la marca');
        if (ma === null)
        return;
    let mo = prompt('Dime el modelo');
    if (mo === null)
        return;
    let ram = prompt('Dime la ram');
    if (ram === null)
        return;
    let dd = prompt('Dime el disco duro');
    if (dd === null)
        return;
    let pulg = prompt('Dime las pulgadas')
    if (pulg === null)
        return;
    if (portSob === 'p'){
      let autonomia = prompt('Dime la autonomÃ­a');
        nuevoPortatil = new Portatil(ma,mo,ram,dd,pulg,autonomia);
    }
    if (portSob === 's'){
        nuevoOrdenador = new Ordenador(ma,mo,ram,dd,pulg);
    }
    arr.push(nuevoOrdenador)

    muestraWeb();

}

function Borrame(){

    let num;
    do{
    num = prompt('Dime el nÂº del ordenador a borrar');

    if (num === null)
        return;

    }while(num <=0 || num > arr.length);

    arr.splice(num-1,1);

    muestraWeb();

}

muestraWeb();