import { action, makeObservable, observable, toJS } from 'mobx';
import qs, { ParsedQs } from 'qs';

type PrivateFields = '_params' | "_search";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _search: observable,
      setSearch: action,
    });
  }

  getParam(
    key: string
  ): string | ParsedQs | (string | ParsedQs)[] | undefined {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }

    console.log("SEARCH", this._search);
    console.log("PARAMS", toJS(this._params));
  }
}