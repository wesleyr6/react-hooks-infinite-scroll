import queryString from "query-string";

export function useUpdateHistory(history) {
  // properties = [{ name: 'history_property_name', value: 'history_property_value'}]

  function setUpdateHistory(properties) {
    if (history && history.location && properties && properties.length > 0) {
      const getUrlParams = new URLSearchParams(history.location.search);
      const parsedQuery = queryString.parse(history.location.search);

      for (let i = 0; i < properties.length; i++) {
        if (parsedQuery[properties[i].name] !== undefined) {
          getUrlParams.set(properties[i].name, properties[i].value);
        } else {
          getUrlParams.append(properties[i].name, properties[i].value);
        }
      }

      history.push({
        pathname: history.location.pathname,
        search: `?${getUrlParams.toString()}`,
      });
    }
  }

  return [setUpdateHistory];
}
