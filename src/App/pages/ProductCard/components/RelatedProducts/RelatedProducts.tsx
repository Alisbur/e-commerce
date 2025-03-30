import { FC, useEffect, useState } from 'react';
import styles from './RelatedProducts.module.scss';
import qs from 'qs';
import ProductCardsList from 'components/ProductCardsList';
import { TProduct, TProductListResponse } from 'entities/types/types';
import { getProductList } from 'api/agent/list';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import { handleAddToCart } from 'utils/cart';

type TRelatedProductsProps = {
  productDocunmentId: string;
  productCategoryDocumentId: string;
};

const RelatedProducts: FC<TRelatedProductsProps> = ({ productDocunmentId, productCategoryDocumentId }) => {
  const [relatedIsLoading, setrelatedIsLoading] = useState(false);
  const [related, setRelated] = useState<TProduct[]>([]);

  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(`/product/${documentId}`);
  };

  useEffect(() => {
    if (productDocunmentId && productCategoryDocumentId) {
      const relatedConfig = {
        fields: ['title', 'description', 'price'],
        populate: ['images', 'productCategory'],
        pagination: {
          limit: 3,
        },
        filters: {
          productCategory: {
            documentId: {
              $eq: productCategoryDocumentId,
            },
          },
          documentId: {
            $ne: productDocunmentId,
          },
        },
      };

      const searchParams = qs.stringify(relatedConfig, { encode: false });
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
  }, [productDocunmentId, productCategoryDocumentId]);

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
