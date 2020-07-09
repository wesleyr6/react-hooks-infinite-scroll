import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import SearchContext from "../../context/search";
import { Row, Col } from "../Grid";
import Paginator from "../Paginator";
import Button from "../Button";
import Loader from "../Loader";
import AlertMessages from "../AlertMessages";
import Field from "../Field";
import { useUpdateHistory } from "../../hooks/search";
import { isNumber, isValidUnixDate } from "../../helpers";
import styles from "./index.module.sass";

const Search = ({ children, history }) => {
  const [setUpdateHistory] = useUpdateHistory(history);

  const {
    handleSubmit,
    register,
    errors,
    control,
    watch,
    getValues,
    setValue,
  } = useForm({
    validateCriteriaMode: "all",
  });

  const { searchLoading, searchResults, searchError, fetchSearch } = useContext(
    SearchContext
  );

  const [currentPage, setCurrentPage] = useState(1);

  const defaultDateFrom = new Date(moment().subtract(1, "months"));
  const defaultDateTo = new Date();

  const watchDateFrom = watch("txtDateFrom");
  const watchDateTo = watch("txtDateTo");

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, [history.location.search]);

  const onHandlePageChange = async (page) => {
    setUpdateHistory([{ name: "page", value: page }]);
  };

  const onHandleSubmit = (fields) => {
    const newFields = fields;

    if (fields.txtDateFrom) {
      newFields.txtDateFrom = moment(fields.txtDateFrom).unix();
    }

    if (fields.txtDateTo) {
      newFields.txtDateTo = moment(fields.txtDateTo).unix();
    }

    const historyFields = [
      { name: "search", value: newFields.txtSearch },
      { name: "dateFrom", value: newFields.txtDateFrom },
      { name: "dateTo", value: newFields.txtDateTo },
      { name: "page", value: 1 },
    ];

    setUpdateHistory(historyFields);
  };

  const getQueryStringAndUpdateFields = () => {
    const { dateFrom, dateTo, search, page } =
      queryString.parse(history.location.search) || "";

    if (dateFrom && isValidUnixDate(dateFrom)) {
      const formatDate = moment.unix(dateFrom).format();
      setValue("txtDateFrom", new Date(formatDate));
    } else {
      setValue("txtDateFrom", defaultDateFrom);
    }

    if (dateTo && isValidUnixDate(dateTo)) {
      const formatDate = moment.unix(dateTo).format();
      setValue("txtDateTo", new Date(formatDate));
    } else {
      setValue("txtDateTo", defaultDateTo);
    }

    if (search || search === "") {
      setValue("txtSearch", search);
    } else {
      setValue("txtSearch", "");
    }

    if (page && isNumber(page)) {
      setCurrentPage(Number(page));
      setValue("txtPage", Number(page));
    } else {
      setCurrentPage(Number(1));
      setValue("txtPage", Number(1));
    }
  };

  const fetchResults = () => {
    if (history.location.search === "") {
      // RESET FIELDS TO DEFAULT VALUES WHEN CLEAR THE QUERY STRING PARAMS
      setValue("txtDateFrom", defaultDateFrom);
      setValue("txtDateTo", defaultDateTo);
      setValue("txtSearch", "");
      setValue("txtPage", 1);
      setCurrentPage(Number(1));
    } else {
      // VALIDATE QUERY STRING PARAMS AND FILL THE SEARCH FIELDS
      getQueryStringAndUpdateFields();
    }

    const newFields = getValues();

    if (newFields.txtDateFrom) {
      newFields.txtDateFrom = moment(newFields.txtDateFrom).unix();
    }

    if (newFields.txtDateTo) {
      newFields.txtDateTo = moment(newFields.txtDateTo).unix();
    }

    if (newFields.txtPage) {
      newFields.txtPage = Number(newFields.txtPage);
    }

    fetchSearch(newFields);
  };

  return (
    <form
      className={styles.search}
      onSubmit={handleSubmit(onHandleSubmit)}
      method="GET"
    >
      <Row className={styles.filters}>
        <Col xl={6} lg={5} md={12} xs={12}>
          <Field
            type="text"
            name="txtSearch"
            id="txtSearch"
            placeholder="search case descriptions"
            defaultValue=""
            inputErrors={errors}
            ref={register}
            className={styles.searchInput}
          />
        </Col>

        <Col xl={2} lg={2} md={6} xs={6}>
          <Controller
            control={control}
            name="txtDateFrom"
            defaultValue={defaultDateFrom}
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

        <Col xl={2} lg={2} md={6} xs={6}>
          <Controller
            control={control}
            name="txtDateTo"
            defaultValue={defaultDateTo}
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

        <Col xl={2} lg={3} md={12} xs={12}>
          <input type="hidden" name="txtPage" ref={register} defaultValue={1} />

          <Button
            type="submit"
            className={styles.btn}
            text="find cases"
            disabled={searchLoading}
          />
        </Col>
      </Row>

      <AlertMessages
        show={!searchLoading && !!searchError}
        type="error"
        message={searchError}
      />

      {searchLoading && <Loader />}

      {!searchLoading && !searchError && (
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
          currentPage={currentPage}
          totalItems={100}
          onHandlePageChange={(showing, page) => onHandlePageChange(page)}
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

export default withRouter(Search);
