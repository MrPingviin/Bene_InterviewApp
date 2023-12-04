type CityInfo = {
    info: {
        weather: {
            id: number,
            main: string,
            description: string,
            icon: string
        },
        main: {
            temp: number,
            feels_like: number,
            temp_min: number,
            temp_max: number,
            pressure: number,
            humidity: number
        },
        sunrise?: number,
        sunset?: number,
        sunrise_hour?: number,
        sunrise_minute?: number,
        sunset_hour?: number,
        sunset_minute?: number,
        sys: {
            sunrise: number,
            sunset: number
        },
        timezone: number
    }
};

export type { CityInfo };