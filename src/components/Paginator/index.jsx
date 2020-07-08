import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import styles from "./index.module.sass";

const Paginator = ({
  currentPage,
  totalItems,
  itemsBeingShowed,
  onHandlePageChange,
}) => {
  return (
    <Pagination
      firstPageText="<< First"
      prevPageText="< Prev"
      nextPageText="Next >"
      lastPageText="Last >>"
      innerClass={styles.list}
      linkClass={styles.link}
      activeLinkClass={styles.activeLink}
      activePage={currentPage}
      itemsCountPerPage={itemsBeingShowed}
      totalItemsCount={totalItems}
      pageRangeDisplayed={3}
      onChange={(page) => onHandlePageChange(itemsBeingShowed, page)}
    />
  );
};

Paginator.propTypes = {
  onHandlePageChange: PropTypes.func,
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  itemsBeingShowed: PropTypes.number,
};

Paginator.defaultProps = {
  onHandlePageChange: () => {},
  currentPage: 1,
  itemsBeingShowed: 1,
  totalItems: null,
};

export default Paginator;
