// import { action, autorun, computed, IReactionDisposer, makeObservable, observable, runInAction } from 'mobx';
// import { TProductModel } from 'store/models';

// type TProductEntity = {
//   productId: string;
//   quantity: number;
// };

// type TCart = {
//   products: TProductEntity[];
//   totalPrice: number;
// };

// type TOrder = {
//   order: TCart;
//   createdAt: Date;
// };

// const EMPTY_CART: TCart = { products: [], totalPrice: 0 };

// type TPrivateFields = '_cart';

// export default class CategoryListStore {
//   private _cart: TCart = EMPTY_CART;

//   private _requestStatus: RequestStatus = RequestStatus.initial;
//   private _pagination: Pagination | null = null;
//   private _isLoading: boolean = true;

//   constructor() {
//     makeObservable<CategoryListStore, TPrivateFields>(this, {
//       _categoryList: observable.ref,
//       _requestStatus: observable,
//       _pagination: observable.ref,
//       _isLoading: observable,
//       requestStatus: computed,
//       categoryList: computed,
//       pagination: computed,
//       isLoading: computed,
//       downloadCategoryList: action,
//     });
//   }

//   getCartFromLocalStorage = () => {
//     const cartData = localStorage.getItem('CART');
//     this._cart = cartData ? (JSON.parse(cartData) as TCart) : EMPTY_CART;
//   };

//   saveCartToLocalStorage = () => {
//     if(this._cart.products.length) {
//       const cartData = JSON.stringify(this._cart);
//       localStorage.setItem('CART', cartData);
//     } else {
//       localStorage.removeItem('CART');
//     }
//   };

//   addProductToCart = (documentId: string) => {
//     if(this._cart.products.)
//   }

//   get categoryList(): TProductCategoryModel[] {
//     return this._categoryList;
//   }

//   get requestStatus(): RequestStatus {
//     return this._requestStatus;
//   }

//   get pagination(): Pagination | null {
//     return this._pagination;
//   }

//   get isLoading(): boolean {
//     return this._isLoading;
//   }

//   async downloadCategoryList({ searchParams }: { searchParams: string }): Promise<void> {
//     this._requestStatus = RequestStatus.loading;
//     this._isLoading = true;
//     this._categoryList = [];
//     this._pagination = null;

//     const response: TResponse<TProductCategoriesResponseApi> = await getCategoryList({
//       route: API_ROUTES.categories,
//       searchParams,
//     });

//     runInAction(() => {
//       this._isLoading = false;
//       if (response.error) {
//         this._requestStatus = RequestStatus.error;
//         console.log(response.error.error.status, response.error.error.details);
//         return;
//       }

//       if (response.data) {
//         const responseData: TProductCategoriesResponseModel = normalizeProductCategoriesResponse(response.data);
//         this._categoryList = responseData.data;
//         this._pagination = responseData?.meta?.pagination ?? null;
//         this._requestStatus = RequestStatus.success;
//       }
//     });
//   }

//   destroy(): void {
//     this._autorunDisposer();
//   }

//   private readonly _autorunDisposer: IReactionDisposer = autorun(() => {
//     this.downloadCategoryList({ searchParams: '' });
//   });
// }
