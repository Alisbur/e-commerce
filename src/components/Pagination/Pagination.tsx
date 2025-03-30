import { FC } from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import ArrowSide from 'components/icons/ArrowSide';

const cx = classNames.bind(styles);

export type TPaginationProps = {
  page?: number;
  pageSize?: number;
  pageCount?: number;
  total?: number;
  next: () => void;
  prev: () => void;
  goto: (n: number) => void;
};

const Pagination: FC<TPaginationProps> = ({ page = 1, pageCount = 1, next, prev, goto }) => {
  return (
    <div className={styles.pagination}>
      <ArrowSide
        role="button"
        side="left"
        width={35}
        height={35}
        className={cx(
          styles.pagination__arrow,
          styles.pagination__arrow_left,
          page <= 1 && styles.pagination__arrow_disabled,
        )}
        onClick={prev}
      />
      <ul className={styles.pagination__pages}>
        {new Array(pageCount).fill('').map((_, idx) => (
          <li
            key={idx}
            className={cx(styles.pagination__page, page === idx + 1 && styles.pagination__page_active)}
            role="button"
            onClick={() => goto(idx + 1)}
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
        className={cx(styles.pagination__arrow, page >= pageCount && styles.pagination__arrow_disabled)}
        onClick={next}
      />
    </div>
  );
};

export default Pagination;
