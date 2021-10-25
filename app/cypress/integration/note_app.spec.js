describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Elton',
      username: 'echavez',
      password: '12345678'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })
  it('front-page can be opened', () => {
    cy.contains('Mis Notas')
  })

  it('login form can be opened', () => {
    cy.contains('Show Login').click()
  })
  
  it('user can be login', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('echavez')
    cy.get('[placeholder="Password"]').type('12345678')
    cy.get('#form-login-button').click()
    cy.contains('Create a new note')
  })
  
  it('login fails with wrong credentials', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('echavez')
    cy.get('[placeholder="Password"]').type('wrong-pass')
    cy.get('#form-login-button').click()
    cy.get('.error').contains('Wrong cretentials')
  })
  
  describe('When user logged in', () => {
    beforeEach(() => {
      cy.login({username: "echavez", password: "12345678"})
    })
    it('a new note  can be created', () => {
      const noteContent = 'Nueva nota de naruto'
      cy.contains('New Note').click()
      cy.get('input').type(noteContent)
      cy.contains('Crear nota').click()
      cy.contains(noteContent)
    })
  })
})