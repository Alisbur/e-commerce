import { action, computed, makeObservable, observable, toJS } from 'mobx';
import qs, { ParsedQs } from 'qs';
import { getQueryStringFromSearch } from '../utils';
import { getSelectedCategoriesFromSearch } from '../utils';

type PrivateFields = '_params' | '_search' | '_searchString' | '_filterValue';

export default class QueryParamsStore {
  private _searchString: string = '';
  private _filterValue: string[] = [];
  private _params: ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      _searchString: observable,
      _filterValue: observable.ref,
      getSearch: computed,
      searchString: computed,
      filterValue: computed,
      getParam: action,
      setSearchString: action,
      setSearch: action,
      setParamEntity: action,
      removeParamEntities: action,
    });
  }

  get getSearch() {
    return this._search;
  }

  get searchString() {
    return this._searchString;
  }

  get filterValue() {
    return this._filterValue;
  }

  getParam = (key: string): string | ParsedQs | (string | ParsedQs)[] | null | undefined => {
    return this._params[key];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setParamEntity = (key: string, rules: Record<string, any>[]) => {
    const newParams = {
      ...this._params,
      [key]: rules.reduce(
        (acc, f) => {
          return { ...acc, ...f };
        },
        this._params[key] && Object.keys(this._params[key]).length ? (this._params[key] as object) : {},
      ),
    };
    this._params = newParams;
    const newSearchString = qs.stringify(this._params, { encode: false });
    return newSearchString;
  };

  removeParamEntities = (keys: string[]) => {
    for (const k of keys) {
      delete this._params[k];
    }
  };

  setSearchString = (s: string) => {
    this._searchString = s;
  };

  setSearch = (search: string) => {
    search = search.startsWith('?') ? search.slice(1) : search;
    if (this._search !== search) {
      console.log('SEARCH: ', search);
      this._search = search;
      this._params = qs.parse(search);
      console.log('SEARCH: ', this._search);
      console.log('PARAMS: ', toJS(this._params));
      this._searchString = getQueryStringFromSearch(this._params);
      console.log('queryString', this._searchString);
      this._filterValue = getSelectedCategoriesFromSearch(this._params);
      console.log('selectedCats', toJS(this._filterValue));
    }
  };
}
