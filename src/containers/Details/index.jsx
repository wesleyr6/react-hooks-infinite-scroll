import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import Head from "../../components/Head";
import MasterPage from "../../components/MasterPage";
import Wrapper from "../../components/Wrapper";
import AlertMessages from "../../components/AlertMessages";
import Loader from "../../components/Loader";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../configs/variables";
import { fetchCaseDetailAction } from "../../actions/stolen_bikes";
import styles from "./index.module.sass";

const Details = ({ computedMatch }) => {
  const [loading, setLoading] = useState(true);
  const [detailsError, setDetailsError] = useState("");
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, [computedMatch.params.id]);

  const fetchDetails = async () => {
    setLoading(true);

    try {
      const { incident } = await fetchCaseDetailAction(computedMatch.params.id);
      setDetails(incident);
    } catch (err) {
      setDetailsError(err);
    }

    setLoading(false);
  };

  return (
    <>
      <Head
        title={details.title ? details.title : "Stolen Bikes details"}
        description={details.description ? details.description : ""}
        uri={computedMatch.url}
        image={
          details.media && details.media.image_url
            ? details.media.image_url
            : ""
        }
      />

      <MasterPage>
        <Wrapper>
          {loading ? (
            <Loader />
          ) : (
            <>
              <AlertMessages
                show={!!detailsError}
                type="error"
                message={detailsError}
              />

              {!detailsError && (
                <>
                  <h1 className={styles.title}>{details.title}</h1>
                  <div className={styles.text}>
                    <span>
                      <strong>Stolen</strong>{" "}
                      <time>
                        {moment
                          .unix(details.occurred_at)
                          .tz("Europe/Berlin")
                          .format("MMM Do, hha")}{" "}
                        CET
                      </time>{" "}
                      <strong>at</strong>{" "}
                    </span>
                    <address className={styles.address}>
                      {details.address}
                    </address>
                  </div>

                  <div className={styles.maps}>
                    <iframe
                      title="Google Maps"
                      src={`https://www.google.com/maps/embed/v1/search?key=${REACT_APP_GOOGLE_MAPS_KEY}&q=${details.address}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  </div>

                  <h2 className={styles.descriptionTitle}>
                    Description of Incident
                  </h2>
                  <p className={styles.text}>
                    {details.description ||
                      "There is no description for this case."}
                  </p>
                </>
              )}
            </>
          )}
        </Wrapper>
      </MasterPage>
    </>
  );
};

Details.propTypes = {
  computedMatch: PropTypes.instanceOf(Object).isRequired,
};

export default Details;
