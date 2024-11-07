describe("Login", () => {

const selectorList = {
  usernameField: "[name='username']",
  passwordField: "[type='password']",
  loginButton: "button[type='submit']",
  sectionSubTitle: ".MuiTypography-subtitle2",
  wrongCredentialAlert: ".MuiAlert-message",
}


  it("Login - Success", () => {
    cy.visit("http://localhost:3000/");
    cy.get(selectorList.usernameField).type("Heath93");
    cy.get(selectorList.passwordField).type("s3cret");
    cy.get(selectorList.loginButton).click();
    cy.get(selectorList.sectionSubTitle).eq(1).contains("Account Balance");
  });

  it("Login - Fail", () => {
    cy.visit("http://localhost:3000/");
    cy.get(selectorList.usernameField).type("Test");
    cy.get(selectorList.passwordField).type("Test");
    cy.get(selectorList.loginButton).click();
    cy.get(selectorList.wrongCredentialAlert).should("contain", "Username or password is invalid");
  });

  it("Register - Success", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/signup"]').click();
    cy.get('[name="firstName"]').type("Andrew");
    cy.get('[name="lastName"]').type("Garfiled");
    cy.get('[name="username"]').type("ALTOA");
    cy.get('[name="password"]').type("altoa");
    cy.get('[name="confirmPassword"]').type("altoa");
    cy.get(selectorList.loginButton).click();
    // cy.get('.MuiAlert-message')//.contains('Username or password is invalid')
  });

  it("Registration with incomplete information", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/signup"]').click();
    cy.get('[name="firstName"]').type("   ");
    cy.get('[name="lastName"]').type("Garfiled");
    cy.get('[name="username"]').type("ALTOA");
    cy.get('[name="password"]').type("123");
    cy.get('[name="confirmPassword"]').type("123");
    //cy.get(selectorList.loginButton);
    cy.get('#password-helper-text');
  });
});
