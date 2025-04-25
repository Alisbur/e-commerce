import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './CategoryCard.module.scss';
import Text from 'components/Text';

export type CategoryCardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  onClick?: React.MouseEventHandler;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  className,
  image,
  captionSlot = <></>,
  title,
  onClick,
}) => {
  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick !== undefined) onClick(e);
  };

  return (
    <article className={classNames(styles.card, className)} onClick={handleCardClick}>
      <img src={image} className={styles.card__header_image} alt={`Category ${title}`} />
      <div className={styles.card__content}>
        <div className={styles.card__content_about}>
          {Boolean(captionSlot) && (
            <Text view="p-14" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text view="p-20" color="primary" weight="medium" maxLines={2}>
            {title}
          </Text>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
