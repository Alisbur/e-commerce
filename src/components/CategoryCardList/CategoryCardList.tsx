import { FC, ReactNode } from 'react';
import styles from './CategoryCardList.module.scss';
import CategoryCard from 'components/CategoryCard';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { TProductCategoryModel } from 'store/models';

type CategoryCardListProps = {
  categories: TProductCategoryModel[];
  startItem: number;
  maxItems: number;
  onCardClick: (documentId: string) => void;
  paginationSlot?: ReactNode;
  isLoading: boolean;
};

const CategoryCardList: FC<CategoryCardListProps> = ({
  categories,
  isLoading,
  startItem,
  maxItems,
  onCardClick,
  paginationSlot,
}) => {
  if (isLoading) return <Loader size="l" />;

  if (!Array.isArray(categories) || !categories.length)
    return (
      <Text view="subtitle" tag="div" color="secondary" weight="semibold">
        Что-то пошло не так... Перезагрузите страницу.
      </Text>
    );

  return (
    <section className={styles.wrapper}>
      <div className={styles.products}>
        {categories.slice(startItem, maxItems).map((c) => (
          <CategoryCard
            key={c.id}
            image={c.image?.url || ''}
            title={c.title}
            onClick={() => onCardClick(c.documentId)}
          />
        ))}
      </div>
      {paginationSlot}
    </section>
  );
};

export default CategoryCardList;
