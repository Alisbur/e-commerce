import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, disabled, placeholder, className, ...rest }, ref) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={cx(styles.inputWrapper, className)}>
        <input
          type="text"
          ref={ref}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />
        {!!afterSlot && afterSlot}
      </div>
    );
  }
);

export default Input;
