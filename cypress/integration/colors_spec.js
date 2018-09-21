describe('Generador de paleta de colores', function() {
    it('Visita la página de generación de colores y genera 2 paletas', function() {
        cy.visit('https://cfagudelo96.github.io/');
        cy.contains('Generar nueva paleta').click();
        cy.wait(500);
        cy.screenshot('generador-' + Cypress.env('id') + '-pre');
        cy.contains('Generar nueva paleta').click();
        cy.wait(500);
        cy.screenshot('generador-' + Cypress.env('id') + '-post');
    });
});
