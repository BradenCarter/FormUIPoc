/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    fillPersonalInformation(): Chainable<void>;
    fillPregnancyInformation(): Chainable<void>;
    fillInsuranceInformation(): Chainable<void>;
    tab(): Chainable<Element>;
  }
}

// Custom command for keyboard tab navigation
Cypress.Commands.add('tab', { prevSubject: 'optional' }, () => {
  cy.focused().trigger('keydown', { keyCode: 9, which: 9 });
});

// Form filling commands
Cypress.Commands.add('fillPersonalInformation', () => {
  cy.get('input[name="fullName"]').type('Jane Doe');
  cy.get('input[name="dob"]').type('1990-01-01');
  cy.get('input[name="email"]').type('jane@example.com');
  cy.get('input[name="contactNumber"]').type('1234567890');
  cy.contains('button', 'Next').click();
});

Cypress.Commands.add('fillPregnancyInformation', () => {
  cy.get('input[name="dueDate"]').type('2024-09-01');
  cy.get('select[name="trimester"]').select('First');
  cy.get('input[type="checkbox"][name="firstPregnancy"]').check();
  cy.get('textarea[name="healthConcerns"]').type('None');
  cy.contains('button', 'Next').click();
});

Cypress.Commands.add('fillInsuranceInformation', () => {
  cy.get('input[name="memberId"]').type('MEM123456');
  cy.get('select[name="planType"]').select('Premium');
  cy.get('input[name="physicianName"]').type('Dr. Smith');
  cy.contains('button', 'Next').click();
});
