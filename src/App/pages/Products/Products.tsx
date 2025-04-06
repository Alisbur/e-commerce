import { useEffect, useMemo, useState } from 'react';
import styles from './Products.module.scss';
import TitleBlock from 'components/TitleBlock';
import FindBlock from './components/FindBlock/FindBlock';
import { FILTER_OPTIONS } from './constants/constants';
import TotalBlock from './components/TotalBlock';
import Pagination from 'components/Pagination';
import ProductCardsList from 'components/ProductCardsList';
import { replace, useLocation, useNavigate, useSearchParams } from 'react-router';
import { handleAddToCart } from 'utils/cart';
import { makeProductsListSearchParams } from 'api/utils';
import { PAGE_ROUTES } from 'config/routes';
import { useLocalStore } from 'utils/useLocalStore';
import ProductsListStore from 'store/local/ProductsListStore';
import { RequestStatus } from 'utils/requestStatus';
import { observer } from 'mobx-react-lite';
import CategoriesListStore from 'store/local/CategoriesListStore';
import rootStore from 'store/RootStore';
import { makeSearchQueryParams } from 'utils/makeSearchQueryParams';
import { makeCategoriesFilterParams } from 'utils/makeCategoriesFilterParams';
import { makePaginationParams } from 'utils/makePaginationParams';

export type TFilterOption = { key: string; value: string; type: 'category' | 'sort'; rule: Record<any, any> };

const convertCategoryToFilterOption = (category: TProductCategoryModel): TFilterOption => ({
  key: category.documentId,
  value: category.title,
  type: 'category',
  rule: {},
});

const ITEMS_PER_PAGE = 9;

const Products = observer(() => {
  // const [searchString, setSearchString] = useState('');
  // const [filterValue, setFilterValue] = useState<TFilterOption[]>([]);
  // const [searchP, setSearchP] = useSearchParams();

  const navigate = useNavigate();
  const { search } = useLocation();

  const productsStore = useLocalStore(() => new ProductsListStore());
  const categoriesStore = useLocalStore(() => new CategoriesListStore());
  const { categoriesList } = categoriesStore;
  const {
    setSearch,
    // queryString,
    setParamEntity,
    // setQueryString,
    getSearch,
    // getParam,
    // removeParamEntities,
    searchString,
    setSearchString,
    filterValue,
    setFilterValue,
  } = rootStore.query;

  // useEffect(() => {
  //   if (getSearch !== undefined) {
  //     if(!getSearch) {
  //       const searchParams = makeProductsListSearchParams({ productsPerPage: ITEMS_PER_PAGE });
  //       setSearch(searchParams);
  //       console.log("SETSEARCH В USE EFFECT", search)
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (search !== undefined) {
      if(!search) {
        const searchParams = makeProductsListSearchParams({ productsPerPage: ITEMS_PER_PAGE });
        setSearch(searchParams);
      } else {
      setSearch(search);
      console.log("SETSEARCH В USE EFFECT", search)
    }}
  }, [search]);


  useEffect(() => {
    if (!categoriesList.length) {
      const searchParams = '';
      categoriesStore.downloadCategoriesList({ searchParams });
    }
  }, [categoriesStore]);

  useEffect(() => {
    const filterParams = makeCategoriesFilterParams(
      filterValue.filter((fv) => fv.type === 'category').map((fv) => fv.key),
    );
    const paginationParams = makePaginationParams(1, ITEMS_PER_PAGE);
    setParamEntity('pagination', paginationParams);
    const newSearchString = setParamEntity('filters', filterParams);
    if (newSearchString) {
      // navigate({ search: newSearchString});
      setSearchP(`?${newSearchString}`);
      console.log("SETSEARCH В USE EFFECT3")
    }
  }, [filterValue]);

  //Получение значения для фильтра
  const getTitle = useMemo(() => {
    return (): string =>
      filterValue.length
        ? Object.values(filterValue)
            .map((v) => v.value)
            .join(' ')
        : 'Filter';
  }, [filterValue]);

  //Заглушка для перехода к указанной странице пагинации
  const handleGoToPage = (n: number) => {
    const paginationSearchParams = makePaginationParams(n, ITEMS_PER_PAGE);
    const newSearchString = setParamEntity('pagination', paginationSearchParams);
    navigate({ search: newSearchString });
  };

  //Заглушка для поиска
  const handleSearch = () => {
    const querySearchParams = makeSearchQueryParams(searchString);
    const newSearchString = setParamEntity('filters', querySearchParams);
    navigate({ search: newSearchString });
    // setSearchP(`?${newSearchString}`);
  };

  const handleCardClick = (documentId: string) => {
    navigate(PAGE_ROUTES.product.create(documentId));
  };

  const setVal = (v: TFilterOption[]) => {
    setFilterValue(v);
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <TitleBlock title="Products" align="center">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </TitleBlock>
        <FindBlock
          searchString={searchString}
          onSearchStringChange={setSearchString}
          filterOptions={[...categoriesList.map((c) => convertCategoryToFilterOption(c)), ...FILTER_OPTIONS]}
          filterValue={filterValue}
          onFilterChange={setVal}
          getTitle={getTitle}
          onFind={handleSearch}
        />
        <TotalBlock total={productsStore.pagination?.total ?? 0} />
        <ProductCardsList
          products={productsStore.productsList}
          addToCart={handleAddToCart}
          onCardClick={handleCardClick}
          paginationSlot={
            productsStore.pagination?.pageCount && productsStore.pagination.pageCount > 1 ? (
              <Pagination
                page={productsStore.pagination?.page}
                pageCount={productsStore.pagination?.pageCount}
                goTo={handleGoToPage}
              />
            ) : undefined
          }
          isLoading={productsStore.requestStatus === RequestStatus.loading}
        />
      </div>
    </main>
  );
});

export default Products;
