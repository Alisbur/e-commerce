import { getItemsList } from 'api/agent';
import { API_ROUTES } from 'api/config/api-routes';
import { TResponse } from 'api/types/types';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import {
  normalizeProductListResponse,
  TProductListResponseApi,
  TProductListResponseModel,
  TProductModel,
} from 'store/models';
import { RequestStatus } from 'utils';
import { ILocalStore } from 'utils';

type Pagination = {
  page: number | null;
  pageSize: number | null;
  pageCount: number | null;
  total: number | null;
};

type TPrivateFields = '_productsList' | '_requestStatus' | '_pagination';

export default class ProductsListStore implements ILocalStore {
  private _productsList: TProductModel[] = [];
  private _requestStatus: RequestStatus = RequestStatus.initial;
  private _pagination: Pagination | null = null;

  constructor() {
    makeObservable<ProductsListStore, TPrivateFields>(this, {
      _productsList: observable.ref,
      _requestStatus: observable,
      _pagination: observable.ref,
      requestStatus: computed,
      productsList: computed,
      pagination: computed,
      downloadProductList: action,
    });
  }

  get productsList(): TProductModel[] {
    return this._productsList;
  }

  get requestStatus(): RequestStatus {
    return this._requestStatus;
  }

  get pagination(): Pagination | null {
    return this._pagination;
  }

  async downloadProductList({ searchParams }: { searchParams: string }): Promise<void> {
    this._requestStatus = RequestStatus.loading;
    this._productsList = [];
    this._pagination = null;

    const response: TResponse<TProductListResponseApi> = await getItemsList<TProductListResponseApi>({
      route: API_ROUTES.products,
      searchParams,
    });

    runInAction(() => {
      if (response.error) {
        this._requestStatus = RequestStatus.error;
        console.log(response.error.error.status, response.error.error.status);
        return;
      }

      if (response.data) {
        const responseData: TProductListResponseModel = normalizeProductListResponse(response.data);
        this._productsList = responseData.data;
        this._pagination = responseData.meta.pagination ?? null;
        this._requestStatus = RequestStatus.success;
      }
    });
  }

  destroy(): void {}
}
