// E2E-testing the application's dictionary page

describe('TVT-sanasto app, dictionary', function() {

  // Before each test, cypress navigates to the dictionary page, and waits 8 seconds.
  // Waiting is done, because the site always fetches the dictionaries from its API at the beginning of a test.
  beforeEach(function() {
    cy.visit('https://tvt-sanasto-frontend.vercel.app/dictionary')
    cy.wait(8000)
  })

  it('Clicking on a word, show the word definition. And by emptying the search, we see all the words', function() {
    // Testing whether first word of the default category (basic-comp) is rendered. Then click on it.
    cy.contains('Algorithm').click()
    // Testing whether that word's definition is rendered.
    cy.contains('Yksityiskohtainen kuvaus tai ohje siitä, miten tehtävä tai prosessi suoritetaan; jota seuraamalla voidaan ratkaista tietty ongelma.')
    // Emptying the search
    cy.contains('Tyhjennä haku').click()
    // Testing whether second word of the default catefory is rendered. To know, that we have returned to the word list from the single word view.
    cy.contains('Input')
  })

  it('The user can change the category of words', function() {
    // Selecting "Internet ja Tietoverkot" from the select-component
    cy.get('select').select('Internet ja Tietoverkot')
    // Testing whether first word of that category is rendered. To know, that we have changed the category.
    cy.contains('Computer network')
  })

  it('The user can search for a word', function() {
    // Inputtin "Computer m" to the search bar. A single word view should be rendered, because there is only one word, that contains that string.
    cy.get('input').type('Computer m')
    // Testing whether the definition of "Computer memory" is rendered.
    cy.contains('Laite tai järjestelmä joka tallentaa tietoa tietokoneessa tai digitaalisissa laitteissa käytettäväksi. Muisti viittaa usein tietokoneen päämuistiin (RAM; *Random Access Memory*) jossa tietoa säilytetään käsittelyn ajan.')
  })

})