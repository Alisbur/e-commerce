import { getProductList } from 'api/agent';
import { API_ROUTES } from 'api/config/api-routes';
import { TResponse } from 'api/types/types';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import {
  normalizeProductListResponse,
  TProductListResponseApi,
  TProductListResponseModel,
  TProductModel,
} from 'store/models';
import { RequestStatus, ILocalStore } from 'utils';
import { TPagination } from './types';
import rootStore from 'store/RootStore';
import { TParams } from 'store/RootStore/types/types';

type TPrivateFields = '_productList' | '_requestStatus' | '_pagination' | '_isLoading';

export default class ProductListStore implements ILocalStore {
  private _productList: TProductModel[] = [];
  private _requestStatus: RequestStatus = RequestStatus.initial;
  private _pagination: TPagination | null = null;
  private _isLoading: boolean = true;

  constructor() {
    makeObservable<ProductListStore, TPrivateFields>(this, {
      _productList: observable.ref,
      _requestStatus: observable,
      _pagination: observable.ref,
      _isLoading: observable,
      requestStatus: computed,
      productList: computed,
      pagination: computed,
      isLoading: computed,
      downloadProductList: action,
    });
  }

  get productList(): TProductModel[] {
    return this._productList;
  }

  get requestStatus(): RequestStatus {
    return this._requestStatus;
  }

  get pagination(): TPagination | null {
    return this._pagination;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  downloadProductList = async <K extends keyof TParams>({
    searchParams,
  }: {
    searchParams: Record<K, TParams[K]>;
  }): Promise<void> => {
    this._requestStatus = RequestStatus.loading;
    this._isLoading = true;
    this._productList = [];
    this._pagination = null;

    const response: TResponse<TProductListResponseApi> = await getProductList({
      route: API_ROUTES.products,
      searchParams,
    });

    runInAction(() => {
      if (response.error) {
        this._requestStatus = RequestStatus.error;
        console.log(response.error.error.status, response.error.error.status);
      } else if (response.data) {
        const responseData: TProductListResponseModel = normalizeProductListResponse(response.data);
        this._productList = responseData.data;
        this._pagination = responseData.meta.pagination ?? null;
        this._requestStatus = RequestStatus.success;
      }
      this._isLoading = false;
    });
  };

  destroy = (): void => {
    this._qpReaction();
  };

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.searchParamsString,
    () => {
      this.downloadProductList({ searchParams: rootStore.query.params });
    },
  );
}
