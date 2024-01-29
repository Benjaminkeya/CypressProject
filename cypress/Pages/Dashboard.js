class Dashboard {
  //Page elements
  elements = {
    userMenu: () => cy.get('#collasible-nav-dropdown'),
    feedbackBtn: () => cy.contains('Feedback'),
    feedbackDesc: () => cy.get('.modal-body > div > .form-control'),
    submitBtn: () => cy.get('.modal-footer > .btn-primary'),
    message: () => cy.get('p.mb-1 > small'),
    closeFeedbackModal: () => cy.get('.modal-footer > .btn'),
    helpBtn: () => cy.contains('Help'),
    helpCenterModal: () => cy.get('.modal-header'),
    verifyHelpCentrePage: () => cy.contains('Help Center'),
    firstHelpArticleLink:()=>cy.contains('Assessment Groups'),
    helpArticleTitle:()=>cy.get(':nth-child(25)'),
    logo: () => cy.get('img'),
    whatsNewLink:()=>cy.get('#whatsNew')
      
  };

  //Page element actions
  clickUserMenu(){
    this.elements.userMenu().click({force:true})
  }
  
  isUserProfileDropDownVisible() {
    this.elements.userMenu().should('be.visible')
  }

  //Class Function Objects
   addFeedback(Description, expectedResponse) {
    this.elements.feedbackBtn().should('be.visible').click({ force: true });
    var randomNum = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    this.elements.feedbackDesc().should('be.visible').type(Description + randomNum);
    this.elements.submitBtn().should('be.visible').click();
    this.elements.message().should('contain', expectedResponse);
    this.elements.closeFeedbackModal().should('be.visible').click();
  }

  verifyDashboard(){
    //verify logo is present
    this.elements.logo().should('be.visible');
    //assert web app title
    cy.title().should('include','ERMAssess')
    //verify Copyright info is displayed
    cy.contains('Copyright © 2024 ERM')
    cy.get('.my-3 > a').should('be.visible').click({force:true})
    //open privacy policy link in the footer
    cy.window().then((newWindow) => {
      // Perform actions in the new tab
      newWindow.location.href = '/contents/65147fbbb80cc';
      cy.contains('Privacy policy');
    });
  }

  helpCenter() {
    this.elements.helpBtn().should('be.visible').click({force:true});
    this.elements.verifyHelpCentrePage();
    this.elements.firstHelpArticleLink().should('exist').click({force:true});
    cy.contains('a','View content on full screen').scrollIntoView().invoke('removeAttr','target').click({force:true});
    cy.window().then((newWindow) => {
      // Perform actions in the new tab
      cy.url().then((url) => {
        newWindow.location.href = url;
        cy.scrollTo('bottom')
        cy.contains('Grouping Your Assessments');
        cy.get('.img-fluid').should('be.visible')

      }); 
    });
    cy.window().then((win) => {
      const newTab = win.open('', '_blank'); // Open a blank tab in the same window
      expect(newTab,{ timeout: 20000 }).to.exist;
    });
  }

  searchHelpCenterArticle() {
    this.elements.helpBtn().should('be.visible').click({force:true});
    this.elements.verifyHelpCentrePage();
    this.elements.firstHelpArticleLink().should('exist').click({force:true});
  }
  
  whatsNew(){
    this.elements.whatsNewLink().click({force:true});
    cy.contains('Recently Released Features').eq(0).invoke('removeAttr', 'target').click({force:true})
    cy.window().then((win) => {
      const newTab = win.open('', '_blank'); // Open a blank tab in the same window
      expect(newTab,{ timeout: 16000 }).to.exist;
     cy.url().should('contain', '/contents/');
    });
  }
}
export default new Dashboard()
