import { useEffect, useState } from 'react';
import qs from 'qs';
import styles from './Products.module.scss';
import { getProductList } from 'api/agent/list';
import TitleBlock from '../../../components/TitleBlock';
import FindBlock from './components/FindBlock/FindBlock';
import { FILTER_OPTIONS } from './constants/constants';
import { TProduct, TProductListResponse } from '../../../entities/types/types';
import TotalBlock from './components/TotalBlock';
import Pagination from 'components/Pagination';
import ProductCardsList from 'components/ProductCardsList';
import { useNavigate } from 'react-router';
import { handleAddToCart } from 'utils/cart';

export type TFilterOption = { key: string; value: string };

type TPagination = {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  total?: number;
};

const paginationInitValue = {
  page: undefined,
  pageSize: undefined,
  pageCount: undefined,
  total: undefined,
};

const Products = () => {
  const [searchString, setSearchString] = useState('');
  const [filterValue, setFilterValue] = useState<TFilterOption[]>([]);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [pagination, setPagination] = useState<TPagination>(paginationInitValue);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const conf = {
      fields: ['id', 'documentId', 'title', 'description', 'price', 'isInStock'],
      populate: ['images', 'productCategory'],
      pagination: {
        pageSize: 9,
      },
    };
    const searchParams = qs.stringify(conf, { encode: false });
    setIsLoading(true);
    getProductList(searchParams)
      .then((res: TProductListResponse) => {
        setProducts(res.data);
        setPagination(res.meta.pagination);
      })
      .catch((err: string) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //Получение значения для фильтра
  const getTitle = (): string =>
    filterValue.length
      ? Object.values(filterValue)
          .map((v) => v.value)
          .join(' ')
      : 'Filter';

  //Заглушка для перехода на следующую страницу пагинации
  const handleNextPage = () => {};

  //Заглушка для перехода на предыдущую страницу пагинации
  const handlePrevPage = () => {};

  //Заглушка для перехода к указанной странице пагинации
  const handleNGotoPage = (n: number) => n;

  //Заглушка для поиска
  const handleSearch = () => {};

  const handleCardClick = (documentId: string) => {
    navigate(`/product/${documentId}`);
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
          filterOptions={FILTER_OPTIONS}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
          getTitle={getTitle}
          onFind={handleSearch}
        />
        <TotalBlock total={pagination.total} />
        <ProductCardsList
          products={products}
          addToCart={handleAddToCart}
          onCardClick={handleCardClick}
          paginationSlot={
            pagination.pageCount && pagination.pageCount > 1 ? (
              <Pagination {...pagination} next={handleNextPage} prev={handlePrevPage} goto={handleNGotoPage} />
            ) : undefined
          }
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default Products;
