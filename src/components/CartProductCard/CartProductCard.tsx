import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './CartProductCard.module.scss';
import Text from 'components/Text';

export type CartProductCard = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle?: React.ReactNode;
  /** Количество */
  quantitySlot?: React.ReactNode;
  /** Цена */
  priceSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для удаления карточки */
  removeSlot?: React.ReactNode;
};

const CartProductCard: React.FC<CartProductCard> = ({
  className,
  image,
  title,
  subtitle,
  quantitySlot,
  priceSlot,
  removeSlot,
  onClick,
}) => {
  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick !== undefined) onClick(e);
  };

  return (
    <article className={classNames(styles.card, className)} onClick={handleCardClick}>
      <img src={image} className={styles.card__header_image} alt="Изображение" />
      <div className={styles.card__content_about}>
        <Text view="p-20" color="primary" weight="medium" maxLines={2}>
          {title}
        </Text>
        <Text view="p-16" color="secondary" maxLines={3}>
          {subtitle}
        </Text>
      </div>
      {quantitySlot}
      {priceSlot}
      {removeSlot}
    </article>
  );
};

export default CartProductCard;
