import React from "react";
import Wrapper from "../Wrapper";
import IMG_Logo from "../../assets/images/berlin-police-logo.png";
import styles from "./index.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper alignItems="center">
        <img src={IMG_Logo} alt="Logo" className={styles.logo} />
        <div className={styles.logoContent}>
          <span className={styles.logoTitle}>Police Department of Berlin</span>
          <span className={styles.logoSubtitle}>Stolen Bikes</span>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
