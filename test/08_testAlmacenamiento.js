// Utiliza cypress (https://docs.cypress.io/) para el testeo en navegador (necesitamos acceder al DOM, que no existe en Node)

import {cargarGastos, listarGastos} from "../js/gestionPresupuesto.js";

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
        assert.deepEqual(listarGastos(), gastos);
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
