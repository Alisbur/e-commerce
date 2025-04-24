import styles from './Categories.module.scss';
import Text from 'components/Text';
import BackButton from 'components/BackButton';
import { useLocation, useNavigate } from 'react-router';
import { FC, useEffect } from 'react';
import rootStore from 'store/RootStore';

const Categories: FC = () => {
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
        Categories page
      </Text>
      <BackButton onBack={() => navigate(-1)} caption="Back" />
    </div>
  );
};

export default Categories;
