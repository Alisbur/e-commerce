import { FC } from 'react';
import styles from './TotalBlock.module.scss';
import Text from 'components/Text';

type TTotalProps = {
  total: number | undefined | null;
};

const TotalBlock: FC<TTotalProps> = ({ total }) => {
  return (
    <div className={styles.total}>
      <Text view="subtitle" tag="h3">
        Total products
      </Text>
      {total && (
        <Text view="p-20" tag="span" weight="bold" color="accent" className={styles.quantity}>
          {total}
        </Text>
      )}
    </div>
  );
};

export default TotalBlock;
