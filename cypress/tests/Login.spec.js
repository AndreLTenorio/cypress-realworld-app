describe("Cypress Real World App", () => {
  const selectorList = {
    usernameField: "[name='username']",
    passwordField: "[type='password']",
    loginButton: "button[type='submit']",
    sectionSubTitle: ".MuiTypography-subtitle2",
    wrongCredentialAlert: ".MuiAlert-message",
    registerFirstName: "[name='firstName']",
    registerLastName: "[name='lastName']",
    registerPassword: "[name='password']",
    registerConfirmPassword: "[name='confirmPassword']",
  };

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
    // eslint-disable-next-line prettier/prettier
    cy.get(selectorList.wrongCredentialAlert, { timeout: 10000 }).should("contain", "Username or password is invalid");
  });

  it("Register - Success", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/signup"]').click();
    cy.get(selectorList.registerFirstName).type("Andrew");
    cy.get(selectorList.registerLastName).type("Garfiled");
    cy.get(selectorList.usernameField).type("ALTOA");
    cy.get(selectorList.registerPassword).type("altoa");
    cy.get(selectorList.registerConfirmPassword).type("altoa");
    cy.get(selectorList.loginButton).click();
    // cy.get((selectorList.wrongCredentialAlert)//.contains('Username or password is invalid')
  });

  it("Registration with incomplete information", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/signup"]').click();
    // Preencha os campos com dados incompletos
    cy.get(selectorList.registerFirstName).type("   "); // Nome inválido (somente espaços)
    cy.get(selectorList.registerLastName).type("Garfield");
    cy.get(selectorList.usernameField).type("ALTOA");
    cy.get(selectorList.registerPassword).type("123"); // Senha muito curta
    cy.get(selectorList.registerConfirmPassword).type("123");
    // Verifique se o botão de cadastro está desabilitado
    cy.get(selectorList.loginButton).should("be.disabled");
    // Verifique se o helper text de senha aparece, indicando erro de validação
    cy.get("#password-helper-text").should("be.visible");
  });
});
