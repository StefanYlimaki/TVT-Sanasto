// E2E-testing the application's games page

describe('TVT-sanasto app, Match Word and Definition -game', function() {

  it('Testing Match Word and Definition -game', function() {
    // cypress navigates to the games page
    cy.visit('https://tvt-sanasto-frontend.vercel.app/games')
    // cypress waits for 8 seconds. Waiting is done, because the site fetches the dictionaries from its API.
    cy.wait(8000)
    // Testing if page contains the game title "Yhdistä sana ja selitys", then clicking on it
    cy.contains('Yhdistä sana ja selitys').click()
    // Clicking on the round-slider at 4, to set rounds being played to four.
    cy.contains('4').click()
    // Selecting the category.
    cy.contains('Internet ja Tietoverkot').click()
    // Click on Start the Game
    cy.contains('Aloita peli').click()

    // Get asked word, then store it as a variable question1.
    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question1')
      cy.log('wrapped \'' + question + '\'')
    })
    // Click on one of the options.
    cy.get('.game__gameplay-options_single-option').first().click()
    // Wait for 0.1 seconds, to wait for the new round.
    cy.wait(100)

    // Get asked word, then store it as a variable question2.
    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question2')
      cy.log('wrapped \'' + question + '\'')
    })
    // Click on one of the options.
    cy.get('.game__gameplay-options_single-option').first().click()
    // Wait for 0.1 seconds, to wait for the new round.
    cy.wait(100)

    // Get asked word, then store it as a variable question3.
    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question3')
      cy.log('wrapped \'' + question + '\'')
    })
    // Click on one of the options.
    cy.get('.game__gameplay-options_single-option').first().click()
    // Wait for 0.1 seconds, to wait for the new round.
    cy.wait(100)

    // Get asked word, then store it as a variable question4.
    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question4')
      cy.log('wrapped \'' + question + '\'')
    })
    // Click on one of the options.
    cy.get('.game__gameplay-options_single-option').first().click()

    // Testing whether the asked words are shown in the "end-of-game" raport
    cy.get('@question1').then(question1 => {
      cy.contains(question1)
      cy.log(question1)
    })
    cy.get('@question2').then(question2 => {
      cy.contains(question2)
      cy.log(question2)
    })
    cy.get('@question3').then(question3 => {
      cy.contains(question3)
      cy.log(question3)
    })
    cy.get('@question4').then(question4 => {
      cy.contains(question4)
      cy.log(question4)
    })

    // Closing the "end-of-game" raport
    cy.contains('Sulje Raportti').click()
  })
})