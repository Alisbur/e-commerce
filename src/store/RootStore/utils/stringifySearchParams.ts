import qs from 'qs';

export const stringifySearchParams = (searchConfig: object): string => {
  return qs.stringify(searchConfig, { encode: false, skipNulls: true });
};
