import { FC } from 'react';
import styles from './TotalBlock.module.scss';
import Text from 'components/Text';

type TTotalProps = {
  title: string;
  total: number | undefined | null;
};

const TotalBlock: FC<TTotalProps> = ({ title, total }) => {
  return (
    <div className={styles.total}>
      <Text view="subtitle" tag="h3">
        {title}
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
