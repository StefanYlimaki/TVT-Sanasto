describe('TVT-sanasto app, frontpage', function() {

  beforeEach(function() {
    cy.visit('https://tvt-sanasto-frontend.vercel.app/')
  })

  it('Front page can be opened', function() {
    cy.contains('Tämän sovelluksen tarkoituksena on selkeyttää tietotekniikan alan opiskelussa käytettyjä termejä ja lyhenteitä.')
    cy.contains('Sovelluksessa on tällä hetkellä kaksi kategoriaa: Tietotekniikan Perustermistöä sekä Internet ja Tietoverkot')
    cy.contains('Sovelluksen verkkoversion on kehittänyt Stefan Ylimäki')
  })

  it('Link to comp-basic works', function() {
    cy.contains('https://gitlab.com/sanasto/comp-basic').click()
    cy.origin('https://gitlab.com', () => {
      cy.url().should('eq', 'https://gitlab.com/sanasto/comp-basic')
    })
  })

  it('Link to internet-basic works', function() {
    cy.contains('https://gitlab.com/sanasto/internet-basic').click()
    cy.origin('https://gitlab.com', () => {
      cy.url().should('eq', 'https://gitlab.com/sanasto/internet-basic')
    })
  })

})


describe('TVT-sanasto app, dictionary', function() {

  beforeEach(function() {
    cy.visit('https://tvt-sanasto-frontend.vercel.app/dictionary')
    cy.wait(10000)
  })

  it('Clicking on a word, show the word definition. And by empytying the search, we see all the words', function() {
    cy.contains('Algorithm').click()
    cy.contains('Yksityiskohtainen kuvaus tai ohje siitä, miten tehtävä tai prosessi suoritetaan; jota seuraamalla voidaan ratkaista tietty ongelma.')
    cy.contains('Tyhjennä haku').click()
    cy.contains('Input')
  })

  it('The user can change the category of words', function() {
    cy.get('select').select('Internet ja Tietoverkot')
    cy.contains('Computer network')
  })

  it('The user can search for a word', function() {
    cy.get('input').type('Computer m')
    cy.contains('Laite tai järjestelmä joka tallentaa tietoa tietokoneessa tai digitaalisissa laitteissa käytettäväksi. Muisti viittaa usein tietokoneen päämuistiin (RAM; *Random Access Memory*) jossa tietoa säilytetään käsittelyn ajan.')
  })

})

describe('TVT-sanasto app, games', function() {

  beforeEach(function() {
    cy.visit('https://tvt-sanasto-frontend.vercel.app/games')
    cy.wait(10000)
  })

  it('Match Word and Definition -game works', function() {
    cy.contains('Yhdistä sana ja selitys').click()
    cy.contains('4').click()
    cy.contains('Internet ja Tietoverkot').click()
    cy.contains('Aloita peli').click()
    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question1')
      cy.log('wrapped \'' + question + '\'')
    })
    cy.get('.game__gameplay-options_single-option').first().click()
    cy.wait(100)

    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question2')
      cy.log('wrapped \'' + question + '\'')
    })
    cy.get('.game__gameplay-options_single-option').first().click()
    cy.wait(100)

    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question3')
      cy.log('wrapped \'' + question + '\'')
    })
    cy.get('.game__gameplay-options_single-option').first().click()
    cy.wait(100)

    cy.get('.game__gameplay-advice_word').then(function($elem) {
      let question = ($elem.text())
      question = question.slice(0, -1)
      cy.wrap(question).as('question4')
      cy.log('wrapped \'' + question + '\'')
    })
    cy.get('.game__gameplay-options_single-option').first().click()

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

    cy.contains('Sulje Raportti').click()
  })

  //it('Match Word and Translation -game works', function() {})


})