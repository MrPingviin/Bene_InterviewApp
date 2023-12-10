import { CityInfo } from "../../types/cityInfo.ts";

const emptyCityInfo: CityInfo = {
  info: {
    weather: {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    sys: {
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
  },
};

const OpenWeatherIconGetter = (iconName: string) => {
  return `http://openweathermap.org/img/w/${iconName}.png`;
};

const GetCityInfo = async (cityName: string): Promise<CityInfo> => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city_name: cityName }),
    };
    const response = await fetch(
      "http://localhost:3500/download/weather_info",
      options
    );
    const data = await response.json();
    return data as CityInfo;
  } catch (error) {
    console.log(error);
    alert("Error while getting the city infos. Please try again.");
    window.location.href = "/";
    return emptyCityInfo;
  }
};

export { OpenWeatherIconGetter, GetCityInfo };
