import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Text from 'components/Text';
import styles from './SingleDropdown.module.scss';
import { TFilterOption } from 'App/pages/Products';

/** Пропсы, которые принимает компонент Dropdown */
export type SingleDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: TFilterOption[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: TFilterOption[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: TFilterOption[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: TFilterOption[]) => string;
};

const SingleDropdown: React.FC<SingleDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<TFilterOption[]>(options);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    if (!disabled) setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleCloseDropdown = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        closeDropdown();
        setQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mouseup', handleCloseDropdown);
    }

    return () => {
      document.removeEventListener('mouseup', handleCloseDropdown);
    };
  }, [isOpen]);

  useEffect(() => {
    const newFilterItems = options.filter((el) => el.value.toLowerCase().includes(query.toLowerCase()));
    setFilteredItems(newFilterItems);
  }, [query, options]);

  return (
    <div className={classNames(styles.multiDropdown, className)} ref={inputRef}>
      <Input
        value={!isOpen && value.length ? getTitle(value) : query}
        placeholder={getTitle(value)}
        onChange={(s) => setQuery(s)}
        onFocus={() => {
          if (!isOpen) {
            openDropdown();
          }
        }}
        afterSlot={
          <ArrowDownIcon
            color="secondary"
            onClick={() => (isOpen ? closeDropdown() : openDropdown())}
            className={styles.pointer}
          />
        }
        className={value.length && !isOpen ? styles.values : styles.empty}
        disabled={disabled}
      />
      {isOpen && !disabled && (
        <div className={styles.options}>
          {filteredItems.map((item) => {
            const isSelected = value.some((el) => item.key === el.key);

            return (
              <div
                key={item.key}
                className={styles.option}
                onClick={() => {
                  onChange([item]);
                }}
              >
                <Text
                  view="p-16"
                  tag="div"
                  color={isSelected ? 'accent' : 'primary'}
                  className={classNames(styles.optionItem, { [styles.selected]: isSelected })}
                >
                  {item.value}
                </Text>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SingleDropdown;
