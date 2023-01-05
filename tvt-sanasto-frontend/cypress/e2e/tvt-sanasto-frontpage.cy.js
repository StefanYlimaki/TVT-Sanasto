// E2E-testing the application's frontpage

describe('TVT-sanasto app, frontpage', function() {

  // Before each test, cypress navigates to the frontpage
  beforeEach(function() {
    cy.visit('https://tvt-sanasto-frontend.vercel.app/')
  })

  it('Front page can be opened', function() {
    // Testing whether the frontpage is rendered by searching for its texts.
    cy.contains('Tämän sovelluksen tarkoituksena on selkeyttää tietotekniikan alan opiskelussa käytettyjä termejä ja lyhenteitä.')
    cy.contains('Sovelluksessa on tällä hetkellä kaksi kategoriaa: Tietotekniikan Perustermistöä sekä Internet ja Tietoverkot')
    cy.contains('Sovelluksen verkkoversion on kehittänyt Stefan Ylimäki')
  })

  it('Link to comp-basic works', function() {
    // Testing whether link to dictionary comp-basic works
    cy.contains('https://gitlab.com/sanasto/comp-basic').click()
    cy.origin('https://gitlab.com', () => {
      cy.url().should('eq', 'https://gitlab.com/sanasto/comp-basic')
    })
  })

  it('Link to internet-basic works', function() {
    // Testing whether link to dictionary internet-basic works
    cy.contains('https://gitlab.com/sanasto/internet-basic').click()
    cy.origin('https://gitlab.com', () => {
      cy.url().should('eq', 'https://gitlab.com/sanasto/internet-basic')
    })
  })

})