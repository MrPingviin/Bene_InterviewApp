import { SavedCitiesFilterer, SavedCitiesDownloader } from "./city_search_logic.tsx";
import { CityHistory } from "../../types/cityHistory.ts";
import { describe, test, expectTypeOf } from 'vitest'

describe('City Search Logic tests:', () => {
    test('SavedCitiesDownloader() => type of return value should be CityHistory[]', async () => {
        const returnVal = await SavedCitiesDownloader();
        expectTypeOf(returnVal).toEqualTypeOf<CityHistory[]>();
    })

    test('SavedCitiesFilterer() => type of return value should be string[]', async () => {
        const returnVal = await SavedCitiesFilterer("Budapest");
        expectTypeOf(returnVal).toEqualTypeOf<string[]>();
    })
});