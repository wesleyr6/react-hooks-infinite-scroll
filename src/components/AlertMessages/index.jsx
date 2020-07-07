import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.sass";

// Types (success as default): warning, success, error, info

const AlertMessages = ({ show, type, message, className }) => {
  if (show) {
    return (
      <div
        className={`${styles.alertMessages} ${
          styles[`alertMessages-${type}`]
        } ${className}`}
      >
        <i className={`icon-${type} ${styles.icon}`} />
        <span
          className={styles.messageDescription}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    );
  }

  return <></>;
};
AlertMessages.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.node,
  className: PropTypes.string,
};
AlertMessages.defaultProps = {
  message: null,
  type: "success",
  show: true,
  className: "",
};
export default AlertMessages;
