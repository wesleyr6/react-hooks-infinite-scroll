import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import styles from "./index.module.sass";

const ListOfItems = ({ items }) => {
  if (items.length === 0) {
    return <></>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          occurred_at={item.occurred_at}
          updated_at={item.updated_at}
          address={item.address}
          thumbnail={
            item.media && item.media.image_url_thumb
              ? item.media.image_url_thumb
              : null
          }
        />
      ))}
    </ul>
  );
};

ListOfItems.propTypes = {
  items: PropTypes.instanceOf(Array),
};

ListOfItems.defaultProps = {
  items: [],
};

export default ListOfItems;
