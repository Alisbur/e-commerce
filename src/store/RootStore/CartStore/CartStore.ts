import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { RequestStatus } from 'utils/requestStatus';
import { TParams } from '../types/types';
import { getProductList } from 'api/agent';
import { TResponse } from 'api/types/types';
import { API_ROUTES } from 'api/config/api-routes';
import {
  normalizeProductListResponse,
  TProductListResponseApi,
  TProductListResponseModel,
  TProductModel,
} from 'store/models';
import { TPagination } from 'store/local/ProductListStore/types';

const cartName = 'CART';

export type TProductEntity = {
  productId: string;
  price: number;
  quantity: number;
};

export type TCart = {
  products: TProductEntity[];
  totalPrice: number;
};

const EMPTY_CART: TCart = { products: [], totalPrice: 0 };

type TPrivateFields = '_cart' | '_requestStatus' | '_isLoading' | '_productList' | '_pagination';

export default class CartStore {
  private _cart: TCart = EMPTY_CART;
  private _productList: TProductModel[] = [];
  private _requestStatus: RequestStatus = RequestStatus.initial;
  private _pagination: TPagination | null = null;
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<CartStore, TPrivateFields>(this, {
      _cart: observable,
      _requestStatus: observable,
      _isLoading: observable,
      _productList: observable.ref,
      _pagination: observable,

      productList: computed,
      isLoading: computed,
      requestStatus: computed,
      pagination: computed,
      cart: computed,
      cartProductsList: computed,
      cartTotalPrice: computed,
      cartProducts: computed,

      getCartFromLocalStorage: action,
      getProductData: action,
      addProductToCart: action,
      incProductQuantity: action,
      decProductQuantity: action,
      removeProductFromCart: action,
      downloadCartProductList: action,
      removeCartFromLocalStorage: action,
      resetProductList: action,
    });
    this._cart = this.getCartFromLocalStorage();
  }

  get productList() {
    return this._productList;
  }

  get isLoading() {
    return this._isLoading;
  }

  get requestStatus() {
    return this._requestStatus;
  }

  get pagination() {
    return this._pagination;
  }

  get cart() {
    return this._cart;
  }

  get cartProductsList() {
    return this._cart.products.map((p) => p.productId);
  }

  get cartProducts() {
    return this._cart.products;
  }

  get cartTotalPrice() {
    return this._cart.totalPrice;
  }

  getProductData = (documentId: string) => {
    return this._cart.products.find((p) => p.productId === documentId);
  };

  getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem(cartName);
    if (!cartData) {
      this._cart = EMPTY_CART;
      localStorage.removeItem(cartName);
    } else {
      this._cart = JSON.parse(cartData) as TCart;
    }
    return this._cart;
  };

  removeCartFromLocalStorage = () => {
    this._cart = EMPTY_CART;
    localStorage.removeItem(cartName);
    this.resetProductList();
  };

  saveCartToLocalStorage = () => {
    if (this._cart.products.length) {
      const cartData = JSON.stringify(this._cart);
      localStorage.setItem(cartName, cartData);
    } else {
      localStorage.removeItem(cartName);
    }
  };

  addProductToCart = (documentId: string, price: number) => {
    const product = this._cart.products.find((p) => p.productId === documentId);
    if (product) {
      product.quantity += 1;
    } else {
      this._cart.products.push({ productId: documentId, price, quantity: 1 });
    }
    this._cart.totalPrice = this._cart.products.reduce((acc, p) => (acc += p.quantity * p.price), 0);
    this.saveCartToLocalStorage();
  };

  incProductQuantity = (documentId: string, price: number) => {
    this.addProductToCart(documentId, price);
  };

  decProductQuantity = (documentId: string) => {
    const product = this._cart.products.find((p) => p.productId === documentId);
    if (product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        this._cart.products.filter((p) => p.productId !== documentId);
      }
    }
    this._cart.totalPrice = this._cart.products.reduce((acc, p) => (acc += p.quantity * p.price), 0);
    this.saveCartToLocalStorage();
  };

  removeProductFromCart = (documentId: string) => {
    this._cart.products = this._cart.products.filter((p) => p.productId !== documentId);
    this._cart.totalPrice = this._cart.products.reduce((acc, p) => (acc += p.quantity * p.price), 0);
    this._productList = this._productList.filter((p) => p.documentId !== documentId);
    this.saveCartToLocalStorage();
  };

  resetProductList = () => {
    this._productList = [];
  };

  downloadCartProductList = async <K extends keyof TParams>({
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
}
