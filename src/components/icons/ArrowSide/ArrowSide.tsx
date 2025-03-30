import * as React from 'react';
import styles from './ArrowSide.module.scss';
import Icon, { IconProps } from '../Icon';

type TArrowSideProps = IconProps & { side?: 'left' | 'right' };

const ArrowSide: React.FC<TArrowSideProps> = ({ width = 24, height = 24, side = 'right', ...rest }) => {
  return (
    <Icon width={width} height={height} className={side === 'left' ? styles.left : ''} {...rest}>
      <path
        d="M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.07999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowSide;
