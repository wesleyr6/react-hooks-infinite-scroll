import { APIResquest } from "../utils/api";

export function fetchSearchAction(params) {
  return APIResquest({
    uri: "incidents",
    method: "GET",
    params,
  });
}

export function fetchCaseDetailAction(id) {
  return APIResquest({
    uri: `incidents/${id}`,
    method: "GET",
  });
}
