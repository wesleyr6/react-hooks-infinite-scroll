import React from "react";
import Wrapper from "../Wrapper";
import styles from "./index.module.sass";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper justifyContent="center" alignItems="center">
        <span className={styles.description}>© 2020 Wesley Amaro</span>
      </Wrapper>
    </footer>
  );
};

export default Footer;
