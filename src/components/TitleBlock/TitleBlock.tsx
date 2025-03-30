import { FC, ReactNode } from 'react';
import styles from './TitleBlock.module.scss';
import Text from 'components/Text';

type TTitleBlockProps = {
  title: string;
  align?: 'left' | 'center';
  children: ReactNode;
};

const TitleBlock: FC<TTitleBlockProps> = ({ title, children, align = 'left' }) => {
  return (
    <div className={styles.wrapper}>
      <Text view="title" tag="h1" color="primary" className={align === 'center' ? styles.center : ''}>
        {title}
      </Text>
      <Text view="p-20" tag="p" color="secondary" className={align === 'center' ? styles.center : ''}>
        {children}
      </Text>
    </div>
  );
};

export default TitleBlock;
