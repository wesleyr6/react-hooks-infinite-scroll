import axios from "axios";
import { REACT_APP_API_URL } from "../configs/variables";

export const API = REACT_APP_API_URL;

export const APIResquest = async (config) => {
  let requestURI = config.uri;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (/^https?/.test(requestURI) === false) {
    requestURI = `${API}/${requestURI}`;
  }

  const requestConfig = () => {
    const settings = {
      method: config.method,
      headers: {
        ...headers,
        ...(config.headers || null),
      },
      params: config.params || null,
    };

    if (config.method === "POST" || config.method === "PUT") {
      if (
        settings.headers["Content-Type"] &&
        settings.headers["Content-Type"].includes("multipart")
      ) {
        settings.data = config.data;
      } else {
        settings.data = JSON.stringify(config.data || {});
      }
    }

    return settings;
  };

  const promiseResquestAPI = async () => {
    try {
      const { data } = await axios(requestURI, requestConfig());
      return data;
    } catch (err) {
      const errorMessage = "OPS! Something went wrong!";

      if (err.response && err.response.data && err.response.data.error) {
        throw err.response.data.error;
      }

      throw errorMessage;
    }
  };

  return promiseResquestAPI();
};

export default { API, APIResquest };
