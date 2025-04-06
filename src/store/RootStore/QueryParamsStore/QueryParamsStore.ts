import { action, computed, makeObservable, observable, toJS } from 'mobx';
import qs, { ParsedQs } from 'qs';

type PrivateFields = '_params' | '_search' | '_queryString' | '_selectedCategories';


const getQueryStringFromSearch = (searchParams: Record<string, any>): string => {
  if (searchParams && searchParams.filters && searchParams.filters.title) {
    return searchParams.filters.title['$containsi'];
  }
  return '';
};

const getSelectedCategoriesFromSearch = (searchParams: Record<string, any>): string[] => {
  if (
    searchParams &&
    searchParams.filters &&
    searchParams.filters.productCategory &&
    searchParams.filters.productCategory.documentId
  ) {
    return searchParams.filters.productCategory.documentId['$in'];
  }
  return [];
};

export default class QueryParamsStore {
  private _queryString: string = '';
  private _selectedCategories: string[] = [];
  private _params: ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      _queryString: observable,
      _selectedCategories: observable,
      getSearch: computed,
      getParam: action,
      selectedCategories: computed,
      setSelectedCategories: action,
      setQueryString: action,
      setSearch: action,
      setParamEntity: action,
      queryString: computed,
      removeParamEntities: action,
    });
  }

  get filters() {
    return this._params.filters;
  }

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
    for(const k of keys){
      delete this._params[k];
    }
  };


  get getSearch() {
    return this._search;
  }

  get queryString() {
    return this._queryString;
  }

  get selectedCategories() {
    return this._selectedCategories;
  }

  getParam = (key: string): string | ParsedQs | (string | ParsedQs)[] | null | undefined => {
    return this._params[key];
  };

  setQueryString = (s: string) => {
    this._queryString = s;
  };

  setSelectedCategories = (categories: string[]) => {
    this._selectedCategories = categories;
  };

  setSearch = (search: string) => {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      console.log('SEARCH: ', search);
      this._search = search;
      this._params = qs.parse(search);
      console.log('SEARCH: ', this._search);
      console.log('PARAMS: ', toJS(this._params));
    }
    this._queryString = getQueryStringFromSearch(this._params);
    console.log('queryString', this._queryString);
    this._selectedCategories = getSelectedCategoriesFromSearch(this._params);
    console.log('selectedCats', this._selectedCategories);
  };
}
