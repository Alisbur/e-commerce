import { getItemsList } from 'api/agent';
import { TResponse } from 'api/types/types';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import {
  normalizeProductCategoriesResponse,
  TProductCategoriesResponseApi,
  TProductCategoriesResponseModel,
  TProductCategoryModel,
} from 'store/models';
import { RequestStatus } from 'utils';
import { ILocalStore } from 'utils';
import { API_ROUTES } from 'api/config/api-routes';

type Pagination = {
  page: number | null;
  pageSize: number | null;
  pageCount: number | null;
  total: number | null;
};

type TPrivateFields = '_categoriesList' | '_requestStatus' | '_pagination';

export default class CategoriesListStore implements ILocalStore {
  private _categoriesList: TProductCategoryModel[] = [];
  private _requestStatus: RequestStatus = RequestStatus.initial;
  private _pagination: Pagination | null = null;

  constructor() {
    makeObservable<CategoriesListStore, TPrivateFields>(this, {
      _categoriesList: observable.ref,
      _requestStatus: observable,
      _pagination: observable.ref,
      requestStatus: computed,
      categoriesList: computed,
      pagination: computed,
      downloadCategoriesList: action,
    });
  }

  get categoriesList(): TProductCategoryModel[] {
    return this._categoriesList;
  }

  get requestStatus(): RequestStatus {
    return this._requestStatus;
  }

  get pagination(): Pagination | null {
    return this._pagination;
  }

  async downloadCategoriesList({ searchParams }: { searchParams: string }): Promise<void> {
    this._requestStatus = RequestStatus.loading;
    this._categoriesList = [];
    this._pagination = null;

    const response: TResponse<TProductCategoriesResponseApi> = await getItemsList<TProductCategoriesResponseApi>({
      route: API_ROUTES.categories,
      searchParams,
    });

    runInAction(() => {
      if (response.error) {
        this._requestStatus = RequestStatus.error;
        console.log(response.error.error.status, response.error.error.details);
        return;
      }

      if (response.data) {
        const responseData: TProductCategoriesResponseModel = normalizeProductCategoriesResponse(response.data);
        this._categoriesList = responseData.data;
        this._pagination = responseData?.meta?.pagination ?? null;
        this._requestStatus = RequestStatus.success;
      }
    });
  }

  destroy(): void {}
}
