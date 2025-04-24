import styles from './AboutUs.module.scss';
import Text from 'components/Text';
import BackButton from 'components/BackButton';
import { useLocation, useNavigate } from 'react-router';
import { FC, useEffect } from 'react';
import rootStore from 'store/RootStore';

const AboutUs: FC = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const {setSearchParamsString} = rootStore.query;

  useEffect(() => {
    if (search !== undefined) {
      setSearchParamsString(search);
    }
  }, [search, setSearchParamsString]);

  return (
    <div className={styles.wrapper}>
      <Text view="title" tag="span" color="accent">
        About Us page
      </Text>
      <BackButton onBack={() => navigate(-1)} caption="Back" />
    </div>
  );
};

export default AboutUs;
