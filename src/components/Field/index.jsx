import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import styles from "./index.module.sass";

const InputRender = React.forwardRef(({ type, ...rest }, ref) => {
  switch (type) {
    case "textarea": {
      return <textarea ref={ref} {...rest} />;
    }

    case "select": {
      return <select ref={ref} {...rest} />;
    }

    case "date": {
      return (
        <DatePicker
          calendarClassName="datepicker-default"
          ref={ref}
          {...rest}
        />
      );
    }

    default: {
      return <input type={type} ref={ref} {...rest} />;
    }
  }
});

InputRender.propTypes = {
  type: PropTypes.string.isRequired,
};

const Field = React.forwardRef((props, ref) => {
  const {
    type,
    label,
    id,
    className,
    description,
    name,
    inputErrors,
    title,
    ...rest
  } = props;

  let errorMessage;
  const errorClassName = inputErrors ? inputErrors[name] : null;

  if (inputErrors && inputErrors[name]) {
    if (inputErrors[name].type && inputErrors[name].type === "required") {
      errorMessage = "Required field";
    } else {
      errorMessage = inputErrors[name].message;
    }
  }

  return (
    <fieldset className={styles.fieldset}>
      <label
        htmlFor={id}
        className={`${styles.label} ${label ? "" : styles.labelHide}`}
      >
        {label ? label : name}
      </label>

      <InputRender
        ref={ref}
        name={name}
        type={type}
        style={label ? { marginTop: "5px" } : null}
        className={`${styles.field} ${className} ${
          errorClassName ? styles.error : ""
        }`}
        id={id}
        {...rest}
      />

      {!!errorMessage && (
        <small className={`${styles.description} ${styles.descriptionError}`}>
          {errorMessage}
        </small>
      )}

      {description && typeof description === "object" && (
        <small className={styles.description}>{description}</small>
      )}

      {description && typeof description !== "object" && (
        <small
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </fieldset>
  );
});

Field.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.node,
};

Field.defaultProps = {
  id: "",
  label: "",
  name: "",
  description: "",
  className: "",
};

export default Field;
