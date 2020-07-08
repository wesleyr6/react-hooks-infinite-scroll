import React, { createContext, useState } from "react";
import { fetchSearchAction } from "../actions/stolen_bikes";

const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const itemsPerPage = 10;

  const fetchSearch = async (fields) => {
    setSearchLoading(true);

    const newFields = fields;

    try {
      const { incidents } = await fetchSearchAction({
        occurred_before: newFields.txtDateTo,
        occurred_after: newFields.txtDateFrom,
        page: newFields.page || 1,
        per_page: itemsPerPage,
        incident_type: "theft",
        query: newFields.txtSearch,
      });
      setSearchResults(incidents);
    } catch (err) {
      setSearchError(err);
    }

    setSearchLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchLoading,
        searchResults,
        searchError,
        fetchSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export const SearchConsumer = SearchContext.Consumer;

export default SearchContext;
