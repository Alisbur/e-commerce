import { FC, useEffect } from 'react';
import styles from './RelatedProducts.module.scss';
import ProductCardList from 'components/ProductCardList';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import { PAGE_ROUTES } from 'config/routes';
import ProductListStore from 'store/local/ProductListStore';
import { useLocalStore } from 'utils';
import { observer } from 'mobx-react-lite';

type TRelatedProductsProps = {
  productDocumentId: string;
  productCategoryDocumentId: string;
  addToCart: (documentId: string, price: number) => void;
};

const RELATED_ITEMS_QUANTITY = 3;

const RelatedProductsList: FC<TRelatedProductsProps> = ({ productDocumentId, productCategoryDocumentId, addToCart }) => {
  const relatedStore = useLocalStore(() => new ProductListStore());

  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(PAGE_ROUTES.product.create(documentId));
  };

  useEffect(() => {
    if (productDocumentId && productCategoryDocumentId) {
      relatedStore.downloadProductList({
        searchParams: {
          categoryIdList: [productCategoryDocumentId],
          paginationLimit: RELATED_ITEMS_QUANTITY,
          exceptProductIdList: [productDocumentId],
        },
      });
    }
  }, [productDocumentId, productCategoryDocumentId, relatedStore]);

  return (
    <div className={styles.wrapper}>
      <Text view="subtitle" tag="h2" className={styles.title}>
        Related Items
      </Text>
      <ProductCardList
        products={relatedStore.productList}
        addToCart={addToCart}
        onCardClick={handleCardClick}
        isLoading={relatedStore.isLoading}
      />
    </div>
  );
};

const RelatedProducts = observer(RelatedProductsList);

export default RelatedProducts;
