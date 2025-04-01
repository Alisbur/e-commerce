import styles from './Account.module.scss';
import Text from 'components/Text';
import BackButton from 'components/BackButton';
import { useNavigate } from 'react-router';
import { FC } from 'react';

const Account: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Text view="title" tag="span" color="accent">
        Account page
      </Text>
      <BackButton onBack={() => navigate(-1)} caption="Back" />
    </div>
  );
};

export default Account;
