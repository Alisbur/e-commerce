import { getProductDetails } from 'api/agent';
import { TResponse } from 'api/types/types';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { normalizeProductResponse, TProductResponseApi, TProductResponseModel, TProductModel } from 'store/models';
import { RequestStatus } from 'utils';
import { ILocalStore } from 'utils';

type TPrivateFields = '_productDetails' | '_requestStatus';

export default class ProductDetailsStore implements ILocalStore {
  private _productDetails: TProductModel | null = null;
  private _requestStatus: RequestStatus = RequestStatus.initial;

  constructor() {
    makeObservable<ProductDetailsStore, TPrivateFields>(this, {
      _productDetails: observable.ref,
      _requestStatus: observable,
      requestStatus: computed,
      productDetails: computed,
      downloadProductDetails: action,
    });
  }

  get productDetails(): TProductModel | null {
    return this._productDetails;
  }

  get requestStatus(): RequestStatus {
    return this._requestStatus;
  }

  async downloadProductDetails({
    documentId,
    searchParams,
  }: {
    documentId: string;
    searchParams: string;
  }): Promise<void> {
    this._requestStatus = RequestStatus.loading;
    this._productDetails = null;

    const response: TResponse<TProductResponseApi> = await getProductDetails<TProductResponseApi>({
      documentId,
      searchParams,
    });

    runInAction(() => {
      if (response.data) {
        const responseData: TProductResponseModel = normalizeProductResponse(response.data);
        this._productDetails = responseData.data;
        this._requestStatus = RequestStatus.success;
      }

      if (response.error) {
        this._requestStatus = RequestStatus.error;
        console.log(response.error.error.status, response.error.error.details);
      }
    });
  }

  destroy(): void {}
}
