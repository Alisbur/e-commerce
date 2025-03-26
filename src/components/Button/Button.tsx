import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import Loader from '../Loader';
import Text from '../Text';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  onClick,
  disabled,
  className,
  ...rest
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick !== undefined) {
      onClick(e);
    }
  };

  return (
    <button
      className={cx(
        styles.button,
        disabled && styles.button_disabled,
        loading && styles.noHover,
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Loader size="s" />}
      <Text view="button" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default Button;
