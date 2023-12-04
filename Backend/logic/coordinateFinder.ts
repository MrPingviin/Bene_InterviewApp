import env from 'dotenv';
env.config();
const API_KEY = process.env.OPEN_WEATHER_API_KEY || "";
import { CoordinateFinderResult } from '../types/coordinateFinderResult.ts';

const errorResult: CoordinateFinderResult = {
    city_name: "",
    lat: 0,
    lon: 0
 };

const coordinateFinder = async (cityName: string): Promise<CoordinateFinderResult> => {
    try {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
        const response = await fetch(url);
        
        if (response.ok) {
            const result: unknown = await response.json();

            if (Array.isArray(result)) {
                if (result[0].name, result[0].lat, result[0].lon) {
                    const cityInformations: CoordinateFinderResult = {
                        city_name: result[0].name,
                        lat: result[0].lat,
                        lon: result[0].lon,
                    };
    
                    return cityInformations;
                 };
                 return errorResult;
            } 
            return errorResult;
        } else {
            return errorResult;
        }
    } catch (error) {
        console.error(error);
        return errorResult;
    }
};


export { coordinateFinder };