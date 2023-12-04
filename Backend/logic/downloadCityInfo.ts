import fetch from 'node-fetch';
import env from 'dotenv';
env.config();
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
import { CityInfo } from '../types/cityInfo.ts';

const emptyCityInfo: CityInfo = {
    weather: [{
        id: 0,
        main: "",
        description: "",
        icon: ""
    }],
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0
    },
    sys: {
        sunrise: 0,
        sunset: 0
    },
    timezone: 0
};

const downloadCityInfo = async (lat: number, lon: number): Promise<CityInfo> => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (response.ok) {
            const data = await response.json();
            return data as CityInfo;
        }
        return emptyCityInfo;
    } catch (error) {
        console.log(error);
        return emptyCityInfo;
    }
};

export { downloadCityInfo };