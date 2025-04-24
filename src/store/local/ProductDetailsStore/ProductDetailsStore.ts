import { getProductDetails } from 'api/agent';
import { API_ROUTES } from 'api/config/api-routes';
import { TResponse } from 'api/types/types';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { normalizeProductResponse, TProductResponseApi, TProductResponseModel, TProductModel } from 'store/models';
import { TParams } from 'store/RootStore/types/types';
import { RequestStatus } from 'utils';
import { ILocalStore } from 'utils';

type TPrivateFields = '_productDetails' | '_requestStatus' | '_isLoading';

export default class ProductDetailsStore implements ILocalStore {
  private _productDetails: TProductModel | null = null;
  private _requestStatus: RequestStatus = RequestStatus.initial;
  private _isLoading: boolean = true;

  constructor() {
    makeObservable<ProductDetailsStore, TPrivateFields>(this, {
      _productDetails: observable.ref,
      _requestStatus: observable,
      _isLoading: observable,
      requestStatus: computed,
      productDetails: computed,
      isLoading: computed,
      downloadProductDetails: action,
    });
  }

  get productDetails(): TProductModel | null {
    return this._productDetails;
  }

  get requestStatus(): RequestStatus {
    return this._requestStatus;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

 downloadProductDetails = async <K extends keyof TParams>({
    documentId,
    searchParams,
  }: {
    documentId: string;
    searchParams: Record<K, TParams[K]>;
  }): Promise<void> => {
    this._requestStatus = RequestStatus.loading;
    this._isLoading = true;
    this._productDetails = null;

    const response: TResponse<TProductResponseApi> = await getProductDetails({
      route: API_ROUTES.products,
      documentId,
      searchParams,
    });

    runInAction(() => {
      this._isLoading = false;
      if (response.data) {
        const responseData: TProductResponseModel = normalizeProductResponse(response.data);
        this._productDetails = responseData.data;
        this._requestStatus = RequestStatus.success;
        return;
      }

      if (response.error) {
        this._requestStatus = RequestStatus.error;
        console.log(response.error.error.status, response.error.error.details);
      }
    });
  }

  destroy(): void {}
}
