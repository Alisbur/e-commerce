import { FC } from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import ArrowSide from 'components/icons/ArrowSide';

export type TPaginationProps = {
  page?: number | null;
  pageCount?: number | null;
  next: () => void;
  prev: () => void;
  goTo: (n: number) => void;
};

const Pagination: FC<TPaginationProps> = ({ page = 1, pageCount = 1, next, prev, goTo }) => {
  if (typeof page !== 'number' || typeof pageCount !== 'number') return null;

  return (
    <div className={styles.pagination}>
      <ArrowSide
        role="button"
        side="left"
        width={35}
        height={35}
        className={classNames(styles.pagination__arrow, styles.pagination__arrow_left, {
          [styles.pagination__arrow_disabled]: page <= 1,
        })}
        onClick={prev}
      />
      <ul className={styles.pagination__pages}>
        {Array(pageCount)
          .fill(0)
          .map((_, idx) => (
            <li
              key={idx}
              className={classNames(styles.pagination__page, { [styles.pagination__page_active]: page === idx + 1 })}
              role="button"
              onClick={() => goTo(idx + 1)}
            >
              {idx + 1}
            </li>
          ))}
      </ul>
      <ArrowSide
        role="button"
        side="right"
        width={35}
        height={35}
        className={classNames(styles.pagination__arrow, { [styles.pagination__arrow_disabled]: page >= pageCount })}
        onClick={next}
      />
    </div>
  );
};

export default Pagination;
