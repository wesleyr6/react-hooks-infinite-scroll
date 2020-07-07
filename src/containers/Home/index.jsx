import React, { useContext } from "react";
import Head from "../../components/Head";
import MasterPage from "../../components/MasterPage";
import Wrapper from "../../components/Wrapper";
import Search from "../../components/Search";
import SearchContext from "../../context/search";
import Loader from "../../components/Loader";
import AlertMessages from "../../components/AlertMessages";
import ListOfItems from "../../components/ListOfItems";
import "./index.sass";

const Home = () => {
  const { searchLoading, searchResults, searchError } = useContext(
    SearchContext
  );

  return (
    <>
      <Head title="Stolen Bikes" description="" uri="/" image="" />

      <MasterPage>
        <Wrapper>
          <Search />

          <AlertMessages
            show={!searchLoading && !!searchError}
            type="error"
            message={searchError}
          />

          {searchLoading && <Loader />}

          {!searchLoading && searchResults.length > 0 && (
            <ListOfItems items={searchResults} />
          )}
        </Wrapper>
      </MasterPage>
    </>
  );
};

export default Home;
