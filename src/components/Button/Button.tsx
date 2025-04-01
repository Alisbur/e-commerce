import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import Loader from 'components/Loader';
import Text from 'components/Text';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Стиль кнопки */
  variant?: 'brand' | 'white';
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  onClick,
  disabled,
  className,
  variant = 'brand',
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
      className={classNames(
        styles.button,
        styles[`button_${variant}`],
        { [styles[`button_${variant}_disabled`]]: disabled },
        { [styles.noHover]: loading },
        className,
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Loader size="s" className={styles.loader} />}
      <Text view="button" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default Button;
