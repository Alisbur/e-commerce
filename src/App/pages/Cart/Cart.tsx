import styles from './Cart.module.scss';
import Text from 'components/Text';
import BackButton from 'components/BackButton';
import { useNavigate } from 'react-router';
import { FC } from 'react';

const Cart: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Text view="title" tag="span" color="accent">
        Cart page
      </Text>
      <BackButton onBack={() => navigate(-1)} caption="Back" />
    </div>
  );
};

export default Cart;
