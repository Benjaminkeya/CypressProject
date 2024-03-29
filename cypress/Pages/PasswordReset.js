class PasswordReset {
  //Page Element Selectors
  elements = {
    forgotPassBtn: () => cy.contains('a','Forgot Password?'),
    txtEmail: () => cy.get('#email'),
    sendBtn: () => cy.contains('Send Instructions'),
  };

//Page Function Object
  resetPass(email, message) {
    this.elements.forgotPassBtn().should('be.visible').scrollIntoView().click({force:true});
    cy.url().should('contain', '/forgot-password');//assert reset password  page
    this.elements.txtEmail().should('be.visible').clear().type(email);
    this.elements.sendBtn().should('be.visible').click();
    cy.contains(message);
  }
}
export default new PasswordReset()
