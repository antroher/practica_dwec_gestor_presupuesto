// Utiliza cypress (https://docs.cypress.io/) para el testeo en navegador (necesitamos acceder al DOM, que no existe en Node)

import {transformarListadoEtiquetas} from "../js/gestionPresupuesto.js";

// Expresiones regulares
describe("Expresiones regulares", () => {
    // Función transformarListadoEtiquetas
    it("Función transformarListadoEtiquetas", function() {

        assert.deepEqual(transformarListadoEtiquetas("eti1,eti6"), ["eti1", "eti6"]);
        assert.deepEqual(transformarListadoEtiquetas("eti1,Eti7"), ["eti1", "Eti7"]);
        assert.deepEqual(transformarListadoEtiquetas("eti1, eti6"), ["eti1", "eti6"]);
        assert.deepEqual(transformarListadoEtiquetas("eti1 , eti2"), ["eti1", "eti2"]);
        assert.deepEqual(transformarListadoEtiquetas("Eti1 ,   eti2"), ["Eti1", "eti2"]);
        assert.deepEqual(transformarListadoEtiquetas("ETI3.eti8"), ["ETI3", "eti8"]);
        assert.deepEqual(transformarListadoEtiquetas("eti4. eti2"), ["eti4", "eti2"]);
        assert.deepEqual(transformarListadoEtiquetas("eti9:eti2"), ["eti9", "eti2"]);
        assert.deepEqual(transformarListadoEtiquetas("eti1;eti2"), ["eti1", "eti2"]);
        assert.deepEqual(transformarListadoEtiquetas("eti1 eti2"), ["eti1", "eti2"]);
        assert.deepEqual(transformarListadoEtiquetas("eti7    eti6"), ["eti7", "eti6"]);
        assert.deepEqual(transformarListadoEtiquetas("Eti1 :, ; eti3"), ["Eti1", "eti3"]);

    });

    it("Formulario de filtrado", () => {
        cy.visit('/interaccionHTML.html');

        // Debe aparecer el formulario
        cy.get("#formulario-filtrado").should("exist");

        // Enviarlo vacío
        cy.get("#formulario-filtrado").submit();

        // Se deben mostrar los mismos gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Si se envía el formulario vacío, debe devolver todos los gastos").to.have.length(6);
        });

        // Valor mínimo
        cy.get("#formulario-filtrado-valor-minimo").invoke("val", "20");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 4 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por valor mínimo no funciona").to.have.length(4);
        });
        cy.get("#formulario-filtrado-valor-minimo").invoke("val", "");

        // Valor máximo
        cy.get("#formulario-filtrado-valor-maximo").invoke("val", "60");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 3 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por valor máximo no funciona").to.have.length(3);
        });
        cy.get("#formulario-filtrado-valor-maximo").invoke("val", "");

        // Fecha desde
        cy.get("#formulario-filtrado-fecha-desde").invoke("val", "2021-10-01");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 3 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por fecha mínima no funciona").to.have.length(3);
        });
        cy.get("#formulario-filtrado-fecha-desde").invoke("val", "");

        // Fecha hasta
        cy.get("#formulario-filtrado-fecha-hasta").invoke("val", "2021-01-01");
        cy.get("#formulario-filtrado").submit();
        // Se debe mostrar 1 gasto
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por fecha máxima no funciona").to.have.length(1);
        });
        cy.get("#formulario-filtrado-fecha-hasta").invoke("val", "");

        // Descripción contiene
        cy.get("#formulario-filtrado-descripcion").invoke("val", "Segu");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 2 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por descripción no funciona").to.have.length(2);
        });
        cy.get("#formulario-filtrado-descripcion").invoke("val", "");

        // Etiquetas tiene
        cy.get("#formulario-filtrado-etiquetas-tiene").invoke("val", "transporte");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 3 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por etiquetas no funciona").to.have.length(3);
        });

        cy.get("#formulario-filtrado-etiquetas-tiene").invoke("val", "transporte, casa");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 5 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por etiquetas con varios separadores no funciona").to.have.length(5);
        });

        cy.get("#formulario-filtrado-etiquetas-tiene").invoke("val", "transporte , casa");
        cy.get("#formulario-filtrado").submit();
        // Se deben mostrar 5 gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Filtrado por etiquetas con varios separadores no funciona").to.have.length(5);
        });
    });

});
