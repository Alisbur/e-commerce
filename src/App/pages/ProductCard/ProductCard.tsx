import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import styles from './ProductCard.module.scss';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';
import { handleAddToCart, handleBuyNow } from 'utils/cart';
import { makeProductDetailsSearchParams } from 'api/utils';
import ProductDetailsStore from 'store/ProductDetailsStore';
import { useLocalStore } from 'utils/useLocalStore';
import { RequestStatus } from 'utils/requestStatus';
import { observer } from 'mobx-react-lite';

const ProductCardData = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();

  const productStore = useLocalStore(() => new ProductDetailsStore());

  useEffect(() => {
    if (documentId) {
      const searchParams = makeProductDetailsSearchParams();
      productStore.downloadProductDetails({ documentId, searchParams });
      console.log('download');
    }
  }, [documentId, productStore]);

  const handleBuyProductNow = useCallback(() => {
    const product = productStore.productDetails;
    if (product?.id) handleBuyNow(product.id);
  }, [productStore]);

  const handleAddProductToCart = useCallback(() => {
    const product = productStore.productDetails;
    if (product?.id) handleAddToCart(product.id);
  }, [productStore]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <BackButton caption="Назад" onBack={() => navigate(-1)} />
        {productStore.productDetails && (
          <ProductDetails
            product={productStore.productDetails}
            isLoading={productStore.requestStatus === RequestStatus.loading}
          >
            <Button onClick={handleBuyProductNow}>Buy Now</Button>
            <Button onClick={handleAddProductToCart} variant="white">
              Add to Cart
            </Button>
          </ProductDetails>
        )}
        {productStore.productDetails && (
          <RelatedProducts
            productDocumentId={documentId ?? ''}
            productCategoryDocumentId={productStore.productDetails.productCategory?.documentId ?? ''}
          />
        )}
      </div>
    </section>
  );
};

const ProductCard = observer(ProductCardData);

export default ProductCard;
