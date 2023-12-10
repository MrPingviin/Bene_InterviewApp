import { CityHistory } from "../../src/types/cityHistory.ts";
import { findASavedCity, findANonSavedCity } from "./logic.ts";

const removeSavedCity = (cityName: string) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3500/delete',
        body: {
            city_name: cityName
        }
    })
};

describe('Page City-Search tests:', () => {
    describe('Checks if:', () => {
        let savedCity;
        let nonSavedCity;

        before(async () => {
            const downloadedSavedCity = await findASavedCity();
            const downloadedNonSavedCity = await findANonSavedCity();

            savedCity = downloadedSavedCity.city_name;
            nonSavedCity = downloadedNonSavedCity.city_name;
        });

        it('the page appears', () => {
            cy.visit('http://localhost:5173/search')
            cy.url().should('eq', 'http://localhost:5173/search')
        })

        it('you won`t get any already saved capital as a search result', () => {
            cy.visit('http://localhost:5173/search')
            cy.get('input.input_search').type(savedCity)
            cy.get('ul.search_results')
            cy.get('li.search_results_empty');
        })

        it('you get a search result for a valid and not saved capital', () => {
            cy.visit('http://localhost:5173/search')
            cy.get('input.input_search').type(nonSavedCity)
            cy.get('ul.search_results')
            cy.get('li.search_result');
            cy.get('p.search_result_cityname').contains(nonSavedCity);
        })

        it('the save button appears on selecting a search result', () => {
            cy.visit('http://localhost:5173/search')
            cy.get('input.input_search').type(nonSavedCity)
            cy.get('ul.search_results')
            cy.get('li.search_result').first().click();
            cy.get('button.button_save');
        })

        it('clicking on the save button the page redirects the user to the main page and the item appears as a saved one', () => {
            cy.visit('http://localhost:5173/search')
            cy.wait(1000);
            cy.get('input.input_search').type(nonSavedCity)
            cy.get('ul.search_results')
            cy.get('li.search_result').first().click();
            cy.get('button.button_save').click();
            cy.url().should('eq', 'http://localhost:5173/')
            cy.get('li.list_item').contains(nonSavedCity);
            removeSavedCity(nonSavedCity);
        })
    });
})