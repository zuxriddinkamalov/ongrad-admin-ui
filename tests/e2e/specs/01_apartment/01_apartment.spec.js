
const selector = {
  searchForm: {
    minPrice: 'input[data-cy="min-price"]',
    maxPrice: 'input[data-cy="max-price"]',
    rooms: 'div[data-cy="rooms"] input',
    yearAfter: 'div[data-cy="year-after"] input',
    yearBefore: 'div[data-cy="year-before"] input',
    notFirstLast: 'label[data-cy="not-first-last"]',
    startFloor: 'input[data-cy="start-floor"]',
    lastFloor: 'input[data-cy="last-floor"]'
  },
  content: {
    count: 'span[data-cy="count-wrap"]',
    card: 'div[data-cy="card-wrap"]'
  },
  button: {
    filterButton: 'button[data-cy="submit-button"]'
  }
}

context('Apartment filter', () => {
  beforeEach(() => {
    cy.server()
  })

  it('Filter', () => {
    const minPrice = 2000000
    const maxPrice = 4000000
    const rooms = [1, 2, 3, 4, 5]
    const yearAfter = '2006-05-26'
    const yearBefore = '2020-05-26'
    const startFloor = 3
    const lastFloor = 20

    cy
      .route('GET', `**api/v1/apartment/**`)
      .as('getApartmentList')

    cy.visit(`/`)

    cy.wait('@getApartmentList').then(({ status }) => {
      expect(status).to.equal(200)
    })

    cy.get(selector.searchForm.minPrice)
      .first()
      .type(minPrice)

    cy.get(selector.searchForm.maxPrice)
      .first()
      .type(maxPrice)

    rooms.map((item, index) => {
      cy.get(selector.searchForm.rooms)
        .first()
        .type(item)
        .type('{enter}')
        .type('{esc}')
        .wait(50)
    })

    cy.get(selector.searchForm.yearAfter)
      .first()
      .type(yearAfter)
      .type('{enter}')

    cy.get(selector.searchForm.yearBefore)
      .first()
      .type(yearBefore)
      .type('{enter}')

    cy.get(selector.searchForm.notFirstLast)
      .first()
      .click()

    cy.get(selector.searchForm.startFloor)
      .first()
      .type(startFloor)

    cy.get(selector.searchForm.lastFloor)
      .first()
      .type(lastFloor)

    cy.get(selector.button.filterButton).first().click()

    cy.wait('@getApartmentList')

    cy.get(selector.content.count).contains('0')
  })
})
