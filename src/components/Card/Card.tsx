import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';
import Text from 'components/Text';

export type CardProps = {
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
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot = <></>,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick !== undefined) onClick(e);
  };

  return (
    <article className={classNames(styles.card, className)} onClick={handleCardClick}>
      <img src={image} className={styles.card__header_image} alt="Изображение" />
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
          <Text view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        <div className={styles.card__content_action}>
          {contentSlot ? (
            <Text view="p-18" color="primary" weight="bold" maxLines={1}>
              {contentSlot}
            </Text>
          ) : (
            <div></div>
          )}
          {actionSlot ? actionSlot : <div></div>}
        </div>
      </div>
    </article>
  );
};

export default Card;
