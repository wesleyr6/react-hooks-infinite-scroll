import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Head = ({ title, description, image, url }) => {
  return (
    <Helmet>
      <title>{title}: Police Department of Berlin</title>
      <meta
        property="og:title"
        content={`${title}: Police Department of Berlin`}
      />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />

      <meta itemprop="image" content={image} />
      <meta name="twitter:image" content={image} />

      <meta property="og:url" content={url} />
      <meta name="twitter:site" content={url} />
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  uri: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Head.defaultProps = {
  image: "/logo512.png",
  description: "",
};

export default Head;
