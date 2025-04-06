import { useEffect, useMemo, useState } from 'react';
import styles from './Products.module.scss';
import TitleBlock from 'components/TitleBlock';
import FindBlock from './components/FindBlock/FindBlock';
import { FILTER_OPTIONS } from './constants/constants';
import TotalBlock from './components/TotalBlock';
import Pagination from 'components/Pagination';
import ProductCardsList from 'components/ProductCardsList';
import { useNavigate, useSearchParams } from 'react-router';
import { handleAddToCart } from 'utils/cart';
import { makeProductsListSearchParams } from 'api/utils';
import { PAGE_ROUTES } from 'config/routes';
import { useLocalStore } from 'utils/useLocalStore';
import ProductsListStore from 'store/local/ProductsListStore';
import { RequestStatus } from 'utils/requestStatus';
import { observer } from 'mobx-react-lite';
import CategoriesListStore from 'store/local/CategoriesListStore';
// import rootStore from 'store/RootStore';

export type TFilterOption = { key: string; value: string };

const ITEMS_PER_PAGE = 9;

const Products = observer(() => {
  const [searchString, setSearchString] = useState('');
  const [filterValue, setFilterValue] = useState<TFilterOption[]>([]);
  const [searchP, setSearchP] = useSearchParams();

  const navigate = useNavigate();

  const productsStore = useLocalStore(() => new ProductsListStore());
  const categoriesStore = useLocalStore(() => new CategoriesListStore());
  // const { setSearch } = rootStore.query;

  useEffect(() => {
    const searchParams = makeProductsListSearchParams({ productsPerPage: ITEMS_PER_PAGE });
    productsStore.downloadProductList({ searchParams });
  }, [productsStore]);

  useEffect(() => {
    const searchParams = '';
    categoriesStore.downloadCategoriesList({ searchParams });
  }, [categoriesStore]);

  //Получение значения для фильтра
  const getTitle = useMemo(() => {
    return (): string =>
      filterValue.length
        ? Object.values(filterValue)
            .map((v) => v.value)
            .join(' ')
        : 'Filter';
  }, [filterValue]);

  //Заглушка для перехода на следующую страницу пагинации
  const handleNextPage = () => {};

  //Заглушка для перехода на предыдущую страницу пагинации
  const handlePrevPage = () => {};

  //Заглушка для перехода к указанной странице пагинации
  const handleNGoToPage = (n: number) => n;

  //Заглушка для поиска
  const handleSearch = () => {};

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
          onSearchStringChange={(s) => {setSearchString(s); setSearchP({search: s})}}
          filterOptions={FILTER_OPTIONS}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
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
                next={handleNextPage}
                prev={handlePrevPage}
                goTo={handleNGoToPage}
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
