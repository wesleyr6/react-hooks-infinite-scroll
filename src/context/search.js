import React, { createContext, useState } from "react";
import JSON_searchResults from "../mocks/searchResuts.json";
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(JSON_searchResults.data);
  const [searchError, setSearchError] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchLoading,
        setSearchLoading,
        searchResults,
        setSearchResults,
        searchError,
        setSearchError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const SearchConsumer = SearchContext.Consumer;

export default SearchContext;
