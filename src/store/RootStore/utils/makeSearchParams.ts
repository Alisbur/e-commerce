import qs from 'qs';

export const makeSearchParams = ({ searchConfig }: { searchConfig: object }): string => {
  return qs.stringify(searchConfig, { encode: false });
};
