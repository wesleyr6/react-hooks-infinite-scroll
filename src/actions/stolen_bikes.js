import { APIResquest } from "../utils/api";

export function fetchSearchAction(params) {
  return APIResquest({
    uri: "incidents",
    method: "GET",
    params,
  });
}
