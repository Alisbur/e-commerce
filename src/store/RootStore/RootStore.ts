import QueryParamsStore from './QueryParamsStore';
import CategoryListStore from './CategoryListStore/CategoryListStore';
import CartStore from './CartStore/CartStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly categories = new CategoryListStore();
  readonly cart = new CartStore();
}
