import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ width = 24, height = 24, ...rest }: IconProps) => {
  return (
    <Icon width={width} height={height} {...rest}>
      <path d="M4 11.6129L9.87755 18L20 7" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
