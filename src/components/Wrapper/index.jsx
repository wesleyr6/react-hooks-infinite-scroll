import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.sass";

const Wrapper = ({ children, flexDirection, justifyContent, alignItems }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        flexDirection,
        justifyContent,
        alignItems,
        alignContent: alignItems,
      }}
    >
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  flexDirection: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
};

Wrapper.defaultProps = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

export default Wrapper;
