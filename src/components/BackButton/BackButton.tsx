import { FC } from 'react';
import styles from './BackButton.module.scss';
import Text from 'components/Text';
import ArrowSide from 'components/icons/ArrowSide';

type TBackButtonProps = {
  onBack: () => void;
  caption: string;
};

const BackButton: FC<TBackButtonProps> = ({ onBack, caption }) => {
  return (
    <div className={styles.wrapper} role="button" onClick={onBack}>
      <ArrowSide side="left" width={32} height={32} />
      <Text view="p-20" tag="span">
        {caption}
      </Text>
    </div>
  );
};

export default BackButton;
