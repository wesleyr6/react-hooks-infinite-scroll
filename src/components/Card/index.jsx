import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import IMG_NoPhoto from "../../assets/images/no-image.svg";
import styles from "./index.module.sass";

const Card = ({
  id,
  title,
  description,
  occurred_at,
  updated_at,
  address,
  thumbnail,
}) => {
  return (
    <li className={styles.card}>
      <Link to={`/case/${id}`} className={styles.thumbnailLink}>
        <LazyLoadImage
          src={thumbnail ? thumbnail : IMG_NoPhoto}
          alt={title}
          effect="blur"
          className={styles.thumbnail}
        />
      </Link>

      <div className={styles.content}>
        <span className={styles.title}>
          <Link to={`/case/${id}`}>{title}</Link>
        </span>

        {description && (
          <span className={styles.description}>{description}</span>
        )}

        {occurred_at && (
          <span className={styles.description}>
            <strong>Ocurred at:</strong>{" "}
            {moment.unix(occurred_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </span>
        )}

        {updated_at && (
          <span className={styles.description}>
            <strong>Reported at:</strong>{" "}
            {moment.unix(updated_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </span>
        )}

        {address && (
          <span className={styles.description}>
            <strong>Location:</strong> {address}
          </span>
        )}
      </div>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  occurred_at: PropTypes.number,
  updated_at: PropTypes.number,
  address: PropTypes.string,
  thumbnail: PropTypes.string,
};

Card.defaultProps = {
  description: "",
  occurred_at: null,
  updated_at: null,
  address: null,
  thumbnail: null,
};

export default Card;
