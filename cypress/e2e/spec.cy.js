// Cypress tests
describe('URL Shortener', () => {
  const apiUrl = 'http://localhost:3001/api/v1/urls';
  const testData = {
    urls: [
      {
        id: 1,
        long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        short_url: 'http://localhost:3001/useshorturl/1',
        title: 'Awesome photo',
      },
    ],
  };

  beforeEach(() => {
    cy.intercept('GET', apiUrl, { body: testData }).as('getUrls');
    cy.visit('http://localhost:3000');
    cy.wait('@getUrls');
  });

  it('displays the page title and existing shortened URLs', () => {
    cy.contains('h1', 'URL Shortener');
    testData.urls.forEach((url) => {
      cy.contains('.url', url.title);
      cy.contains('.url', url.short_url);
      cy.contains('.url', url.long_url);
    });
  });

  it('displays the form with proper inputs', () => {
    cy.get('form').should('exist');
    cy.get('input[name="title"]').should('exist');
    cy.get('input[name="long_url"]').should('exist');
    cy.get('button').contains('Shorten Please!').should('exist');
  });

  it('updates the form input fields', () => {
    cy.get('input[name="title"]').type('New Title').should('have.value', 'New Title');
    cy.get('input[name="long_url"]').type('https://example.com').should('have.value', 'https://example.com');
  });

  it('returns a successful status code for GET request', () => {
    cy.intercept('GET', apiUrl, { statusCode: 200, body: testData }).as('getUrls');
    cy.visit('http://localhost:3000');
    cy.wait('@getUrls');
    cy.get('@getUrls').then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200);
    });
  });

  it('renders the new shortened URL when form is submitted', () => {
    const newUrl = {
        id: 1,
        long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        short_url: 'http://localhost:3001/useshorturl/1',
        title: 'Awesome photo',
    };

    cy.intercept('POST', apiUrl, {
      statusCode: 200,
      body: newUrl,
    }).as('postUrl');

    cy.get('input[name="title"]').type(newUrl.title);
    cy.get('input[name="long_url"]').type(newUrl.long_url);
    cy.get('button').contains('Shorten Please!').click();

    cy.wait('@postUrl');
    cy.get('.url').last().within(() => {
    cy.get('h3').should('contain', newUrl.title); 
    cy.get('a').should('have.attr', 'href', newUrl.short_url); 
    
    });
  });
});