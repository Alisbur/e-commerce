import qs from 'qs';

export const parseSearchParams = (searchString: string): object => {
  return qs.parse(searchString);
};
