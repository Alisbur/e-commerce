import * as React from 'react';
import classNames from 'classnames';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ children, color, className, width, height, ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={cx(styles.icon, Boolean(color) && styles[`icon_${color}`], className)}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Icon;
