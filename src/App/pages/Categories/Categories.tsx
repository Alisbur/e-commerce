import styles from './Categories.module.scss';
import { useLocation, useNavigate } from 'react-router';
import { FC, useCallback, useEffect, useState } from 'react';
import rootStore from 'store/RootStore';
import TitleBlock from 'components/TitleBlock';
import TotalBlock from '../../../components/TotalBlock';
import { observer } from 'mobx-react-lite';
import { PAGE_ROUTES } from 'config/routes';
import { CATEGORIES_PER_PAGE } from './constants/constants';
import CategoryCardList from 'components/CategoryCardList';
import Pagination from 'components/Pagination';

const Categories: FC = observer(() => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { setSearchParamsString, setParamValue, resetParams, applyParamsToSearchString } = rootStore.query;
  const { categoryList } = rootStore.categories;
  const [paginationPage, setPaginationPage] = useState(1);

  useEffect(() => {
    if (search !== undefined) {
      setSearchParamsString(search);
    }
  }, [search, setSearchParamsString]);

  const handleGoToPage = (n: number) => {
    setPaginationPage(n);
  };

  const handleCardClick = useCallback(
    (id: string) => {
      resetParams();
      setParamValue('categoryIdList', [id]);
      const newSearchString = applyParamsToSearchString();
      navigate({ pathname: PAGE_ROUTES.products.mask, search: newSearchString });
    },
    [applyParamsToSearchString, navigate, resetParams, setParamValue],
  );

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <TitleBlock title="Categories" align="center">
          Below you can choise a category of products you want to see.
        </TitleBlock>
        <TotalBlock title="Total categories" total={categoryList.length} />
        <CategoryCardList
          categories={categoryList}
          onCardClick={handleCardClick}
          startItem={paginationPage === 1 ? 0 : (paginationPage - 1) * CATEGORIES_PER_PAGE - 1}
          maxItems={CATEGORIES_PER_PAGE}
          isLoading={false}
          paginationSlot={
            categoryList.length > CATEGORIES_PER_PAGE && (
              <Pagination
                page={paginationPage}
                pageCount={Math.ceil(categoryList.length / CATEGORIES_PER_PAGE)}
                goTo={handleGoToPage}
              />
            )
          }
        />
      </div>
    </main>
  );
});

export default Categories;
