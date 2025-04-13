import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Products.module.scss';
import TitleBlock from 'components/TitleBlock';
import FindBlock from './components/FindBlock/FindBlock';
import TotalBlock from './components/TotalBlock';
import Pagination from 'components/Pagination';
import ProductCardList from 'components/ProductCardList';
import { useLocation, useNavigate } from 'react-router';
import { handleAddToCart } from 'utils';
import { PAGE_ROUTES } from 'config/routes';
import { useLocalStore } from 'utils';
import ProductsListStore from 'store/local/ProductListStore';
import { observer } from 'mobx-react-lite';
import CategoryListStore from 'store/local/CategoryListStore';
import rootStore from 'store/RootStore';
import { makeProductsListSearchParams, makeSearchQueryParams } from 'store/RootStore/utils';
import { makeCategoriesFilterParams } from 'store/RootStore/utils';
import { makePaginationParams } from 'store/RootStore/utils';
import { convertCategoryToFilterOption } from 'utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TFilterOption = { key: string; value: string; type: 'category' | 'sort'; rule: Record<any, any> };

const ITEMS_PER_PAGE = 9;

const Products = observer(() => {
  const [filterOptions, setFilterOptions] = useState<TFilterOption[]>([]);

  const navigate = useNavigate();
  const { search } = useLocation();

  const productsStore = useLocalStore(() => new ProductsListStore());
  const categoriesStore = useLocalStore(() => new CategoryListStore());
  const { categoryList } = categoriesStore;
  const { setSearch, setParamEntity, searchString, setSearchString, filterValue, params } = rootStore.query;

  //Установка строки searchParams
  useEffect(() => {
    if (productsStore && search !== undefined) {
      if (!search) {
        const paginationSearchParams = makePaginationParams(1, ITEMS_PER_PAGE);
        const searchParams = setParamEntity('pagination', paginationSearchParams);
        navigate({ search: searchParams });
      } else {
        setSearch(search);
      }
    }
  }, [search, setSearch, setParamEntity, productsStore, navigate]);

  //Загрузка продуктов при изменении параметров поиска
  useEffect(() => {
    if (Object.keys(params).length && productsStore) {
      const searchParams = makeProductsListSearchParams(params);
      productsStore.downloadProductList({ searchParams });
    }
  }, [params, productsStore]);

  //Загрузка категорий
  useEffect(() => {
    if (!categoryList.length) {
      const searchParams = '';
      categoriesStore.downloadCategoryList({ searchParams });
    }
  }, [categoriesStore, categoryList.length]);

  //Синхронизация локального стейта выбранных категорий с данными стора
  useEffect(() => {
    if (categoryList.length && filterValue.length) {
      const newOptions = categoryList
        .map((c) => convertCategoryToFilterOption(c))
        .filter((o) => filterValue.includes(o.key));
      setFilterOptions(newOptions);
    }
  }, [filterValue, categoryList]);

  //Получение строки для фильтра
  const getTitle = useMemo(() => {
    return (): string =>
      filterOptions.length
        ? Object.values(filterOptions)
            .map((v) => v.value)
            .join(' ')
        : 'Filter';
  }, [filterOptions]);

  //Переход к странице пагинации n
  const handleGoToPage = useCallback(
    (n: number) => {
      const paginationSearchParams = makePaginationParams(n, ITEMS_PER_PAGE);
      const newSearchString = setParamEntity('pagination', paginationSearchParams);
      navigate({ search: newSearchString });
    },
    [navigate, setParamEntity],
  );

  //Поиск по данным категорий и строке ввода
  const handleSearch = useCallback(() => {
    //Добавление к объекту параметров в сторе параметров пагинации
    const paginationParams = makePaginationParams(1, ITEMS_PER_PAGE);
    let newSearchString = setParamEntity('pagination', paginationParams);

    //Добавление к объекту параметров в сторе параметров фильтра выбранных категорий
    const filterParams = makeCategoriesFilterParams(
      filterOptions.filter((fo) => fo.type === 'category').map((fo) => fo.key),
    );
    newSearchString = setParamEntity('filters', filterParams);

    //Добавление к объекту параметров в сторе параметров фильтра текстовой строки
    const searchQueryParams = makeSearchQueryParams(searchString);
    newSearchString = setParamEntity('filters', searchQueryParams);

    if (newSearchString) {
      navigate({ search: `?${newSearchString}` });
    }
  }, [filterOptions, navigate, searchString, setParamEntity]);

  //Навигация при клике на карточку
  const handleCardClick = (documentId: string) => {
    navigate(PAGE_ROUTES.product.create(documentId));
  };

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
          filterOptions={categoryList.map((c) => convertCategoryToFilterOption(c))}
          filterValue={filterOptions}
          onFilterChange={setFilterOptions}
          getTitle={getTitle}
          onFind={handleSearch}
        />
        <TotalBlock total={productsStore.pagination?.total ?? 0} />
        <ProductCardList
          products={productsStore.productList}
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
          isLoading={productsStore.isLoading}
        />
      </div>
    </main>
  );
});

export default Products;
