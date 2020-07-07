import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.sass";

const Button = ({ size, themeColorName, className, text, ...rest }) => {
  return (
    <button
      className={`${styles.btn} ${className} ${themeColorName}-theme ${size}`}
      {...rest}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  themeColorName: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: "",
  themeColorName: "gold",
  size: "",
};

export default Button;
