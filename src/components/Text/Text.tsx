import * as React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

const cx = classNames.bind(styles);

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag = 'p', weight, children, color, maxLines }) => {
  const Element = tag;
  let isClamped = false;
  let extraStyles: { [key: string]: string } = {};

  if (maxLines !== undefined && typeof maxLines === 'number') {
    extraStyles = { ...extraStyles, WebkitLineClamp: maxLines.toString() };
    isClamped = true;
  }

  return (
    <Element
      className={cx(
        Boolean(view) && styles[`view_${view}`],
        isClamped && styles.clamped,
        Boolean(color) && styles[`text_${color}`],
        weight === 'medium' && styles.text_medium,
        weight === 'semibold' && styles.text_semibold,
        className,
      )}
      style={extraStyles}
    >
      {children}
    </Element>
  );
};

export default Text;
