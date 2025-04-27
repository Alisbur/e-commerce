import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import styles from './ProductCard.module.scss';
import BackButton from 'components/BackButton';
import Button from 'components/Button';
import ProductDetails from './components/ProductDetails';
import RelatedProducts from './components/RelatedProducts';
import { handleBuyNow } from 'utils';
import ProductDetailsStore from 'store/local/ProductDetailsStore';
import { useLocalStore } from 'utils';
import { observer } from 'mobx-react-lite';
import rootStore from 'store/RootStore';

const ProductCard = observer(() => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const productStore = useLocalStore(() => new ProductDetailsStore());
  const { productDetails} = productStore;
  const { search } = useLocation();
  const { setSearchParamsString } = rootStore.query;
  const { addProductToCart } = rootStore.cart;


  useEffect(() => {
    if (search !== undefined) {
      setSearchParamsString(search);
    }
  }, [search, setSearchParamsString]);

  useEffect(() => {
    if (documentId) {
      productStore.downloadProductDetails({ documentId, searchParams: {} });
    }
  }, [documentId, productStore]);

  const handleBuyProductNow = useCallback(() => {
    const product = productStore.productDetails;
    if (product?.id) handleBuyNow(product.id);
  }, [productStore]);

  const handleAddProductToCart = useCallback(() => {
    const product = productDetails;
    if (product) {
      const { documentId, price } = product;
      addProductToCart(documentId, price)};
  }, [productDetails, addProductToCart]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <BackButton caption="Back" onBack={() => navigate(-1)} />
        {productStore.productDetails && (
          <ProductDetails product={productStore.productDetails} isLoading={productStore.isLoading}>
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
});

export default ProductCard;
