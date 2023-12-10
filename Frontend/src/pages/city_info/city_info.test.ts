import { GetCityInfo } from './city_info_logic.tsx';
import { CityInfo } from "../../types/cityInfo.ts";
import { describe, test, expectTypeOf } from 'vitest'

describe('City Info Logic tests:', () => {
    test('GetCityInfo("Budapest") => type of return value should be CityInfo', async () => {
        const cityInfo = await GetCityInfo("Budapest");
        expectTypeOf(cityInfo).toEqualTypeOf<CityInfo>();
    })
});