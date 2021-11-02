// Utiliza cypress (https://docs.cypress.io/) para el testeo en navegador (necesitamos acceder al DOM, que no existe en Node)

// Generación de datos estáticos
describe("Generación de datos estáticos", () => {
    it("Función mostrarDatoEnId", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#presupuesto").should(($p) => {
            expect($p, "Se debe mostrar el texto de la función 'mostrarPresupuesto' con 1500€").to.contain('Tu presupuesto actual es de 1500 €');
        });
        cy.get("#gastos-totales").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente a los gastos totales mediante la función 'calcularTotalGastos'").to.contain('518');
        });
        cy.get("#balance-total").should(($p) => {
            expect($p, "Se debe mostrar la cantidad correspondiente al balance total mediante la función 'calcularBalance'").to.contain('981');
        });

    });

    it("Función mostrarGastoWeb - Listado completo de gastos", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#listado-gastos-completo > div.gasto").should((divs) => {
            expect(divs, "Deben mostrarse 6 gastos en etiquetas 'div.gasto'").to.have.length(6);
        });
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-descripcion").should((divs) => {
            expect(divs, "Deben mostrarse 6 etiquetas 'div.gasto-descripcion'").to.have.length(6);
        });
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-fecha").should((divs) => {
            expect(divs, "Deben mostrarse 6 etiquetas 'div.gasto-fecha'").to.have.length(6);
        })
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-valor").should((divs) => {
            expect(divs, "Deben mostrarse 6 etiquetas 'div.gasto-valor'").to.have.length(6);
        })
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-etiquetas").should((divs) => {
            expect(divs, "Deben mostrarse 6 etiquetas 'div.gasto-etiquetas'").to.have.length(6);
        })
        cy.get("#listado-gastos-completo > div.gasto > div.gasto-etiquetas > span.gasto-etiquetas-etiqueta").should((divs) => {
            expect(divs, "Deben mostrarse 11 etiquetas 'span.gasto-etiquetas-etiqueta'").to.have.length(11);
        })

    });

    it("Función mostrarGastoWeb - Filtrado 1", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#listado-gastos-filtrado-1 > div.gasto").should((divs) => {
            expect(divs, "Deben mostrarse 2 gastos en etiquetas 'div.gasto'").to.have.length(2);
        })
    });

    it("Función mostrarGastoWeb - Filtrado 2", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#listado-gastos-filtrado-2 > div.gasto").should((divs) => {
            expect(divs, "Deben mostrarse 3 gastos en etiquetas 'div.gasto'").to.have.length(3);
        })
    });

    it("Función mostrarGastoWeb - Filtrado 3", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#listado-gastos-filtrado-3 > div.gasto").should((divs) => {
            expect(divs, "Debe mostrarse 1 gasto en etiqueta 'div.gasto'").to.have.length(1);
        })

    });

    it("Función mostrarGastoWeb - Filtrado 4", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#listado-gastos-filtrado-4 > div.gasto").should((divs) => {
            expect(divs, "Deben mostrarse 3 gastos en etiquetas 'div.gasto'").to.have.length(3);
        })
    });

    it("Función mostrarGastosAgrupadosWeb - Agrupación por día", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#agrupacion-dia > div.agrupacion > h1").should("contain", "Gastos agrupados por día");
        cy.get("#agrupacion-dia > div.agrupacion > div.agrupacion-dato").should((divs) => {
            expect(divs, "Deben mostrarse 5 etiquetas 'agrupacion-dato'").to.have.length(5);
        });
        cy.get("#agrupacion-dia > div.agrupacion > div.agrupacion-dato > span.agrupacion-dato-clave").should((divs) => {
            expect(divs, "Deben mostrarse 5 etiquetas 'agrupacion-dato-clave'").to.have.length(5);
        });
        cy.get("#agrupacion-dia > div.agrupacion > div.agrupacion-dato > span.agrupacion-dato-valor").should((divs) => {
            expect(divs, "Deben mostrarse 5 etiquetas 'agrupacion-dato-valor'").to.have.length(5);
        });
    });

    it("Función mostrarGastosAgrupadosWeb - Agrupación por mes", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#agrupacion-mes > div.agrupacion > h1").should("contain", "Gastos agrupados por mes");
        cy.get("#agrupacion-mes > div.agrupacion > div.agrupacion-dato").should((divs) => {
            expect(divs, "Deben mostrarse 3 etiquetas 'agrupacion-dato'").to.have.length(3);
        });
        cy.get("#agrupacion-mes > div.agrupacion > div.agrupacion-dato > span.agrupacion-dato-clave").should((divs) => {
            expect(divs, "Deben mostrarse 3 etiquetas 'agrupacion-dato-clave'").to.have.length(3);
        });
        cy.get("#agrupacion-mes > div.agrupacion > div.agrupacion-dato > span.agrupacion-dato-valor").should((divs) => {
            expect(divs, "Deben mostrarse 3 etiquetas 'agrupacion-dato-valor'").to.have.length(3);
        });
    });

    it("Función mostrarGastosAgrupadosWeb - Agrupación por año", () => {
        cy.visit('/interaccionHTML.html');
        cy.get("#agrupacion-anyo > div.agrupacion > h1").should("contain", "Gastos agrupados por año");
        cy.get("#agrupacion-anyo > div.agrupacion > div.agrupacion-dato").should((divs) => {
            expect(divs, "Deben mostrarse 2 etiquetas 'agrupacion-dato'").to.have.length(2);
        });
        cy.get("#agrupacion-anyo > div.agrupacion > div.agrupacion-dato > span.agrupacion-dato-clave").should((divs) => {
            expect(divs, "Deben mostrarse 2 etiquetas 'agrupacion-dato-clave'").to.have.length(2);
        });
        cy.get("#agrupacion-anyo> div.agrupacion > div.agrupacion-dato > span.agrupacion-dato-valor").should((divs) => {
            expect(divs, "Deben mostrarse 2 etiquetas 'agrupacion-dato-valor'").to.have.length(2);
        });
    });
});
