describe('Page City-Info Tests:', () => {
    it('Checks if the page appears upon searching for a valid capital', () => {
        cy.visit('http://localhost:5173/weather?city=Budapest')
        cy.url().should('include', '/weather?city=Budapest')
        cy.get("section.page_city_info")
        cy.get("div.info_window")
        cy.get('div.live_clock')
        cy.get("div.weather")
        cy.get("div.weather_details")
    })

    describe('Checks if the page navigates back the user to the main page upon:', () => {
        it('searching for a non-valid capital', () => {
            cy.visit('http://localhost:5173/weather?city=RandomCity')
            cy.url().should('eq', 'http://localhost:5173/')
        })

        it('leaving the city URL param empty', () => {
            cy.visit('http://localhost:5173/weather?city=')
            cy.url().should('eq', 'http://localhost:5173/')
        })

        it('visiting the address without a city param', () => {
            cy.visit('http://localhost:5173/weather?city=')
            cy.url().should('eq', 'http://localhost:5173/')
        })
    })

})