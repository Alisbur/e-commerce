import { FC, useEffect } from 'react';
import styles from './RelatedProducts.module.scss';
import ProductCardsList from 'components/ProductCardsList';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import { handleAddToCart } from 'utils/cart';
import { makeRelatedProductsSearchParams } from 'api/utils';
import { PAGE_ROUTES } from 'config/routes';
import ProductsListStore from 'store/ProductsListStore';
import { useLocalStore } from 'utils/useLocalStore';
import { RequestStatus } from 'utils/requestStatus';
import { observer } from 'mobx-react-lite';

type TRelatedProductsProps = {
  productDocumentId: string;
  productCategoryDocumentId: string;
};

const RELATED_ITEMS_QUANTITY = 3;

const RelatedProductsList: FC<TRelatedProductsProps> = ({ productDocumentId, productCategoryDocumentId }) => {
  const relatedStore = useLocalStore(() => new ProductsListStore());

  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(PAGE_ROUTES.product.create(documentId));
  };

  useEffect(() => {
    if (productDocumentId && productCategoryDocumentId) {
      const searchParams = makeRelatedProductsSearchParams({
        productCategoryDocumentId,
        productDocumentId,
        quantity: RELATED_ITEMS_QUANTITY,
      });

      relatedStore.downloadProductList({searchParams});
    }
  }, [productDocumentId, productCategoryDocumentId]);

  return (
    <div className={styles.wrapper}>
      <Text view="subtitle" tag="h2" className={styles.title}>
        Related Items
      </Text>
      <ProductCardsList
        products={relatedStore.productsList}
        addToCart={handleAddToCart}
        onCardClick={handleCardClick}
        isLoading={relatedStore.requestStatus === RequestStatus.loading}
      />
    </div>
  );
};

const RelatedProducts = observer(RelatedProductsList);

export default RelatedProducts;
