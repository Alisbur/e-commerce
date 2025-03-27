import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowRight: React.FC<IconProps> = ({ width = 24, height = 24, ...rest }: IconProps) => {
  return (
    <Icon width={width} height={height} {...rest}>
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

export default ArrowRight;
