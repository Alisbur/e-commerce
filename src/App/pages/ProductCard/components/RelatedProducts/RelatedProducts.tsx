import { FC, useEffect, useState } from 'react';
import styles from './RelatedProducts.module.scss';
import qs from 'qs';
import ProductCardsList from 'components/ProductCardsList';
import { TProduct, TProductListResponse } from 'entities/types/types';
import { getProductList } from 'api/agent/list';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import { handleAddToCart } from 'utils/cart';
import { makeRelatedProductsParams } from 'api/utils';

type TRelatedProductsProps = {
  productDocumentId: string;
  productCategoryDocumentId: string;
};

const RelatedProducts: FC<TRelatedProductsProps> = ({ productDocumentId, productCategoryDocumentId }) => {
  const [relatedIsLoading, setrelatedIsLoading] = useState(false);
  const [related, setRelated] = useState<TProduct[]>([]);
  const RELATED_ITEMS_QUANTITY = 3;

  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(`/product/${documentId}`);
  };

  useEffect(() => {
    if (productDocumentId && productCategoryDocumentId) {
      const serchConfig = makeRelatedProductsParams({
        productCategoryDocumentId,
        productDocumentId,
        quantity: RELATED_ITEMS_QUANTITY,
      });
      const searchParams = qs.stringify(serchConfig, { encode: false });
      setrelatedIsLoading(true);
      getProductList(searchParams)
        .then((res: TProductListResponse) => {
          setRelated(res.data);
        })
        .catch((err: string) => console.log(err))
        .finally(() => {
          setrelatedIsLoading(false);
        });
    }
  }, [productDocumentId, productCategoryDocumentId]);

  return (
    <div className={styles.wrapper}>
      <Text view="subtitle" tag="h2" className={styles.title}>
        Related Items
      </Text>
      <ProductCardsList
        products={related}
        addToCart={handleAddToCart}
        onCardClick={handleCardClick}
        isLoading={relatedIsLoading}
      />
    </div>
  );
};

export default RelatedProducts;
