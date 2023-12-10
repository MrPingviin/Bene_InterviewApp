import { findASavedCity, findANonSavedCity } from "./logic.ts";
import { CityHistory } from "../../src/types/cityHistory.ts";

describe('Page City-List tests:', () => {
    describe('Checks if the:', () => {
        let savedCity;
        before(async () => {
            const downloadedSavedCity = await findASavedCity();
            savedCity = downloadedSavedCity.city_name;
        });

        it('page appears', () => {
          cy.visit('http://localhost:5173/')
          cy.url().should('eq', 'http://localhost:5173/') 
          cy.get('div#root')
          cy.get('section.page_city_list')
        })

        it('clicking on a city name navigates the user to the info page', () => {
            cy.visit('http://localhost:5173/')
            cy.get('li.list_item').contains('Budapest').click()
            cy.url().should('eq', `http://localhost:5173/weather?city=${savedCity}`)
            cy.get("section.page_city_info")
            cy.get("div.info_window")
            cy.get('div.live_clock')
            cy.get("div.weather")
            cy.get("div.weather_details")
        })
      
        it('plus button navigates the user to the search page', () => {
            cy.visit('http://localhost:5173/')
            cy.get('button.button_add').contains('+').click()
            cy.url().should('eq', 'http://localhost:5173/search')
            cy.get("section.page_city_search")
            cy.get("div.search_window")
            cy.get('div.search_input')
            cy.get("input.input_search")
        })

    });
  })