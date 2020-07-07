import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Row, Col } from "../Grid";
import Button from "../Button";
import Field from "../Field";
import styles from "./index.module.sass";

const Search = () => {
  const { handleSubmit, register, errors, control, watch } = useForm({
    validateCriteriaMode: "all",
  });

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
      <Row>
        <Col lg={4} md={4} xs={12}>
          <Field
            type="text"
            name="txtSearch"
            id="txtSearch"
            placeholder="search case descriptions"
            inputErrors={errors}
            ref={register}
          />
        </Col>

        <Col lg={3} md={3} xs={6}>
          <Controller
            control={control}
            name="txtDateFrom"
            defaultValue=""
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

        <Col lg={3} md={3} xs={6}>
          <Controller
            control={control}
            name="txtDateTo"
            defaultValue=""
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

        <Col lg={2} md={2} xs={12}>
          <Button type="submit" text="find cases" />
        </Col>
      </Row>
    </form>
  );
};

export default Search;
