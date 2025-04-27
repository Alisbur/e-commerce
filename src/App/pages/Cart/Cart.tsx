import styles from './Cart.module.scss';
import BackButton from 'components/BackButton';
import { useLocation, useNavigate } from 'react-router';
import { FC, useEffect } from 'react';
import rootStore from 'store/RootStore';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import { PAGE_ROUTES } from 'config/routes';
import TotalBlock from 'components/TotalBlock';
import TitleBlock from 'components/TitleBlock';
import CartProductCardList from 'components/CartProductCardList';

const Cart: FC = observer(() => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { setSearchParamsString } = rootStore.query;
  const {
    cart,
    isLoading,
    productList,
    resetProductList,
    removeProductFromCart,
    incProductQuantity,
    decProductQuantity,
    removeCartFromLocalStorage,
    cartProductsList,
    cartTotalPrice,
    downloadCartProductList,
  } = rootStore.cart;

  useEffect(() => {
    if (search !== undefined) {
      setSearchParamsString(search);
    }
    if (cartProductsList.length) {
      downloadCartProductList({ searchParams: { productIdList: cartProductsList } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, setSearchParamsString, downloadCartProductList, resetProductList]);

  const handleIncQty = (documentId: string, price: number) => {
    incProductQuantity(documentId, price);
  };

  const handleDecQty = (documentId: string) => {
    decProductQuantity(documentId);
  };

  const handleRemoveCard = (documentId: string) => {
    removeProductFromCart(documentId);
  };

  const handleCardClick = (documentId: string) => {
    navigate(PAGE_ROUTES.product.create(documentId));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div style={{ width: '100%' }}>
          <BackButton caption="Back" onBack={() => navigate(-1)} />
        </div>
        <TitleBlock align="center" title="Cart">
          Here you can find products you've added to your cart and buy it.
        </TitleBlock>
        <CartProductCardList
          cart={cart}
          products={productList}
          onCardClick={handleCardClick}
          incQty={handleIncQty}
          decQty={handleDecQty}
          onCardRemove={handleRemoveCard}
          isLoading={isLoading}
        />
        <div className={styles.actions}>
          <TotalBlock title="Total price:" total={`${cartTotalPrice.toFixed(2)}$`} />
          <Button variant="white" onClick={() => removeCartFromLocalStorage()}>
            Purchase
          </Button>
          <Button onClick={() => removeCartFromLocalStorage()}>Clear cart</Button>
        </div>
      </div>
    </div>
  );
});

export default Cart;
