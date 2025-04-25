import { action, computed, makeObservable, observable } from 'mobx';
import { QUERY_PARAMS_VALIDATION_RULES } from '../config';
import { TParams } from '../types/types';
import { stringifySearchParams, parseSearchParams } from '../utils';

type PrivateFields = '_params' | '_searchParamsString';

const DEFAULT_PAGINATION_INITIAL_PAGE = 1;
const INIT_PARAMS: TParams = {
  titleSearch: '',
  categoryIdList: [] as string[],
  exceptProductIdList: [] as string[],
  isInStock: null,
  discountPercentSort: null,
  ratingSort: null,
  priceSort: null,
  paginationPage: DEFAULT_PAGINATION_INITIAL_PAGE,
  paginationLimit: null,
  paginationItemsPerPage: null,
};

export default class QueryParamsStore {
  private _params: TParams = { ...INIT_PARAMS };
  private _searchParamsString: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _searchParamsString: observable,
      _params: observable.ref,
      params: computed,
      searchParamsString: computed,
      resetParams: action,
      getParamValue: action,
      setParamValue: action,
      setSearchParamsString: action,
      validateParamValue: action,
      applyParamsToSearchString: action,
    });
  }

  get searchParamsString(): string {
    return this._searchParamsString;
  }

  get params(): TParams {
    return this._params;
  }

  resetParams = (): void => {
    this._params = { ...INIT_PARAMS };
  };

  getParamValue = <K extends keyof TParams>(key: K): TParams[K] => {
    return this._params[key];
  };

  setParamValue = <K extends keyof TParams>(key: K, value: TParams[K]): void => {
    if (Object.keys(this._params).includes(key)) {
      this._params = { ...this._params, [key]: value };
    }
  };

  validateParamValue = <K extends keyof TParams>(key: K, value: TParams[K]): boolean => {
    if (Object.keys(QUERY_PARAMS_VALIDATION_RULES).includes(key)) {
      return QUERY_PARAMS_VALIDATION_RULES[key](value);
    }
    return false;
  };

  applyParamsToSearchString = <K extends keyof TParams>(): string => {
    const searchStringsArray: string[] = [];
    for (const [key, value] of Object.entries(this._params) as [K, TParams[K]][]) {
      if (value && this.validateParamValue(key, value)) {
        searchStringsArray.push(stringifySearchParams({ [key]: value }));
      }
    }
    this._searchParamsString = searchStringsArray.length ? searchStringsArray.join('&') : '';
    return this._searchParamsString;
  };

  setSearchParamsString = <K extends keyof TParams>(searchParamsURL: string): void => {
    const newSearchParamsString = searchParamsURL.startsWith('?') ? searchParamsURL.slice(1) : searchParamsURL;
    if (newSearchParamsString !== this._searchParamsString) {
      this.resetParams();
      const paramsFromURL: Record<K, TParams[K]> = parseSearchParams(newSearchParamsString) as Record<K, TParams[K]>;
      for (const [key, value] of Object.entries(paramsFromURL) as [K, TParams[K]][]) {
        if (this.validateParamValue(key, value)) {
          this._params[key] = value;
        }
      }
      this.applyParamsToSearchString();
    }
  };
}
