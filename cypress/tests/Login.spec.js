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

  const userData = {
    userSucess: {
      username: "Heath93",
      password: "s3cret",
    },
    userFail: {
      username: "Test",
      password: "Test",
    },
    registerSucess: {
      firstname: "Andrew",
      lastname: "Garfield",
      username: "ALTOA",
      password: "altoa",
    },
    registerImcomplete: {
      firstname: "   ",
      lastname: "Garfield",
      username: "ALTOA",
      password: "123",
    },
  };
  

  it("Login - Success", () => {
    cy.visit("http://localhost:3000/");
    cy.get(selectorList.usernameField).type(userData.userSucess.username);
    cy.get(selectorList.passwordField).type(userData.userSucess.password);
    cy.get(selectorList.loginButton).click();
    cy.get(selectorList.sectionSubTitle).eq(1).contains("Account Balance");
  });

  it("Login - Fail", () => {
    cy.visit("http://localhost:3000/");
    cy.get(selectorList.usernameField).type(userData.userFail.username);
    cy.get(selectorList.passwordField).type(userData.userFail.password);
    cy.get(selectorList.loginButton).click();
    // eslint-disable-next-line prettier/prettier
    cy.get(selectorList.wrongCredentialAlert, { timeout: 10000 }).should("contain", "Username or password is invalid");
  });

  it("Register - Success", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/signup"]').click();
    cy.get(selectorList.registerFirstName).type(userData.registerSucess.firstname);
    cy.get(selectorList.registerLastName).type(userData.registerSucess.lastname);
    cy.get(selectorList.usernameField).type(userData.registerSucess.username);
    cy.get(selectorList.registerPassword).type(userData.registerSucess.password);
    cy.get(selectorList.registerConfirmPassword).type(userData.registerSucess.password);
    cy.get(selectorList.loginButton).click();
    // cy.get((selectorList.wrongCredentialAlert)//.contains('Username or password is invalid')
  });

  it("Registration with incomplete information", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/signup"]').click();
    // Preencha os campos com dados incompletos
    cy.get(selectorList.registerFirstName).type(userData.registerImcomplete.firstname); // Nome inválido (somente espaços)
    cy.get(selectorList.registerLastName).type(userData.registerImcomplete.lastname);
    cy.get(selectorList.usernameField).type(userData.registerImcomplete.username);
    cy.get(selectorList.registerPassword).type(userData.registerImcomplete.password); // Senha muito curta
    cy.get(selectorList.registerConfirmPassword).type(userData.registerImcomplete.password);
    // Verifique se o botão de cadastro está desabilitado
    cy.get(selectorList.loginButton).should("be.disabled");
    // Verifique se o helper text de senha aparece, indicando erro de validação
    cy.get("#password-helper-text").should("be.visible");
  });
});
