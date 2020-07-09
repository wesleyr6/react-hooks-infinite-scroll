import React, { useContext } from "react";
import Head from "../../components/Head";
import MasterPage from "../../components/MasterPage";
import Wrapper from "../../components/Wrapper";
import Search from "../../components/Search";
import SearchContext from "../../context/search";
import ListOfItems from "../../components/ListOfItems";

const Home = () => {
  const { searchLoading, searchResults } = useContext(SearchContext);

  return (
    <>
      <Head title="Stolen Bikes" description="stolen bikes" uri="/" image="" />

      <MasterPage>
        <Wrapper>
          <Search>
            {!searchLoading && searchResults.length > 0 && (
              <ListOfItems items={searchResults} />
            )}
          </Search>
        </Wrapper>
      </MasterPage>
    </>
  );
};

export default Home;
