import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import qs from 'qs';

type TPrivateFields = '_searchString' | '_searchParams';

export default class SearchStore implements ILocalStore {
  private _searchString: string = '';
  private _searchParams: Record<any, any> = {};

  constructor() {
    makeObservable<SearchStore, TPrivateFields>(this, {
      _searchParams: observable.ref,
      _searchString: observable,
      searchParams: computed,
      searchString: computed,
      setSearchParams: action,
      setSearchString: action,
    });
  }

  get searchParams(): Record<any, any> {
    return this._searchParams;
  }

  get searchString(): string {
    return this._searchString;
  }

  addSearchParams(queryParams: Record<any, any>): void {
    this._searchParams = {...this._searchParams, ...queryParams};
  }

  resetSearchParams(): void {
    this._searchParams = {};
  }

  setSearchParams(queryString: string): void {
    this._searchParams = qs.parse(queryString);
    this._searchString = queryString;
  }

  setSearchString(queryParams: Record<any, any>): void {
    this._searchString = qs.stringify(queryParams, { encode: false });
    this._searchParams = queryParams;
  }

  destroy(): void {}
}
