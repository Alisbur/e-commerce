import { FC, ReactNode } from 'react';
import styles from './CartProductCardList.module.scss';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { TProductModel } from 'store/models';
import { TCart } from 'store/RootStore/CartStore/CartStore';
import CartProductCard from 'components/CartProductCard';
import ArrowSide from 'components/icons/ArrowSide';
import { observer } from 'mobx-react-lite';

type CartProductCardListProps = {
  products: TProductModel[];
  cart: TCart;
  onCardClick: (documentId: string) => void;
  incQty: (documentId: string, price: number) => void;
  decQty: (documentId: string) => void;
  onCardRemove: (documentId: string) => void;
  paginationSlot?: ReactNode;
  isLoading: boolean;
};

const CartProductCardList: FC<CartProductCardListProps> = observer(
  ({ products, cart, isLoading, incQty, decQty, onCardClick, onCardRemove, paginationSlot }) => {
    if (isLoading) return <Loader size="l" />;

    if (!Array.isArray(products))
      return (
        <Text view="subtitle" tag="div" color="secondary" weight="semibold">
          Something went wrong... Refresh page
        </Text>
      );

    if (!cart.products.length || !products.length)
      return (
        <Text view="subtitle" tag="div" color="secondary" weight="semibold">
          Cart is empty
        </Text>
      );

    if (!isLoading && !products.length)
      return (
        <Text view="subtitle" tag="div" color="secondary" weight="semibold">
          Nothing found...
        </Text>
      );

    return (
      <section className={styles.wrapper}>
        <div className={styles.products}>
          {products.length ? (
            products.map((p) => {
              const cartProductData = cart.products.find((product) => product.productId === p.documentId);
              const price = cartProductData!.price;
              const documentId = cartProductData!.productId;
              const quantity = cartProductData!.quantity;
              return (
                <CartProductCard
                  key={documentId}
                  image={p.images && p.images[0].formats?.small?.url ? p.images[0].formats?.small?.url : ''}
                  title={p.title}
                  subtitle={p.description}
                  quantitySlot={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                      <ArrowSide
                        side="up"
                        onClick={(e) => {
                          e.stopPropagation();
                          incQty(documentId, price);
                        }}
                      />
                      <Text tag="span" view="subtitle" weight="semibold" color="accent">
                        {cartProductData?.quantity}
                      </Text>
                      <ArrowSide
                        side="down"
                        onClick={(e) => {
                          e.stopPropagation();
                          decQty(documentId);
                        }}
                      />
                    </div>
                  }
                  priceSlot={
                    <Text tag="span" view="subtitle" weight="semibold" color="accent">
                      {(price * quantity).toFixed(2)}$
                    </Text>
                  }
                  removeSlot={<Button onClick={() => onCardRemove(documentId)}>Remove</Button>}
                  onClick={() => {
                    onCardClick(documentId);
                  }}
                />
              );
            })
          ) : (
            <Text view="subtitle" tag="span" color="accent">
              Cart is empty
            </Text>
          )}
        </div>
        {paginationSlot}
      </section>
    );
  },
);

export default CartProductCardList;
