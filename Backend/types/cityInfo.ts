type CityInfo = {
    weather: [{
        id: number,
        main: string,
        description: string,
        icon: string
    }],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    sys: {
        sunrise: number,
        sunset: number
    },
    timezone: number
};


export type { CityInfo };