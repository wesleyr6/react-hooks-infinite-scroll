export const isNumber = (_string) => /^[0-9]*$/.test(_string);

export const isDate = (_date) => _date instanceof Date && !isNaN(_date);

export const isValidUnixDate = (_date) => {
  return isNumber(_date) && !isNaN(new Date(Number(_date)).getTime());
};
