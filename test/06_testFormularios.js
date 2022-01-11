// Utiliza cypress (https://docs.cypress.io/) para el testeo en navegador (necesitamos acceder al DOM, que no existe en Node)

// Formularios y JS
describe("Formularios", () => {
    it("Función nuevoGastoWebFormulario y botón anyadirgasto-formulario", () => {
        cy.visit('/interaccionHTML.html');

        // Al principio no debe existir el formulario
        cy.get("#controlesprincipales form").should("not.exist");

        // Hacer clic en anyadirgasto
        cy.get("#anyadirgasto-formulario").click();

        // Debe apareer el formulario
        cy.get("#controlesprincipales form").should("exist");


        // Debe desactivarse el botón "anyadirgasto-formulario"
        cy.get("#anyadirgasto-formulario").should("have.attr", "disabled");


        // Rellenar el formulario
        cy.get("#controlesprincipales form #descripcion").invoke("val", "test");
        cy.get("#controlesprincipales form #valor").invoke("val", "45");


        // Enviar el formulario
        cy.get("#controlesprincipales form").submit();

        // Se deben actualizar los gastos totales
        cy.get("#gastos-totales").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente a los gastos totales mediante la función 'calcularTotalGastos'").to.contain('563');
        });
        // Se debe actualizar el balance
        cy.get("#balance-total").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente al balance total mediante la función 'calcularBalance'").to.contain('936');
        });
        // Se debe haber añadido el nuevo gasto
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Deben mostrarse 7 gastos en etiquetas 'div.gasto'").to.have.length(7);

        });

        // Se debe haber activado de nuevo el botón "anyadirgasto-formulario"
        cy.get("#anyadirgasto-formulario").should("not.have.attr", "disabled");

    });

    it("Cancelar añadir gasto", () => {
        cy.visit('/interaccionHTML.html');

        // Al principio no debe existir el formulario
        cy.get("#controlesprincipales form").should("not.exist");

        // Hacer clic en anyadirgasto
        cy.get("#anyadirgasto-formulario").click();

        // Debe apareer el formulario
        cy.get("#controlesprincipales form").should("exist");

        // Debe desactivarse el botón "anyadirgasto-formulario"
        cy.get("#anyadirgasto-formulario").should("have.attr", "disabled");

        // Pulsamos en el botón Cancelar del formulario
        cy.get("#controlesprincipales button.cancelar").click();

        // No debe haber nuevos gastos
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Deben mostrarse 7 gastos en etiquetas 'div.gasto'").to.have.length(6);

        });

        // Se debe haber activado de nuevo el botón "anyadirgasto-formulario"
        cy.get("#anyadirgasto-formulario").should("not.have.attr", "disabled");

    });

    it("Editar gasto", () => {
        cy.visit('/interaccionHTML.html');

        // Al principio no debe existir el formulario de edición
        cy.get("#listado-gastos-completo .gasto form").should("have.length", 0);

        // Hacer click en editar el sexto gasto
        cy.get("#listado-gastos-completo .gasto button.gasto-editar-formulario").eq(5).click();

        // Debe apareer el formulario
        cy.get("#listado-gastos-completo .gasto form").should("exist");

        // Debe desactivarse el botón "gasto-editar-formulario"
        cy.get("#listado-gastos-completo .gasto button.gasto-editar-formulario").eq(5).should("have.attr", "disabled");

        // Rellenar el formulario
        cy.get("#listado-gastos-completo .gasto form #descripcion").invoke("val", "test");
        cy.get("#listado-gastos-completo .gasto form #valor").invoke("val", "95.78");

        // Enviar el formulario
        cy.get("#listado-gastos-completo .gasto form").submit();

        // Se debe haber activado de nuevo el botón de editar del gasto
        cy.get("#listado-gastos-completo .gasto button.gasto-editar-formulario").eq(5).should("not.have.attr", "disabled");

        // Se deben actualizar los gastos totales
        cy.get("#gastos-totales").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente a los gastos totales mediante la función 'calcularTotalGastos'").to.contain('418');
        });
        // Se debe actualizar el balance
        cy.get("#balance-total").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente al balance total mediante la función 'calcularBalance'").to.contain('1081');
        });
        // Se debe haber editado el gasto
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-valor").eq(5).should('have.text', '95.78');

    });

    it("Cancelar editar gasto", () => {
        cy.visit('/interaccionHTML.html');

        // Al principio no debe existir el formulario de edición
        cy.get("#listado-gastos-completo .gasto form").should("have.length", 0);

        // Hacer click en editar el sexto gasto
        cy.get("#listado-gastos-completo .gasto button.gasto-editar-formulario").eq(5).click();

        // Debe apareer el formulario
        cy.get("#listado-gastos-completo .gasto form").should("exist");

        // Debe desactivarse el botón "gasto-editar-formulario"
        cy.get("#listado-gastos-completo .gasto button.gasto-editar-formulario").eq(5).should("have.attr", "disabled");

        // Pulsar en cancelar
        cy.get("#listado-gastos-completo .gasto form button.cancelar").click();

        // Se debe haber activado de nuevo el botón de editar del gasto
        cy.get("#listado-gastos-completo .gasto button.gasto-editar-formulario").eq(5).should("not.have.attr", "disabled");

        // No se debe haber editado el gasto
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-valor").eq(5).should('have.text', '195.78');

    });

    it("Borrar gasto", () => {
        cy.visit('/interaccionHTML.html');
        // Hacer clic en borrar gasto
        cy.get("#listado-gastos-completo .gasto button.gasto-borrar").eq(5).click();

        // Se deben actualizar los gastos totales
        cy.get("#gastos-totales").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente a los gastos totales mediante la función 'calcularTotalGastos'").to.contain('323');
        });
        // Se debe actualizar el balance
        cy.get("#balance-total").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente al balance total mediante la función 'calcularBalance'").to.contain('1176');
        });
        // Se debe haber eliminado el gasto
        cy.get("#listado-gastos-completo > div.gasto").should('have.length', 5);


    });

    it("Borrar etiqueta", () => {
        cy.visit('/interaccionHTML.html');

        // Inicialmente debe haber 11 etiquetas
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-etiquetas > span.gasto-etiquetas-etiqueta").should('have.length', 11);

        // Hacer clic en etiqueta para borrarla
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-etiquetas > span.gasto-etiquetas-etiqueta").eq(5).click();

        // Comprobar que aparece una etiqueta menos
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-etiquetas > span.gasto-etiquetas-etiqueta").should('have.length', 10);
    });

});
