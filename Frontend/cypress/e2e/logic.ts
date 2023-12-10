import { CityHistory } from '../../src/types/cityHistory.ts';
import { capitals } from '../../src/pages/city_search/city_search_logic.tsx';

const downloadCityHistory = async (): Promise<CityHistory[]> => {
    const raw = await fetch('http://localhost:3500/download/history');
    const res: CityHistory[] = await raw.json();
    return res;
}

const findASavedCity = async () => {
    const history = await downloadCityHistory();
    if (history && history.length > 0) {
        return {
            "city_name": history[0].city_name,
            "lat": 47.4979937,
            "lon": 19.0403594,
        } as CityHistory;
    }
    return {
        "city_name": "Budapest",
        "lat": 47.4979937,
        "lon": 19.0403594,
    } as CityHistory;
}

const findANonSavedCity = async () => {
    const history = await downloadCityHistory();
    const historyCapitals = history.map((item: CityHistory) => item.city_name);
    const city = capitals.find((item: string) => !historyCapitals.includes(item));
    if (city) {
        return {
            "city_name": city,
            "lat": 1,
            "lon": 1,
        } as CityHistory;
    }

    return {
        "city_name": "Budapest",
        "lat": 47.4979937,
        "lon": 19.0403594,
    } as CityHistory;
}

export { findASavedCity, findANonSavedCity };