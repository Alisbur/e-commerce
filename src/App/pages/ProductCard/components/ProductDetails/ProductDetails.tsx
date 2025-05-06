import { FC, ReactNode } from 'react';
import styles from './ProductDetails.module.scss';
import TitleBlock from 'components/TitleBlock/TitleBlock';
import Text from 'components/Text';
import Loader from 'components/Loader';
import Slider from 'components/Slider';
import { TProductModel } from 'store/models';

type TProductDetailsProps = {
  product: TProductModel;
  children: ReactNode;
  isLoading: boolean;
};

const ProductDetails: FC<TProductDetailsProps> = ({ product, children, isLoading }) => {
  if (isLoading) return <Loader size="l" />;

  if (!product) return null;

  return (
    <section className={styles.wrapper}>
      <Slider images={product.images ?? []} />
      <div className={styles.details}>
        <TitleBlock title={product.title}>{product.description}</TitleBlock>
        <Text view="title" tag="span" className={styles.details__price}>
          ${product.price.toFixed(2)}
        </Text>
        <div className={styles.details__actions}>{children}</div>
      </div>
    </section>
  );
};

export default ProductDetails;
