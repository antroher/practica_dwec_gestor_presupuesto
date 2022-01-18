// Utiliza cypress (https://docs.cypress.io/) para el testeo en navegador (necesitamos acceder al DOM, que no existe en Node)

import {CrearGasto, cargarGastos, listarGastos} from "../js/gestionPresupuesto.js";

let clave = "GestorGastosDWEC";
let gastos = [
    {
        descripcion: "desc1",
        valor: 100,
        fecha: 1637538706000,
        etiquetas: ["eti1", "eti2"]
    },
    {
        descripcion: "desc2",
        valor: 200,
        fecha: 1637538707000,
        etiquetas: ["eti3", "eti4"]
    }
];

// Almacenamiento en navegador con localstorage
describe("Almacenamiento en navegador", () => {
    // Función cargarGastos
    it("Función cargarGastos", function() {
        cargarGastos(gastos);
        let cargados = listarGastos();
        assert.equal(CrearGasto.prototype.isPrototypeOf(cargados[0]), true, "No has rehidratado los objetos tal como indica el enunciado.");
        assert.equal(cargados[0].valor, gastos[0].valor, "El valor del objeto cargado no coincide con el original.");
        assert.equal(cargados[0].descripcion, gastos[0].descripcion, "La descripción del objeto cargado no coincide con el original.");
        assert.equal(cargados[0].fecha, gastos[0].fecha, "La fecha del objeto cargado no coincide con el original.");
        assert.deepEqual(cargados[0].etiquetas, gastos[0].etiquetas, "Las etiquetas no coinciden con las del objeto cargado.");
        assert.equal(CrearGasto.prototype.isPrototypeOf(cargados[1]), true, "No has rehidratado los objetos tal como indica el enunciado.");
        assert.equal(cargados[1].valor, gastos[1].valor, "El valor del objeto cargado no coincide con el original.");
        assert.equal(cargados[1].descripcion, gastos[1].descripcion, "La descripción del objeto cargado no coincide con el original.");
        assert.equal(cargados[1].fecha, gastos[1].fecha, "La fecha del objeto cargado no coincide con el original.");
        assert.deepEqual(cargados[1].etiquetas, gastos[1].etiquetas, "Las etiquetas no coinciden con las del objeto cargado.");
    });

    it("Función guardarGastosWeb y botón guardar-gastos", () => {
        cy.visit('/interaccionHTML.html');

        // Borrar localstorage
        cy.clearLocalStorage();

        // Comprobar que existe botón
        cy.get("#guardar-gastos").should("exist");

        // Hacer click
        cy.get("#guardar-gastos").click().should(() => {
            // Comprobar que se guardan los datos (deben guardarse los 6 gastos definidos en el fichero "interaccionHTML")
            expect(JSON.parse(localStorage.getItem(clave))).to.exist;
            expect(JSON.parse(localStorage.getItem(clave))).to.have.length(6);;
        });

    });

    it("Función cargarGastosWeb y botón cargar-gastos", () => {
        cy.visit('/interaccionHTML.html');


        // Comprobar que existe botón
        cy.get("#cargar-gastos").should("exist");

        // Borrar localstorage
        cy.clearLocalStorage();

        // Hacer click
        cy.get("#cargar-gastos").click();

        // Comprobar que se cargan los gastos en la página. Debe haber 0 gastos
        cy.get("#listado-gastos-completo > div.gasto").should('have.length', 0);

        // Borrar localstorage y cargar datos de ejemplo
        cy.clearLocalStorage().then((ls) => {
            ls.setItem(clave, JSON.stringify(gastos));
        });

        // Hacer click
        cy.get("#cargar-gastos").click();

        // Comprobar que se cargan los gastos en la pagina. Debe haber 2 gastos.
        cy.get("#listado-gastos-completo > div.gasto").should('have.length', 2);

    });

});
