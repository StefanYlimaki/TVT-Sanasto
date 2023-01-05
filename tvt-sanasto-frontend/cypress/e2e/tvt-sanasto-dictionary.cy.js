// E2E-testing the application's dictionary page

describe('TVT-sanasto app, dictionary', function() {
  it('Three-step test. For the specific tasks, see source code', function() {

    /*************** PRE-TEST ***************/
    // Navigate to the dictionary page
    cy.visit('https://tvt-sanasto-frontend.vercel.app/dictionary')
    // Cypress waits 8 seconds for the dictionaries to load.
    cy.wait(8000)


    /*************** FIRST TASK ***************/
    cy.log('TEST NRO: 1')
    cy.log('Test single word view')

    // Testing whether first word of the default category (basic-comp) is rendered. Then click on it.
    cy.contains('Algorithm').click()
    // Testing whether that word's definition is rendered.
    cy.contains('Yksityiskohtainen kuvaus tai ohje siitä, miten tehtävä tai prosessi suoritetaan; jota seuraamalla voidaan ratkaista tietty ongelma.')
    // Emptying the search
    cy.contains('Tyhjennä haku').click()
    // Testing whether second word of the default catefory is rendered. To know, that we have returned to the word list from the single word view.
    cy.contains('Input')


    /*************** SECOND TASK ***************/
    cy.log('TEST NRO: 2')
    cy.log('Test word search')

    // Inputting "Computer m" to the search bar. A single word view should be rendered, because there is only one word, that contains that string.
    cy.get('input').type('Computer m')
    // Testing whether the definition of "Computer memory" is rendered.
    cy.contains('Laite tai järjestelmä joka tallentaa tietoa tietokoneessa tai digitaalisissa laitteissa käytettäväksi. Muisti viittaa usein tietokoneen päämuistiin (RAM; *Random Access Memory*) jossa tietoa säilytetään käsittelyn ajan.')
    // Emptying the search
    cy.contains('Tyhjennä haku').click()


    /*************** THIRD TASK ***************/
    cy.log('TEST NRO: 3')
    cy.log('Test category selector')

    // Selecting "Internet ja Tietoverkot" from the select-component
    cy.get('select').select('Internet ja Tietoverkot')
    // Testing whether first word of that category is rendered. To know, that we have changed the category.
    cy.contains('Computer network')
  }
  )
})