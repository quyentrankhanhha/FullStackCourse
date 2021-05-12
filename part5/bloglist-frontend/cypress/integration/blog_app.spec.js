// Make a test for checking that the application displays the login form by default.
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'hihi',
      username: 'tester',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  // Make tests for logging in.Test both successful and unsuccessful log in attempts.Make a new user in the beforeEach block for the tests.

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
      cy.contains('tester logged in')
    })

    it('fails with wrong username or password', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('faux')
      cy.get('#loginBtn').click()
      cy.get('#notification').should('contain', 'wrong username or password')

      cy.get('html').should('not.contain', 'tester logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('123456')
      cy.get('#loginBtn').click()
    })
    // Make a test which checks that a logged in user can create a new blog
    it('A blog can be created', function() {
      cy.contains('New note').click()
      cy.get('#url').type('localhost')
      cy.get('#author').type('hihi')
      cy.get('#title').type('Something I dont know')
      cy.get('#addBlogBtn').click()
      cy.get('#notification').should('contain', 'a new blog')
      cy.contains('Something I dont know')
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.contains('New note').click()
        cy.get('#url').type('localhost')
        cy.get('#author').type('hihi')
        cy.get('#title').type('Something I dont know')
        cy.get('#addBlogBtn').click()
      })
      // Make a test which checks that user can like a blog.
      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })
      // Make a test for ensuring that the user who created a blog can delete it.

      it('A blog can be deleted', function() {
        cy.contains('Something I dont know')
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Something I dont know').should('not.exist')
      })
      // Make a test which checks that the blogs are ordered according to likes with the blog with the most likes being first.
      it('The blogs are ordered according to likes', function() {
        cy.contains('New note').click()
        cy.get('#url').type('localhost 2')
        cy.get('#author').type('hihi 2')
        cy.get('#title').type('Something I dont know 2')
        cy.get('#addBlogBtn').click()
        cy.contains('Something I dont know 2')
          .contains('view')
          .click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.get('#blogs')
          .find('div')
          .as('theBlogsList')

        cy.get('@theBlogsList')
          .find('button')
          .then((buttons) => {
            cy.wrap(buttons.click())
          })

        cy.get('@theBlogsList').then((blogs) => {
          cy.get(blogs[0]).contains('Something I dont know 2')

          cy.get('.blog:last').contains('Something I dont know')
          // cy.wrap(blogs[0]).should('contain', 'likes 1')
          // cy.wrap(blogs[1]).should('contain', 'likes 0')
        })
      })
    })
  })
})
