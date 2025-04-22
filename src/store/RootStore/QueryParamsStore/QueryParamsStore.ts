import { action, computed, makeObservable, observable, toJS } from 'mobx';
import qs from 'qs';
import { QUERY_PARAMS_VALIDATION_RULES } from '../config';
import { TParamValue } from '../types/types';

type PrivateFields = '_params' | '_searchParamsString';

type TParams = Record<string, TParamValue>;

const DEFAULT_PAGINATION_INITIAL_PAGE = 1;
const INIT_PARAMS: TParams = {
  titleSearch: '',
  categoryIdList: [] as string[],
  exceptProductIdList: [] as string[],
  isInStock: null,
  priceSort: null,
  paginationPage: DEFAULT_PAGINATION_INITIAL_PAGE,
  paginationLimit: null,
  paginationItemsPerPage: null,
};

export default class TestStore2 {
  private _params: TParams = { ...INIT_PARAMS };
  private _searchParamsString: string = '';

  constructor() {
    makeObservable<TestStore2, PrivateFields>(this, {
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

  resetParams = () => {
    this._params = { ...INIT_PARAMS };
  };

  getParamValue = (key: keyof typeof this._params): TParamValue => {
    return this._params[key];
  };

  setParamValue = (key: keyof typeof this._params, value: TParamValue): void => {
    if (Object.keys(this._params).includes(key)) {
      this._params = { ...this._params, [key]: value };
    }
  };

  validateParamValue = (key: string, value: TParamValue): boolean => {
    if (Object.keys(QUERY_PARAMS_VALIDATION_RULES).includes(key)) {
      return QUERY_PARAMS_VALIDATION_RULES[key](value);
    }
    return false;
  };

  applyParamsToSearchString = () => {
    const searchStringsArray: string[] = [];
    for (const [key, value] of Object.entries(this._params)) {
      if (this.validateParamValue(key, value) && value !== '') {
        searchStringsArray.push(qs.stringify({ [key]: value }, { encode: false, skipNulls: true }));
      }
    }
    this._searchParamsString = searchStringsArray.length ? searchStringsArray.join('&') : '';
    return this._searchParamsString;
  };

  setSearchParamsString = (searchParamsURL: string) => {
    console.log('ЧИТАЮ ПАРАМЕТРЫ СТРОКИ', searchParamsURL);
    const newSearchParamsString = searchParamsURL.startsWith('?') ? searchParamsURL.slice(1) : searchParamsURL;
    if (newSearchParamsString !== this._searchParamsString) {
      this.resetParams();
      const paramsFromURL = qs.parse(newSearchParamsString) as TParams;
      for (const [key, value] of Object.entries(paramsFromURL)) {
        if (this.validateParamValue(key, value)) {
          this._params[key] = value;
        }
      }
      this._params = { ...this._params };
      console.log('PARAMS', toJS(this._params));
      this.applyParamsToSearchString();
    }
  };
}
