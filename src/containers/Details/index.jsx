import React from "react";
import moment from "moment-timezone";
import Head from "../../components/Head";
import MasterPage from "../../components/MasterPage";
import Wrapper from "../../components/Wrapper";
import { REACT_APP_GOOGLE_MAPS_KEY } from "../../configs/variables";
import { incident } from "../../mocks/details.json";
import styles from "./index.module.sass";

const Details = () => {
  return (
    <>
      <Head title="Stolen Bikes" description="" uri="/" image="" />

      <MasterPage>
        <Wrapper>
          <h1 className={styles.title}>{incident.title}</h1>
          <p className={styles.text}>
            <strong>Stolen</strong>{" "}
            <time>
              {moment
                .unix(incident.occurred_at)
                .tz("Europe/Berlin")
                .format("MMM Do, hha")}{" "}
              CET
            </time>{" "}
            <strong>at</strong>{" "}
            <address className={styles.address}>{incident.address}</address>
          </p>

          <div className={styles.maps}>
            <iframe
              title="Google Maps"
              src={`https://www.google.com/maps/embed/v1/search?key=${REACT_APP_GOOGLE_MAPS_KEY}&q=${incident.address}`}
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>

          <h2 className={styles.descriptionTitle}>Description of Incident</h2>
          <p className={styles.text}>{incident.description}</p>
        </Wrapper>
      </MasterPage>
    </>
  );
};

export default Details;
