import { IoIosArrowBack } from "react-icons/io";
import "./city_info.scss";
import { OpenWeatherIconGetter } from "./city_info_logic.tsx";
import { useEffect, useState } from "react";
import { GetCityInfo } from "./city_info_logic.tsx";
import { CityInfo } from "../../types/cityInfo.ts";
import { FaTemperatureFull } from "react-icons/fa6";
import { FiSunrise, FiSunset } from "react-icons/fi";
import moment from "moment";
import { capitals } from "./../city_search/city_search_logic.tsx";
import Loading_Page from "./../loading/loading.tsx";

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

const Page_info: React.FC = () => {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [cityInfo, setCityInfo] = useState<CityInfo>(emptyCityInfo);
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [currentMinute, setCurrentMinute] = useState<number>(0);
  const URL = new URLSearchParams(window.location.search);
  const city = URL.get("city");

  const redirectUser = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    (!city || !capitals.includes(city) || city === "") &&
      (window.location.href = "/");
    city !== null &&
      GetCityInfo(city)
        .then((data) => {
          setCityInfo({
            info: {
              ...data.info,
              sunrise_hour: new Date(
                (data.info.sunrise as number) * 1000 + data.info.timezone
              ).getHours(),
              sunrise_minute: new Date(
                (data.info.sunrise as number) * 1000 + data.info.timezone
              ).getMinutes(),
              sunset_hour: new Date(
                (data.info.sunset as number) * 1000 + data.info.timezone
              ).getHours(),
              sunset_minute: new Date(
                (data.info.sunset as number) * 1000 + data.info.timezone
              ).getMinutes(),
            },
          });
          setInterval(() => {
            const utcMS = new Date().getTime();
            const utcMoment = moment.utc(utcMS);
            const targetMoment = utcMoment
              .clone()
              .utcOffset(data.info.timezone / 60);
            setCurrentHour(targetMoment.hours());
            setCurrentMinute(targetMoment.minutes());
          }, 1500);
        })
        .then(() => {
          setLoadingState(false);
        })
        .catch((error) => {
          console.log(error);
          /*    alert("Error while getting the city infos. Please try again.");
            window.location.href = "/"; */
        });
  }, [city]);

  return (
    <>
      {loadingState && <Loading_Page />}
      {!loadingState && (
        <section className="page_city_info">
          <div className="info_window">
            <div className="info_window_toolbar">
              <button className="button_back" onClick={() => redirectUser()}>
                <IoIosArrowBack />
              </button>
            </div>
            <div className="info_window_body">
              <div className="live_clock">
                <span>
                  {currentHour === 0
                    ? "0"
                    : currentHour < 10
                    ? "0" + currentHour
                    : currentHour}
                </span>
                <span>
                  {currentMinute === 0
                    ? "00"
                    : currentMinute < 10
                    ? "0" + currentMinute
                    : currentMinute}
                </span>
              </div>
              <h1 className="city_name">{city}</h1>
              <div className="weather">
                <img
                  src={OpenWeatherIconGetter(`${cityInfo.info.weather.icon}`)}
                  alt=""
                  className="weather_icon"
                />
                <h2 className="weather_description">
                  {cityInfo.info.weather.description}
                </h2>
              </div>
              <div className="weather_details">
                <div className="weather_details_item">
                  <FaTemperatureFull className="weather_details_item_icon" />
                  <span>{Math.round(cityInfo.info.main.temp)} °C</span>
                </div>
                <div className="weather_details_item">
                  <FiSunrise className="weather_details_item_icon" />
                  <span>
                    {cityInfo.info.sunrise_hour! < 10
                      ? "0" + cityInfo.info.sunrise_hour!
                      : cityInfo.info.sunrise_hour!}
                    :
                    {cityInfo.info.sunrise_minute! < 10
                      ? "0" + cityInfo.info.sunrise_minute!
                      : cityInfo.info.sunrise_minute!}
                    {/* ! Note: Make a function which handles these and returns the correct format */}
                  </span>
                </div>
                <div className="weather_details_item">
                  <FiSunset className="weather_details_item_icon" />
                  <span>
                    {cityInfo.info.sunset_hour! < 10
                      ? "0" + cityInfo.info.sunset_hour!
                      : cityInfo.info.sunset_hour!}
                    :
                    {cityInfo.info.sunset_minute! < 10
                      ? "0" + cityInfo.info.sunset_minute!
                      : cityInfo.info.sunset_minute!}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Page_info;
