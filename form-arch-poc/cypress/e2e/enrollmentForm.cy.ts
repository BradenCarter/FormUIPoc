describe('Enrollment Form E2E', () => {
  beforeEach(() => {
    cy.on('fail', (error) => {
      if (error.message.includes('Not Found')) {
        console.error('Page not found. Please check if the server is running and the route exists.');
      }
      throw error;
    });

    cy.visit('/');
    cy.contains('button', 'Start Form Submission').click();
    cy.contains('Maternity Enrollment Form').should('be.visible');
  });

  describe('Form Navigation', () => {
    it('allows navigation between steps using Next and Previous buttons', () => {
      // Fill Step 1
      cy.get('input[name="fullName"]').type('Jane Doe');
      cy.get('input[name="dob"]').type('1990-01-01');
      cy.get('input[name="email"]').type('jane@example.com');
      cy.get('input[name="contactNumber"]').type('1234567890');
      cy.contains('button', 'Next').click();

      // Verify Step 2 is visible
      cy.contains('Pregnancy Information').should('be.visible');
      
      // Go back to Step 1
      cy.contains('button', 'Previous').click();
      cy.get('input[name="fullName"]').should('have.value', 'Jane Doe');
      
      // Go forward again
      cy.contains('button', 'Next').click();
      cy.contains('Pregnancy Information').should('be.visible');
    });

    it('preserves form data when navigating between steps', () => {
      // Fill Step 1
      cy.get('input[name="fullName"]').type('Jane Doe');
      cy.get('input[name="email"]').type('jane@example.com');
      cy.contains('button', 'Next').click();

      // Fill Step 2
      cy.get('input[name="dueDate"]').type('2024-09-01');
      cy.get('select[name="trimester"]').select('First');
      cy.contains('button', 'Previous').click();

      // Verify Step 1 data persists
      cy.get('input[name="fullName"]').should('have.value', 'Jane Doe');
      cy.get('input[name="email"]').should('have.value', 'jane@example.com');
    });
  });

  describe('Form Validation', () => {
    it('validates required fields in Step 1', () => {
      cy.contains('button', 'Next').click();
      cy.get('p.text-error').should('have.length.at.least', 1);
      cy.contains('Full name is required').should('be.visible');
      cy.contains('Date of birth is required').should('be.visible');
      cy.contains('Contact number is required').should('be.visible');
    });

    it('validates email format', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.contains('button', 'Next').click();
      cy.contains('Invalid email address').should('be.visible');
    });

    it('validates date formats', () => {
      cy.get('input[name="dob"]').type('invalid-date');
      cy.contains('button', 'Next').click();
      cy.contains('Invalid date format').should('be.visible');
    });

    it('validates phone number format', () => {
      cy.get('input[name="contactNumber"]').type('123');
      cy.contains('button', 'Next').click();
      cy.contains('Invalid phone number').should('be.visible');
    });
  });

  describe('Form Submission', () => {
    it('completes the entire form flow successfully', () => {
      // Step 1: Personal Information
      cy.get('input[name="fullName"]').type('Jane Doe');
      cy.get('input[name="dob"]').type('1990-01-01');
      cy.get('input[name="email"]').type('jane@example.com');
      cy.get('input[name="contactNumber"]').type('1234567890');
      cy.contains('button', 'Next').click();

      // Step 2: Pregnancy Information
      cy.get('input[name="dueDate"]').type('2024-09-01');
      cy.get('select[name="trimester"]').select('First');
      cy.get('input[type="checkbox"][name="firstPregnancy"]').check();
      cy.get('textarea[name="healthConcerns"]').type('None');
      cy.contains('button', 'Next').click();

      // Step 3: Insurance Information
      cy.get('input[name="memberId"]').type('MEM123456');
      cy.get('select[name="planType"]').select('Premium');
      cy.get('input[name="physicianName"]').type('Dr. Smith');
      cy.contains('button', 'Next').click();

      // Review Step
      cy.contains('Review Your Information').should('be.visible');
      cy.contains('Jane Doe').should('be.visible');
      cy.contains('Premium').should('be.visible');
      cy.contains('Dr. Smith').should('be.visible');
      
      // Check consent
      cy.get('input[type="checkbox"][name="consent"]').check();
      
      // Submit form
      cy.contains('button', 'Submit Form').click();
      cy.contains('Form submitted successfully!').should('be.visible');
    });

    it('requires consent before submission', () => {
      // Fill all steps (reusing commands)
      cy.fillPersonalInformation();
      cy.fillPregnancyInformation();
      cy.fillInsuranceInformation();

      // Try to submit without consent
      cy.contains('button', 'Submit Form').click();
      cy.contains('You must consent to submit this form').should('be.visible');
    });

    it('handles submission errors gracefully', () => {
      // Fill all steps
      cy.fillPersonalInformation();
      cy.fillPregnancyInformation();
      cy.fillInsuranceInformation();
      
      // Simulate a server error
      cy.intercept('POST', '/api/submit', {
        statusCode: 500,
        body: { message: 'Server error' }
      });

      // Submit form
      cy.get('input[type="checkbox"][name="consent"]').check();
      cy.contains('button', 'Submit Form').click();
      cy.contains('An error occurred. Please try again.').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation', () => {
      // Test tab navigation
      cy.get('input[name="fullName"]').focus();
      cy.tab().should('have.focus');
      cy.tab().should('have.focus');
      cy.tab().should('have.focus');
      
      // Test enter key for submission
      cy.get('button').contains('Next').type('{enter}');
      cy.contains('Full name is required').should('be.visible');
    });

    it('displays proper error messages for screen readers', () => {
      cy.contains('button', 'Next').click();
      cy.get('p.text-error').should('have.attr', 'role', 'alert');
    });
  });
});

// Add custom commands to cypress/support/commands.ts
declare namespace Cypress {
  interface Chainable {
    fillPersonalInformation(): void;
    fillPregnancyInformation(): void;
    fillInsuranceInformation(): void;
  }
}

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
