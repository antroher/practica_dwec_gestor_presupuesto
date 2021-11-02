// Utiliza cypress (https://docs.cypress.io/) para el testeo en navegador (necesitamos acceder al DOM, que no existe en Node)

// Eventos en JS
describe("Eventos", () => {
    it("Función actualizarPresupuestoWeb y botón actualizarpresupuesto", () => {
        cy.visit('/interaccionHTML.html', {
            onBeforeLoad(win) {
                // Reemplazar prompt con 3000
                cy.stub(win, 'prompt').returns(3000);
            }
        });
        cy.get("#presupuesto").should(($p) => {
            expect($p, "Se debe mostrar el texto de la función 'mostrarPresupuesto' con 1500€").to.contain('Tu presupuesto actual es de 1500 €');
        });
        cy.get("#gastos-totales").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente a los gastos totales mediante la función 'calcularTotalGastos'").to.contain('518');
        });
        cy.get("#balance-total").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente al balance total mediante la función 'calcularBalance'").to.contain('981');
        });
        // Hacer clic en actualizarpresupuesto
        cy.get("#actualizarpresupuesto").click();
        cy.get("#presupuesto").should(($p) => {
            expect($p, "Se debe mostrar el texto de la función 'mostrarPresupuesto' con 3000€").to.contain('Tu presupuesto actual es de 3000 €');
        });

    });

    it("Función nuevoGastoWeb y botón anyadirgasto", () => {
        cy.visit('/interaccionHTML.html', {
            onBeforeLoad(win) {
                let call = 0;
                const fakes = ['nuevo gasto', '45', '2021-11-02', 'eti1,eti2,eti3'];
                cy.stub(win, 'prompt').callsFake(() => {
                    return fakes[call++];
                });
            }
        });
        // Hacer clic en anyadirgasto
        cy.get("#anyadirgasto").click();

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

    });

    it("Editar gasto", () => {
        cy.visit('/interaccionHTML.html', {
            onBeforeLoad(win) {
                let call = 0;
                const fakes = ['nuevo gasto', '95.78', '2021-11-02', 'eti1,eti2,eti3'];
                cy.stub(win, 'prompt').callsFake(() => {
                    return fakes[call++];
                });
            }
        });
        // Hacer clic en editar gasto
        cy.get("#listado-gastos-completo .gasto button.gasto-editar").eq(5).click();

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
