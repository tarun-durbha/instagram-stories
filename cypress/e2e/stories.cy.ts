

/// <reference types="cypress" />

describe('Instagram Stories App', () => {
    beforeEach(() => {
      cy.viewport('iphone-6'); 
      cy.visit('/');
    });
  
    it('loads the story list', () => {
      cy.get('.story-thumbnail').should('exist');
      cy.get('.story-thumbnail').its('length').should('be.gte', 1);
    });
  
    it('opens the story viewer when a story thumbnail is clicked', () => {
        cy.get('.story-thumbnail').first().click();
        cy.get('.story-viewer', { timeout: 10000 }).should('be.visible');
        cy.get('.story-image', { timeout: 10000 })
          .should('have.css', 'opacity')
          .and('equal', '1');
          
        cy.get('.close-button').should('exist');
      });
  
    it('navigates between stories using left/right controls', () => {
      cy.get('.story-thumbnail').first().click();
      cy.get('.story-image')
        .invoke('attr', 'src')
        .then((initialSrc) => {
          cy.get('.control.right').click();
          cy.get('.story-image')
            .invoke('attr', 'src')
            .should('not.equal', initialSrc)
            .then((newSrc) => {
              cy.get('.control.left').click();
              cy.get('.story-image')
                .invoke('attr', 'src')
                .should('equal', initialSrc);
            });
        });
    });
  

  
    it('closes the story viewer when the close button is clicked', () => {
      cy.get('.story-thumbnail').first().click();
      cy.get('.story-viewer').should('be.visible');
      cy.get('.close-button').click();
      cy.get('.story-viewer').should('not.exist');
    });
  });
  
  