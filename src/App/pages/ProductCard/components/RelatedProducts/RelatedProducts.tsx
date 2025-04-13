import { FC, useEffect } from 'react';
import styles from './RelatedProducts.module.scss';
import ProductCardList from 'components/ProductCardList';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import { handleAddToCart } from 'utils';
import { makeRelatedProductsSearchParams } from 'store/RootStore/utils';
import { PAGE_ROUTES } from 'config/routes';
import ProductListStore from 'store/local/ProductListStore';
import { useLocalStore } from 'utils';
import { observer } from 'mobx-react-lite';

type TRelatedProductsProps = {
  productDocumentId: string;
  productCategoryDocumentId: string;
};

const RELATED_ITEMS_QUANTITY = 3;

const RelatedProductsList: FC<TRelatedProductsProps> = ({ productDocumentId, productCategoryDocumentId }) => {
  const relatedStore = useLocalStore(() => new ProductListStore());

  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(PAGE_ROUTES.product.create(documentId));
  };

  useEffect(() => {
    if (productDocumentId && productCategoryDocumentId) {
      const searchParams = makeRelatedProductsSearchParams(
        productCategoryDocumentId,
        productDocumentId,
        RELATED_ITEMS_QUANTITY,
      );

      relatedStore.downloadProductList({ searchParams });
    }
  }, [productDocumentId, productCategoryDocumentId, relatedStore]);

  return (
    <div className={styles.wrapper}>
      <Text view="subtitle" tag="h2" className={styles.title}>
        Related Items
      </Text>
      <ProductCardList
        products={relatedStore.productList}
        addToCart={handleAddToCart}
        onCardClick={handleCardClick}
        isLoading={relatedStore.isLoading}
      />
    </div>
  );
};

const RelatedProducts = observer(RelatedProductsList);

export default RelatedProducts;
