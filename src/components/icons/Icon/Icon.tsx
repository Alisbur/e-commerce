import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  color,
  className,
  width,
  height,
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className ? className : undefined}
      xmlns="http://www.w3.org/2000/svg"
      style={{color: color ? `var(--text-${color})` : 'inherit'}}
      {...rest}
    >
      {children}
    </svg>
  );
};

export default Icon;
