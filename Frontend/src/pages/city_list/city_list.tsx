import { useEffect, useState } from "react";
import "./city_list.scss";
import Loading_Page from "../loading/loading.tsx";
import { HistoryGetter } from "./city_list_logic.ts";
import { updateCityHistory } from "../../redux/state_manager.ts";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.ts";
import { CityHistory } from "../../types/cityHistory.ts";

const Page_list: React.FC = () => {
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const city_history = useAppSelector(
    (state) => state.stateManager.city_history
  );

  const redirectToCiyInfo = (city: string) => {
    window.location.href = "/weather?city=" + city;
  };

  const redirectToCitySearch = () => {
    window.location.href = "/search";
  };

  useEffect(() => {
    (async function () {
      try {
        const cityHistory: CityHistory[] = await HistoryGetter();
        if (cityHistory.length > 0) {
          dispatch(updateCityHistory(cityHistory));
          setLoadingState(false);
        } // ! Note: error message is WIP!
      } catch (error) {
        console.log(error);
        alert("An error occured while loading the saved cities.")
      }
    })();
  }, [dispatch]);

  return (
    <>
      {loadingState && <Loading_Page />}
      {!loadingState && (
        <section className="page_city_list">
          {city_history.length === 0 && <h1>No history was found.</h1>}
          {city_history.length > 0 && (
            <ul className="list_city">
              {city_history.map((item: string) => (
                  <li
                    key={item}
                    className="list_item"
                    onClick={() => redirectToCiyInfo(item)}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          )}
          <button className="button_add" onClick={() => redirectToCitySearch()}>
            +
          </button>
        </section>
      )}
    </>
  );
};

export default Page_list;
