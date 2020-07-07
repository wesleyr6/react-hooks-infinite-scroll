import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./index.module.sass";

const MasterPage = ({ children }) => {
  return (
    <div className={styles.masterpage}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default MasterPage;
