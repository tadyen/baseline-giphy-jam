import * as React from "react";

const SearchResultsContext = React.createContext(null);

export default function SearchResultsContextProvider({children}: {children: React.ReactNode}){
  const [searchResults, setSearchResults] = React.useState()

  return(
    <SearchResultsContext.Provider value={searchResults}>
      {children}
    </SearchResultsContext.Provider>
  )
}

export function useSearchResultsContext(){
  const context = React.useContext(SearchResultsContext);
  if( context === undefined){
    throw new Error("useSearchResultsContext must be used within SearchResultsContextProvider");
  }
  return context;
}
