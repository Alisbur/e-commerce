import { useCallback, useEffect, useMemo } from 'react';
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
import rootStore from 'store/RootStore';
import { convertCategoryToFilterOption } from 'utils';

export type TFilterOption = { key: string; value: string; type: 'category' | 'sort' };

const ITEMS_PER_PAGE = 9;

const Products = observer(() => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const productsStore = useLocalStore(() => new ProductsListStore());
  const { categoryList } = rootStore.categories;
  const { params, setSearchParamsString, getParamValue, setParamValue, applyParamsToSearchString } =
    rootStore.query;

  //Установка строки searchParams и добавление количества карточек на странице
  useEffect(() => {
    if(search !== undefined) {
      setSearchParamsString(search);
    }
    setParamValue('paginationItemsPerPage', ITEMS_PER_PAGE);
    const newSearchString = applyParamsToSearchString();
    navigate({ search: newSearchString });
  }, []);

  //Получение строки для фильтра
  const getTitle = useMemo(() => {
    return () => {
      if (Array.isArray(params.categoryIdList) && params.categoryIdList.length) {
        return params.categoryIdList.length === 1
          ? categoryList.find((c) => (params.categoryIdList as string[]).includes(c.documentId))?.title ||
              'Categories filter'
          : `Categories selected - ${params.categoryIdList.length}`;
      } else return 'Categories filter';
    };
  }, [params.categoryIdList, categoryList]);

  //Переход к странице пагинации n
  const handleGoToPage = useCallback(
    (n: number) => {
      setParamValue('paginationPage', n);
      setParamValue('paginationItemsPerPage', ITEMS_PER_PAGE);
      const newSearchURL = applyParamsToSearchString();
      navigate({ search: newSearchURL });
    },
    [navigate, setParamValue, applyParamsToSearchString],
  );

  //Поиск по данным категорий и строке ввода
  const handleSearch = useCallback(() => {
    setParamValue('paginationPage', 1);
    setParamValue('paginationItemsPerPage', ITEMS_PER_PAGE);
    const newSearchURL = applyParamsToSearchString();
    navigate({ search: `?${newSearchURL}` });
  }, [applyParamsToSearchString, setParamValue, navigate]);

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
          searchString={getParamValue('titleSearch') as string}
          onSearchStringChange={(s) => setParamValue('titleSearch', s)}
          filterOptions={categoryList.map((c) => convertCategoryToFilterOption(c))}
          filterValue={categoryList
            .map((c) => convertCategoryToFilterOption(c))
            .filter((o) => {
              return (params.categoryIdList as string[]).includes(o.key);
            })}
          onFilterChange={(options) =>
            setParamValue(
              'categoryIdList',
              options.map((o) => o.key),
            )
          }
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
