// Importar librería Chai para realizar aserciones
import {assert} from "chai";

// Importar código de la aplicación sobre la que se realizarán los tests
import {actualizarPresupuesto, mostrarPresupuesto, CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance} from '../js/gestionPresupuesto.js';

// Inicialización de la variable global gastos y función listarGastos
describe("Función listarGastos e inicialización de la variable global gastos", function() {
    it("Devuelve un array vacío si no hay gastos (valor por defecto)", function() {
        assert.isEmpty(listarGastos());
    });
});

// Función CrearGasto y funcionamiento de objeto gasto
describe("Función CrearGasto y funcionamiento de objeto gasto", function() {
    it("CrearGasto: comprobación con fecha y etiquetas", function() {

        let now = new Date();

        let descr = "Ejemplo de gasto";
        let gasto1 = new CrearGasto(descr);
        assert.equal(gasto1.descripcion, descr);
        assert.equal(gasto1.valor, 0);
        assert.equal(new Date(gasto1.fecha).getMonth(), now.getMonth());
        assert.equal(new Date(gasto1.fecha).getDate(), now.getDate());
        assert.isEmpty(gasto1.etiquetas, "Si el gasto se crea sin etiquetas, la propiedad 'etiquetas' debe inicializarse a un array vacío");

        let gasto2 = new CrearGasto(descr, 23.55);
        assert.equal(gasto2.descripcion, descr);
        assert.equal(gasto2.valor, 23.55);
        assert.equal(new Date(gasto2.fecha).getMonth(), now.getMonth());
        assert.equal(new Date(gasto2.fecha).getDate(), now.getDate());
        assert.isEmpty(gasto2.etiquetas);

        let gasto3 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z" );
        assert.equal(gasto3.descripcion, descr);
        assert.equal(gasto3.valor, 23.55);
        assert.equal(gasto3.fecha, Date.parse("2021-10-06T13:10Z"));
        assert.isEmpty(gasto3.etiquetas);

        let gasto4 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z", "casa" );
        assert.equal(gasto4.descripcion, descr);
        assert.equal(gasto4.valor, 23.55);
        assert.equal(gasto4.fecha, Date.parse("2021-10-06T13:10Z"));
        assert.lengthOf(gasto4.etiquetas,1);
        assert.equal(gasto4.etiquetas[0], "casa");

        let gasto5 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z", "casa", "supermercado" );
        assert.equal(gasto5.descripcion, descr);
        assert.equal(gasto5.valor, 23.55);
        assert.equal(gasto5.fecha, Date.parse("2021-10-06T13:10Z"));
        assert.lengthOf(gasto5.etiquetas,2);
        assert.equal(gasto5.etiquetas[0], "casa");
        assert.equal(gasto5.etiquetas[1], "supermercado");

        let gasto6 = new CrearGasto(descr, 23.55, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        assert.equal(gasto6.descripcion, descr);
        assert.equal(gasto6.valor, 23.55);
        assert.equal(gasto6.fecha, Date.parse("2021-10-06T13:10Z"));
        assert.lengthOf(gasto6.etiquetas,3);
        assert.equal(gasto6.etiquetas[0], "casa");
        assert.equal(gasto6.etiquetas[1], "supermercado");
        assert.equal(gasto6.etiquetas[2], "comida");

    });

    it("Método 'mostrarGastoCompleto' del objeto gasto", function() {
        let valor = 23.55;
        let fechalocale = new Date("2021-10-06T13:10Z").toLocaleString();
        let gasto1 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        assert.equal(gasto1.mostrarGastoCompleto(),
         `Gasto correspondiente a descripción del gasto con valor ${valor} €.
Fecha: ${fechalocale}
Etiquetas:
- casa
- supermercado
- comida
`);
    });

    it("Método 'actualizarFecha' del objeto gasto", function() {
        let orig = Date.parse("2021-10-06T13:10Z");
        let nueva = Date.parse("2021-11-11T13:10Z");
        let gasto1 = new CrearGasto("descripción del gasto", 23.55, "2021-10-06T13:10Z");
        gasto1.actualizarFecha("novalida");
        assert.equal(gasto1.fecha, orig, "Si la fecha no es válida, se debe dejar sin modificar.");
        gasto1.actualizarFecha("2021-11-11T13:10Z");
        assert.equal(gasto1.fecha, nueva, "Actualizar fecha si es válida.");
    });

    it("Método 'anyadirEtiquetas' del objeto gasto", function() {
        let valor = 44.55;
        let gasto1 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        gasto1.anyadirEtiquetas("nueva1");
        assert.lengthOf(gasto1.etiquetas,4);
        assert.equal(gasto1.etiquetas[0], "casa");
        assert.equal(gasto1.etiquetas[1], "supermercado");
        assert.equal(gasto1.etiquetas[2], "comida");
        assert.equal(gasto1.etiquetas[3], "nueva1");

        let gasto2 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z");
        assert.lengthOf(gasto2.etiquetas,0, "Un gasto sin etiquetas debe inicializar su propiedad 'etiquetas' a un array vacío");
        gasto2.anyadirEtiquetas("nueva1");
        assert.lengthOf(gasto2.etiquetas,1);
        assert.equal(gasto2.etiquetas[0], "nueva1");
        gasto2.anyadirEtiquetas("nueva2", "nueva3");
        assert.lengthOf(gasto2.etiquetas,3);
        assert.equal(gasto2.etiquetas[1], "nueva2");
        assert.equal(gasto2.etiquetas[2], "nueva3");
        gasto2.anyadirEtiquetas("nueva4", "nueva5", "nueva6", "nueva7", "nueva8");
        assert.lengthOf(gasto2.etiquetas,8);
        assert.equal(gasto2.etiquetas[3], "nueva4");
        assert.equal(gasto2.etiquetas[4], "nueva5");
        assert.equal(gasto2.etiquetas[5], "nueva6");
        assert.equal(gasto2.etiquetas[6], "nueva7");
        assert.equal(gasto2.etiquetas[7], "nueva8");
        // Duplicados
        gasto2.anyadirEtiquetas("nueva2");
        assert.lengthOf(gasto2.etiquetas,8, "Si las etiquetas ya existen no se deben añadir.");
        gasto2.anyadirEtiquetas("nueva2", "nueva9", "nueva3");
        assert.lengthOf(gasto2.etiquetas,9, "Si las etiquetas ya existen no se deben añadir: solo deben añadirse las que no existan previamente en el objeto gasto.");
        assert.equal(gasto2.etiquetas[8], "nueva9");
    });

    it("Método 'borrarEtiquetas' del objeto gasto", function() {
        let valor = 44.55;
        let gasto1 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        gasto1.borrarEtiquetas("supermercado");
        assert.lengthOf(gasto1.etiquetas,2);
        assert.equal(gasto1.etiquetas[0], "casa");
        assert.equal(gasto1.etiquetas[1], "comida");

        let gasto2 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        gasto2.borrarEtiquetas("supermercado", "casa");
        assert.lengthOf(gasto2.etiquetas,1);
        assert.equal(gasto2.etiquetas[0], "comida");

        let gasto3 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        gasto3.borrarEtiquetas("noexiste");
        assert.lengthOf(gasto3.etiquetas,3);
        gasto3.borrarEtiquetas("noexiste", "casa");
        assert.lengthOf(gasto3.etiquetas,2);
        assert.equal(gasto3.etiquetas[0], "supermercado");
        assert.equal(gasto3.etiquetas[1], "comida");

        let gasto4 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        gasto4.borrarEtiquetas("noexiste", "casa", "supermercado", "noexiste2", "comida");
        assert.lengthOf(gasto4.etiquetas,0, "Si se borran todas las etiquetas la propiedad etiquetas debe ser un array vacío");
    });
});


// Función anyadirGasto
describe("Función anyadirGasto", function() {
    it("Añade el gasto que se pasa como parámetro a la variable global 'gastos'", function() {
        let valor1 = 23.44,
            valor2 = 42.88,
            valor3 = 22.87;

        let gasto1 = new CrearGasto("descripción del gasto", valor1, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        let gasto2 = new CrearGasto("descripción del gasto", valor2, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        let gasto3 = new CrearGasto("descripción del gasto", valor3, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        assert.lengthOf(listarGastos(), 0);
        anyadirGasto(gasto1);
        assert.lengthOf(listarGastos(), 1);
        assert.equal(listarGastos()[0].id, 0, "Al añadir un gasto se le tiene que asignar un id que se irá incrementando");
        anyadirGasto(gasto2);
        assert.lengthOf(listarGastos(), 2);
        assert.equal(listarGastos()[1].id, 1, "Al añadir un gasto se le tiene que asignar un id que se irá incrementando");
        anyadirGasto(gasto3);
        assert.lengthOf(listarGastos(), 3);
        assert.equal(listarGastos()[2].id, 2, "Al añadir un gasto se le tiene que asignar un id que se irá incrementando");

    });
});

// Función borrarGasto
describe("Función borrarGasto", function() {
    it("Elimina de la variable global 'gastos' el gasto cuyo id se pasa como parámetro", function() {
        let valor4 = 98.43;

        let gasto4 = new CrearGasto("descripción del gasto", valor4, "2021-10-06T13:10Z", "eti1", "supermercado", "comida" );

        // Los 3 gastos que hemos añadido en el test anterior
        assert.lengthOf(listarGastos(), 3);

        borrarGasto(1);
        assert.lengthOf(listarGastos(), 2);
        assert.equal(listarGastos()[0].id, 0, "Al borrar un gasto deben quedar los que había antes");
        assert.equal(listarGastos()[1].id, 2, "Al borrar un gasto deben quedar los que había antes.");

        anyadirGasto(gasto4);
        assert.lengthOf(listarGastos(), 3);
        borrarGasto(0);
        assert.lengthOf(listarGastos(), 2);
        assert.equal(listarGastos()[0].id, 2, "Al borrar un gasto deben quedar los que había antes");
        assert.equal(listarGastos()[1].id, 3, "Al borrar un gasto deben quedar los que había antes.");
        assert.equal(listarGastos()[1].valor, valor4, "Al borrar un gasto deben quedar los que había antes");
        borrarGasto(2);
        borrarGasto(3);
        assert.lengthOf(listarGastos(), 0, "Al borrar todos los gastos debe quedar un array vacío");
    });
});


// Función calcularTotalGastos
describe("Función calcularTotalGastos", function() {
    it("Calcula la suma de todos los gastos presentes en la variable global 'gastos'", function() {
        let valor1 = 43,
            valor2 = 47.4,
            nuevovalor2 = 53.2,
            valor3 = 114.76;

        let gasto1 = new CrearGasto("descripción del gasto", valor1, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        let gasto2 = new CrearGasto("descripción del gasto", valor2, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        let gasto3 = new CrearGasto("descripción del gasto", valor3, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );

        anyadirGasto(gasto1);
        anyadirGasto(gasto2);
        anyadirGasto(gasto3);

        assert.equal(calcularTotalGastos(), valor1 + valor2 + valor3);

        gasto2.actualizarValor(nuevovalor2);
        assert.equal(calcularTotalGastos(), valor1 + nuevovalor2 + valor3);

        // Borramos gastos creados
        borrarGasto(4);
        borrarGasto(5);
        borrarGasto(6);
        assert.lengthOf(listarGastos(), 0, "Al borrar todos los gastos debe quedar un array vacío");

    });
});


// Función calcularBalance
describe("Función calcularBalance", function() {
    it("Calcula el balance (presupuesto - gastos totales) a partir de los gastos almacenados en la variable global 'gastos'", function() {

        let presupuesto = 1000,
            valor1 = 43,
            valor2 = 47,
            nuevovalor2 = 53,
            valor3 = 114;

        actualizarPresupuesto(presupuesto);

        let gasto1 = new CrearGasto("descripción del gasto", valor1, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        let gasto2 = new CrearGasto("descripción del gasto", valor2, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        let gasto3 = new CrearGasto("descripción del gasto", valor3, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );

        anyadirGasto(gasto1);
        anyadirGasto(gasto2);
        anyadirGasto(gasto3);

        assert.equal(calcularBalance(), presupuesto - valor1 - valor2 - valor3);
        gasto2.actualizarValor(nuevovalor2);
        assert.equal(calcularBalance(), presupuesto - valor1 - nuevovalor2 - valor3);

        // Borramos gastos creados
        borrarGasto(7);
        borrarGasto(8);
        borrarGasto(9);
    });

});
