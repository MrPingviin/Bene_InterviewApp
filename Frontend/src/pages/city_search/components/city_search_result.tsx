import "./../city_search.scss";

type SearchResultItemProps = {
  result: string;
  searchWord: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: string;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  result,
  searchWord,
  setSelectedItem,
  selectedItem,
}) => {
  if (searchWord.trim() === "") {
    return <></>;
  }

  const wordToInspect = result.toLowerCase();
  const wordToHighlight = searchWord.toLowerCase();
  const indexOfWordToHighlight = wordToInspect.indexOf(wordToHighlight);
  const startPart = result.slice(0, indexOfWordToHighlight);
  const highlightPart = result.slice(
    indexOfWordToHighlight,
    indexOfWordToHighlight + wordToHighlight.length
  );

  const endPart = result.slice(indexOfWordToHighlight + wordToHighlight.length);

  const setItemToSelected = () => {
    setSelectedItem(result);
  };

  const saveItem = async () => {
    try {
      const response = await fetch("http://localhost:3500/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city_name: result }),
      });
      const data = await response.json();
      console.log(data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Error while saving the city. Please try again.");
    }
  };

  return (
    <li key={result} className="search_result" onClick={setItemToSelected}>
      <p className="search_result_cityname">
        {startPart}
        <span className="search_highlighted">{highlightPart}</span>
        {endPart}
      </p>
      {selectedItem.trim().length > 0 &&
        result.toLowerCase().trim() === selectedItem.toLowerCase().trim() && (
          <button
            key={`save_button_${result}`}
            className="button_save"
            onClick={saveItem}
          >
            Save
          </button>
        )}
    </li>
  );
};

export default SearchResultItem;
