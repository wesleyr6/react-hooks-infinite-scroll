import React from "react";
import Head from "../../components/Head";
import MasterPage from "../../components/MasterPage";
import Wrapper from "../../components/Wrapper";
import styles from "./index.module.sass";

const Page404 = () => {
  return (
    <>
      <Head title="Page not found" description="" uri="/404" image="" />

      <MasterPage>
        <Wrapper>
          <h1 className={styles.title}>OPS! Page not found!</h1>
        </Wrapper>
      </MasterPage>
    </>
  );
};

export default Page404;
