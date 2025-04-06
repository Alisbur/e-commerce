import qs from 'qs';

export const makeSearchParams = ({ searchConfig }: { searchConfig: object }) => {
  return qs.stringify(searchConfig, { encode: false });
};
