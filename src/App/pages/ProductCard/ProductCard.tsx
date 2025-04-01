import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import styles from './ProductCard.module.scss';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import { getProductDetails } from 'api/agent/details';
import { TProduct, TProductResponse } from 'entities/types/types';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';
import { handleAddToCart, handleBuyNow } from 'utils/cart';
import { makeProductDetailsSearchParams } from 'api/utils';

const ProductCard = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<TProduct>();
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    if (documentId) {
      const searchParams = makeProductDetailsSearchParams();

      setProductIsLoading(true);
      getProductDetails({ documentId, searchParams })
        .then((res: TProductResponse) => {
          setProduct(res.data);
        })
        .catch((err: string) => console.log(err))
        .finally(() => {
          setProductIsLoading(false);
        });
    }
  }, [documentId]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <BackButton caption="Назад" onBack={() => navigate(-1)} />
        {product && (
          <ProductDetails product={product} isLoading={productIsLoading}>
            <Button onClick={() => handleBuyNow(product.id)}>Buy Now</Button>
            <Button onClick={() => handleAddToCart(product.id)} variant="white">
              Add to Cart
            </Button>
          </ProductDetails>
        )}
        {product && (
          <RelatedProducts
            productDocumentId={documentId ?? ''}
            productCategoryDocumentId={product.productCategory?.documentId ?? ''}
          />
        )}
      </div>
    </section>
  );
};

export default ProductCard;
