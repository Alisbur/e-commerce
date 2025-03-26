import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Text from '../Text';
import styles from './MultiDropdown.module.scss';

const cx = classNames.bind(styles);

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Option[]>(options);
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
    const newFilterItems = options.filter((el) =>
      el.value.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(newFilterItems);
  }, [query, options]);

  return (
    <div
      className={cx(styles.multiDropdown, className)}
      ref={inputRef}
    >
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
          />
        }
        className={value.length && !isOpen ? styles.values : styles.empty}
        disabled={disabled}
      />
      {isOpen && !disabled && (
        <div className={styles.options}>
          {filteredItems.map((item: Option) => {
            const isSelected = value.some((el) => item.key === el.key);

            return (
              <div
                key={item.key}
                className={styles.option}
                onClick={() => {
                  onChange(
                    !isSelected
                      ? [...value, item]
                      : value.filter((el) => el.key !== item.key)
                  );
                }}
              >
                <Text
                  view="p-16"
                  tag="div"
                  color={isSelected ? 'accent' : 'primary'}
                  className={cx(styles.optionItem, isSelected && styles.selected)}
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

export default MultiDropdown;
