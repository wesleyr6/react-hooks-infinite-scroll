import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import IMG_Logo from "../../assets/images/berlin-police-logo.png";
import styles from "./index.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper alignItems="center">
        <Link to="/" className={styles.logoLink}>
          <img src={IMG_Logo} alt="Logo" className={styles.logo} />
        </Link>

        <div className={styles.logoContent}>
          <span className={styles.logoTitle}>Police Department of Berlin</span>
          <span className={styles.logoSubtitle}>Stolen Bikes</span>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
