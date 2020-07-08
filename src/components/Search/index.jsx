import React, { useContext, useState, useEffect } from "react";
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

  const [defaultSearch, setDefaultSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const watchDateFrom = watch("txtDateFrom");
  const watchDateTo = watch("txtDateTo");

  useEffect(() => {
    if (!history.location.search) {
      updateSearchHistory(getValues());
    } else {
      fetchResults();
    }

    // eslint-disable-next-line
  }, [history.location.search]);

  const onHandlePageChange = async (page) => {
    setUpdateHistory([{ name: "page", value: page }]);
  };

  const updateSearchHistory = (fields) => {
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

  const onHandleSubmit = (fields) => {
    updateSearchHistory(fields);
  };

  const fetchResults = () => {
    const { dateFrom, dateTo, search, page } =
      queryString.parse(history.location.search) || "";

    if (dateFrom && isValidUnixDate(dateFrom)) {
      const formatDate = moment.unix(dateFrom).format();

      if (formatDate) {
        setValue("txtDateFrom", new Date(formatDate));
      }
    }

    if (dateTo && isValidUnixDate(dateTo)) {
      const formatDate = moment.unix(dateTo).format();

      if (formatDate) {
        setValue("txtDateTo", new Date(formatDate));
      }
    }

    if (search) {
      setDefaultSearch(search);
    }

    const newFields = getValues();

    if (page && isNumber(page)) {
      setCurrentPage(Number(page));
      newFields.page = Number(page);
    } else {
      newFields.page = currentPage;
    }

    if (newFields.txtDateFrom) {
      newFields.txtDateFrom = moment(newFields.txtDateFrom).unix();
    }

    if (newFields.txtDateTo) {
      newFields.txtDateTo = moment(newFields.txtDateTo).unix();
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
        <Col lg={4} md={4} sm={12} xs={12}>
          <Field
            type="text"
            name="txtSearch"
            id="txtSearch"
            placeholder="search case descriptions"
            defaultValue={defaultSearch}
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
          totalItems={300}
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
