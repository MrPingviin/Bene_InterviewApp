import { HistoryGetter } from "./city_list_logic.ts";
import { CityHistory } from "../../types/cityHistory";
import { describe, test, expectTypeOf } from 'vitest'

describe('City List Logic tests:', () => {
    test('HistoryGetter() => type of return value should be CityHistory', async () => {
        const cityHistory = await HistoryGetter();
        expectTypeOf(cityHistory).toEqualTypeOf<CityHistory[]>();
    })
});