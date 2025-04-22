import QueryParamsStore from './QueryParamsStore';
import CategoryListStore from './CategoryListStore/CategoryListStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly categories = new CategoryListStore();
}
