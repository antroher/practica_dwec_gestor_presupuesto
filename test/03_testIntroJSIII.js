// Importar librería Chai para realizar aserciones
import {assert, expect} from "chai";

// Importar código de la aplicación sobre la que se realizarán los tests
import {CrearGasto, anyadirGasto, filtrarGastos, agruparGastos} from '../js/gestionPresupuesto.js';

// Función CrearGasto y funcionamiento de objeto gasto
describe("Función CrearGasto y funcionamiento de objeto gasto", function() {
    it("Método 'obtenerPeriodoAgrupacion' del objeto gasto", function() {
        let gasto1 = new CrearGasto("Gasto 1", 23.55, "2021-09-06", "casa", "supermercado" );
        let gasto2 = new CrearGasto("Gasto 2", 27.55, "2021-11-24", "casa", "supermercado", "comida" );

        assert.equal(gasto1.obtenerPeriodoAgrupacion("mes"), "2021-09");
        assert.equal(gasto1.obtenerPeriodoAgrupacion("anyo"), "2021");
        assert.equal(gasto1.obtenerPeriodoAgrupacion("dia"), "2021-09-06");

        assert.equal(gasto2.obtenerPeriodoAgrupacion("mes"), "2021-11");
        assert.equal(gasto2.obtenerPeriodoAgrupacion("anyo"), "2021");
        assert.equal(gasto2.obtenerPeriodoAgrupacion("dia"), "2021-11-24");
    });

});


// Función filtrarGastos
describe("Función filtrarGastos", function() {
    it("Filtra los gastos (variable global 'gastos') de acuerdo con los parámetros pasados a la función", function() {
        let valor1 = 23.44,
            valor2 = 12.88,
            valor3 = 22.80,
            valor4 = 62.22,
            valor5 = 304.75,
            valor6 = 195.88;

        let gasto1 = new CrearGasto("Compra carne", valor1, "2021-10-06", "casa", "comida" );
        let gasto2 = new CrearGasto("Compra fruta y verdura", valor2, "2021-09-06", "supermercado", "comida" );
        let gasto3 = new CrearGasto("Bonobús", valor3, "2020-05-26", "transporte" );
        let gasto4 = new CrearGasto("Gasolina", valor4, "2021-10-08", "transporte", "gasolina" );
        let gasto5 = new CrearGasto("Seguro hogar", valor5, "2021-09-26", "casa", "seguros" );
        let gasto6 = new CrearGasto("Seguro coche", valor6, "2021-10-06", "transporte", "seguros" );
        anyadirGasto(gasto1);
        anyadirGasto(gasto2);
        anyadirGasto(gasto3);
        anyadirGasto(gasto4);
        anyadirGasto(gasto5);
        anyadirGasto(gasto6);


        assert.lengthOf(filtrarGastos({}), 6, "Si se pasa un objeto vacío a 'filtrarGastos', se deben devolver todos los gastos que haya.");
        assert.lengthOf(filtrarGastos({fechaDesde: "2021-09-26"}), 4, "La opción 'fechaDesde' no funciona correctamente.");
        assert.lengthOf(filtrarGastos({fechaDesde: "2021-09-15", fechaHasta: "2021-10-06"}), 3, "Las opciones 'fechaDesde' o 'fechaHasta' no funcionan correctamente.");
        assert.lengthOf(filtrarGastos({valorMinimo: 60}), 3, "La opción 'valorMinimo' no funciona correctamente.");
        assert.lengthOf(filtrarGastos({valorMinimo: 20, valorMaximo: 100}), 3, "Las opciones 'valorMinimo' o 'valorMaximo' no funcionan correctamente.");
        assert.lengthOf(filtrarGastos({fechaDesde: "2021-09-15", fechaHasta: "2021-10-06", valorMaximo: 150}), 1, "Las opciones 'fechaDesde', 'fechaHasta' o 'valorMaximo' no funcionan correctamente.");
        assert.lengthOf(filtrarGastos({descripcionContiene: "Seguro", valorMinimo: 10, valorMaximo: 200}), 1, "Las opciones 'descripcionContiene', 'valorMinimo' o 'valorMaximo' no funcionan correctamente.");
        assert.lengthOf(filtrarGastos({etiquetasTiene: ["comida", "gasolina"]}), 3, "La opción 'etiquetasTiene' no funciona correctamente.");
        assert.lengthOf(filtrarGastos({valorMaximo: 50, etiquetasTiene: ["transporte"]}), 1, "Las opciones 'valorMaximo' o 'etiquetasTiene' no funcionan correctamente.");
        assert.lengthOf(filtrarGastos({etiquetasTiene: ["comida", "gasolina"], fechaDesde: "2021-10-06"}), 2, "Las opciones 'fechaDesde' o 'etiquetasTiene' no funcionan correctamente.");
        assert.lengthOf(filtrarGastos({etiquetasTiene: ["transporte", "comida"], fechaHasta: "2020-12-31", valorMaximo: 200}), 1, "Las opciones 'fechaHasta', 'valorMaximo' o 'etiquetasTiene' no funcionan correctamente.");

    });
});

// Función agruparGastos
describe("Función agruparGastos", function() {
    it("Realiza una agrupación de gastos por períodos temporales", function() {

        // Los gastos están añadidos en el test anterior
        let valor1 = 23.44,
            valor2 = 12.88,
            valor3 = 22.80,
            valor4 = 62.22,
            valor5 = 304.75,
            valor6 = 195.88;

        let agrup1 = agruparGastos("mes");
        assert.lengthOf(Object.keys(agrup1), 3, "La opción de agrupar por mes no funciona.");
        expect(agrup1["2020-05"], "La opción de agrupar por mes no funciona").to.exist;
        expect(agrup1["2021-09"], "La opción de agrupar por mes no funciona").to.exist;
        expect(agrup1["2021-10"], "La opción de agrupar por mes no funciona").to.exist;
        assert.equal(agrup1["2020-05"], valor3, "No se suman los totales por mes correctamente");
        assert.equal(agrup1["2021-09"], valor2 + valor5, "No se suman los totales por mes correctamente");
        assert.equal(agrup1["2021-10"], valor1 + valor4 + valor6, "No se suman los totales por mes correctamente");

        let agrup2 = agruparGastos("dia");
        assert.lengthOf(Object.keys(agrup2), 5, "La opción de agrupar por día no funciona.");
        expect(agrup2["2020-05-26"], "La opción de agrupar por día no funciona").to.exist;
        expect(agrup2["2021-09-06"], "La opción de agrupar por día no funciona").to.exist;
        expect(agrup2["2021-09-26"], "La opción de agrupar por día no funciona").to.exist;
        expect(agrup2["2021-10-06"], "La opción de agrupar por día no funciona").to.exist;
        expect(agrup2["2021-10-08"], "La opción de agrupar por día no funciona").to.exist;
        assert.equal(agrup2["2020-05-26"], valor3, "No se suman los totales por día correctamente");
        assert.equal(agrup2["2021-09-06"], valor2, "No se suman los totales por día correctamente");
        assert.equal(agrup2["2021-09-26"], valor5, "No se suman los totales por día correctamente");
        assert.equal(agrup2["2021-10-06"], valor1 + valor6, "No se suman los totales por día correctamente");
        assert.equal(agrup2["2021-10-08"], valor4, "No se suman los totales por día correctamente");

        let agrup3 = agruparGastos("mes", ["transporte"]);
        assert.lengthOf(Object.keys(agrup3), 2, "La opción de agrupar y filtrar por etiquetas no funciona");
        expect(agrup3["2020-05"], "La opción de agrupar por mes y etiquetas no funciona").to.exist;
        expect(agrup3["2021-10"], "La opción de agrupar por mes y etiquetas no funciona").to.exist;
        assert.equal(agrup3["2020-05"], valor3, "No se suman los totales por mes filtrando por etiquetas correctamente");
        assert.equal(agrup3["2021-10"], valor4 + valor6, "No se suman los totales por mes filtrando por etiquetas correctamente");

        let agrup4 = agruparGastos("anyo", ["transporte", "casa"]);
        assert.lengthOf(Object.keys(agrup4), 2, "La opción de agrupar y filtrar por etiquetas no funciona");
        expect(agrup4["2020"], "La opción de agrupar por año y etiquetas no funciona").to.exist;
        expect(agrup4["2021"], "La opción de agrupar por año y etiquetas no funciona").to.exist;
        assert.equal(agrup4["2020"], valor3, "No se suman los totales por año filtrando por etiquetas correctamente");
        assert.equal(agrup4["2021"], valor1 + valor4 + valor5 + valor6, "No se suman los totales por año filtrando por etiquetas correctamente");

        let agrup5 = agruparGastos("mes", ["transporte"], "2021-01-01");
        assert.lengthOf(Object.keys(agrup5), 1, "La opción de agrupar y filtrar por etiquetas y fecha no funciona");
        expect(agrup5["2021-10"], "La opción de agrupar y filtrar por etiquetas y fecha no funciona").to.exist;
        assert.equal(agrup5["2021-10"], valor4 + valor6, "No se suman los totales por año filtrando por etiquetas y fecha correctamente");

        let agrup6 = agruparGastos("mes", ["transporte"], "2021-10-01", "2021-10-07");
        assert.lengthOf(Object.keys(agrup6), 1);
        expect(agrup6["2021-10"], "La opción de agrupar y filtrar por etiquetas y fechas no funciona").to.exist;
        assert.equal(agrup6["2021-10"], valor6, "No se suman los totales por año filtrando por etiquetas y fechas correctamente");
    });
});

