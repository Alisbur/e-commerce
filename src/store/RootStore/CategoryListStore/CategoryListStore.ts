import { getCategoryList } from 'api/agent';
import { TResponse } from 'api/types/types';
import { action, autorun, computed, IReactionDisposer, makeObservable, observable, runInAction } from 'mobx';
import {
  normalizeProductCategoriesResponse,
  TProductCategoriesResponseApi,
  TProductCategoriesResponseModel,
  TProductCategoryModel,
} from 'store/models';
import { RequestStatus } from 'utils';
import { API_ROUTES } from 'api/config/api-routes';
import { TParams } from '../types/types';

type Pagination = {
  page: number | null;
  pageSize: number | null;
  pageCount: number | null;
  total: number | null;
};

type TPrivateFields = '_categoryList' | '_requestStatus' | '_pagination' | '_isLoading';

export default class CategoryListStore {
  private _categoryList: TProductCategoryModel[] = [];
  private _requestStatus: RequestStatus = RequestStatus.initial;
  private _pagination: Pagination | null = null;
  private _isLoading: boolean = true;

  constructor() {
    makeObservable<CategoryListStore, TPrivateFields>(this, {
      _categoryList: observable.ref,
      _requestStatus: observable,
      _pagination: observable.ref,
      _isLoading: observable,
      requestStatus: computed,
      categoryList: computed,
      pagination: computed,
      isLoading: computed,
      downloadCategoryList: action,
    });
  }

  get categoryList(): TProductCategoryModel[] {
    return this._categoryList;
  }

  get requestStatus(): RequestStatus {
    return this._requestStatus;
  }

  get pagination(): Pagination | null {
    return this._pagination;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  downloadCategoryList = async <K extends keyof TParams>({ searchParams }: { searchParams: Record<K, TParams[K]> }): Promise<void> => {
    this._requestStatus = RequestStatus.loading;
    this._isLoading = true;
    this._categoryList = [];
    this._pagination = null;

    const response: TResponse<TProductCategoriesResponseApi> = await getCategoryList({
      route: API_ROUTES.categories,
      searchParams,
    });

    runInAction(() => {
      this._isLoading = false;
      if (response.error) {
        this._requestStatus = RequestStatus.error;
        console.log(response.error.error.status, response.error.error.details);
        return;
      }

      if (response.data) {
        const responseData: TProductCategoriesResponseModel = normalizeProductCategoriesResponse(response.data);
        this._categoryList = responseData.data;
        this._pagination = responseData?.meta?.pagination ?? null;
        this._requestStatus = RequestStatus.success;
      }
    });
  };

  destroy(): void {
    this._autorunDisposer();
  }

  private readonly _autorunDisposer: IReactionDisposer = autorun(() => {
    this.downloadCategoryList({ searchParams: {} });
  });
}
