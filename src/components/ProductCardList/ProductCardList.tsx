import { FC, ReactNode } from 'react';
import styles from './ProductCardList.module.scss';
import Card from 'components/Card';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { TProductModel } from 'store/models';

type ProductCardListProps = {
  products: TProductModel[];
  addToCart: (documentId: string, price: number) => void;
  onCardClick: (documentId: string) => void;
  paginationSlot?: ReactNode;
  isLoading: boolean;
};

const ProductCardList: FC<ProductCardListProps> = ({ products, isLoading, addToCart, onCardClick, paginationSlot }) => {
  if (isLoading) return <Loader size="l" />;

  if (!Array.isArray(products))
    return (
      <Text view="subtitle" tag="div" color="secondary" weight="semibold">
        Что-то пошло не так...
      </Text>
    );

  if (!isLoading && !products.length)
    return (
      <Text view="subtitle" tag="div" color="secondary" weight="semibold">
        Ничего не найдено...
      </Text>
    );

  return (
    <section className={styles.wrapper}>
      <div className={styles.products}>
        {products.map((p) => (
          <Card
            key={p.id}
            image={p.images && p.images[0].formats?.small?.url ? p.images[0].formats?.small?.url : ''}
            captionSlot={p.productCategory?.title}
            title={p.title}
            subtitle={p.description}
            contentSlot={`${p.price.toFixed(2)} (disc. - ${Number(p.discountPercent)}%)`}
            actionSlot={<Button onClick={() => addToCart(p.documentId, p.price)}>Add to Cart</Button>}
            onClick={() => onCardClick(p.documentId)}
          />
        ))}
      </div>
      {paginationSlot}
    </section>
  );
};

export default ProductCardList;
