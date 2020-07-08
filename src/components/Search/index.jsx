import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import SearchContext from "../../context/search";
import { Row, Col } from "../Grid";
import Paginator from "../Paginator";
import Button from "../Button";
import Loader from "../Loader";
import AlertMessages from "../AlertMessages";
import Field from "../Field";
import styles from "./index.module.sass";

const Search = ({ itemsBeingShowed, children }) => {
  const { handleSubmit, register, errors, control, watch } = useForm({
    validateCriteriaMode: "all",
  });

  const { searchLoading, searchResults, searchError } = useContext(
    SearchContext
  );

  const watchDateFrom = watch("txtDateFrom");
  const watchDateTo = watch("txtDateTo");

  const onHandleSubmit = (fields) => {
    console.log(fields);
  };

  return (
    <form
      className={styles.search}
      onSubmit={handleSubmit(onHandleSubmit)}
      method="GET"
    >
      <Row className={styles.filters}>
        <Col lg={4} md={4} sm={12} xs={12}>
          <Field
            type="text"
            name="txtSearch"
            id="txtSearch"
            placeholder="search case descriptions"
            inputErrors={errors}
            ref={register}
          />
        </Col>

        <Col lg={3} md={3} sm={6} xs={6}>
          <Controller
            control={control}
            name="txtDateFrom"
            defaultValue={new Date(moment().subtract(3, "months"))}
            rules={{ required: true }}
            as={({ value, onChange }) => {
              return (
                <Field
                  type="date"
                  name="txtDateFrom"
                  id="txtDateFrom"
                  placeholderText="from"
                  dateFormat="dd/MM/yyyy"
                  maxDate={watchDateTo || new Date()}
                  inputErrors={errors}
                  onChange={onChange}
                  selected={value}
                />
              );
            }}
          />
        </Col>

        <Col lg={3} md={3} sm={6} xs={6}>
          <Controller
            control={control}
            name="txtDateTo"
            defaultValue={new Date()}
            rules={{ required: true }}
            as={({ value, onChange }) => {
              return (
                <Field
                  type="date"
                  name="txtDateTo"
                  id="txtDateTo"
                  placeholderText="to"
                  dateFormat="dd/MM/yyyy"
                  minDate={watchDateFrom || ""}
                  maxDate={new Date()}
                  inputErrors={errors}
                  onChange={onChange}
                  selected={value}
                />
              );
            }}
          />
        </Col>

        <Col lg={2} md={2} sm={12} xs={12}>
          <Button type="submit" className={styles.btn} text="find cases" />
        </Col>
      </Row>

      <AlertMessages
        show={!searchLoading && !!searchError}
        type="error"
        message={searchError}
      />

      {searchLoading ? (
        <Loader />
      ) : (
        <>
          {searchResults.length > 0 ? (
            <div className={styles.totalItems}>
              <span>total: {searchResults.length}</span>
            </div>
          ) : (
            <div className={styles.noResults}>
              <span>No results</span>
            </div>
          )}
        </>
      )}

      {children}

      {!searchLoading && searchResults.length > 0 && (
        <Paginator
          itemsBeingShowed={searchResults.length}
          currentPage={1}
          totalItems={300}
          onHandlePageChange={(showing, page) => {}}
        />
      )}
    </form>
  );
};

Search.propTypes = {
  children: PropTypes.node,
};

Search.defaultProps = {
  children: [],
};

export default Search;
