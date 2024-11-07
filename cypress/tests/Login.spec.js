describe('Login', () => {
  it('Login - Success', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[name="username"]').type('Heath93')
    cy.get('[type="password"]').type('s3cret')
    cy.get('button[type="submit"]').click()
    cy.get('.MuiTypography-subtitle2').contains('Account Balance')
  });

  it('Login - Fail', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[name="username"]').type('Test')
    cy.get('[type="password"]').type('Test')
    cy.get('button[type="submit"]').click()
    cy.get('.MuiAlert-message')//.contains('Username or password is invalid')
  });
  it('Register - Success', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[href="/signup"]').click()
    cy.get('[name="firstName"]').type('Andrew')
    cy.get('[name="lastName"]').type('Garfiled')
    cy.get('[name="username"]').type('ALTOA')
    cy.get('[name="password"]').type('altoa')
    cy.get('[name="confirmPassword"]').type('altoa')
    cy.get('button[type="submit"]').click()
    // cy.get('.MuiAlert-message')//.contains('Username or password is invalid')
  });
});
