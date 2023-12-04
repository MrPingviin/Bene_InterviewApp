import { useEffect, useState } from "react";
import "./city_search.scss";
import { ImSearch } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { SavedCitiesFilterer } from "./city_search_logic.tsx";
import SearchResultItem from "./components/city_search_result.tsx";

const Page_city_search: React.FC = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<string[]>([""]);

  const redirectUser = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchWord.trim().length >= 2) {
        try {
          setLoadingState(true);
          const results = await SavedCitiesFilterer(searchWord);
          setSearchResults(results.sort().slice(0, 8));
          setLoadingState(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchResults([""]);
      }
    };

    setSelectedItem("");
    fetchSearchResults();
  }, [searchWord]);

  return (
    <section className="page_city_search">
      <div className="search_window">
        <div className="search_window_toolbar">
          <button className="button_back" onClick={() => redirectUser()}>
            <IoIosArrowBack />
          </button>
        </div>
        <div className="search_window_body">
          <div className="search_input">
            <input
              type="text"
              className="input_search"
              placeholder="Search..."
              onChange={(e) => setSearchWord(e.currentTarget.value)}
            />
            {searchWord.length === 0 && <ImSearch className="icon" />}
            {searchWord.length > 0 && <IoIosArrowDown className="icon" />}
          </div>
          {!loadingState && searchWord.length >= 2 && (
            <ul className="search_results">
              {searchResults.map((result) => {
                return (
                  <SearchResultItem
                    result={result}
                    searchWord={searchWord}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                  />
                );
              })}
              {searchResults.length === 0 && searchWord.length > 0 && (
                <li key="no_results" className="search_results_empty">
                  No results found.
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page_city_search;
