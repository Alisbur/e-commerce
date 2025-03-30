import React from 'react';
import classNames from 'classnames';
import CheckIcon from 'components/icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, checked = false, disabled, className, ...rest }) => {
  return (
    <div className={styles.checkbox} onClick={() => !disabled && onChange(!checked)}>
      {!!checked && <CheckIcon width={40} height={40} className={styles.checkIcon} />}
      <input
        type="checkbox"
        className={classNames(styles.hiddenCheckbox, className)}
        defaultChecked={checked}
        disabled={disabled}
        style={{ visibility: 'hidden' }}
        {...rest}
      />
    </div>
  );
};

export default CheckBox;
