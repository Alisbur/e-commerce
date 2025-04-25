import { FC, FormEvent } from 'react';
import styles from './FindBlock.module.scss';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import SingleDropdown from 'components/SingleDropdown';
import Button from 'components/Button';
import { TFilterOption } from 'App/pages/Products';

type TFindBlockProps = {
  searchString: string;
  onSearchStringChange: (s: string) => void;
  filterOptions: TFilterOption[];
  filterValue: TFilterOption[];
  onFilterChange: (options: TFilterOption[]) => void;
  getFilterTitle: () => string;
  sortOptions: TFilterOption[];
  sortValue: TFilterOption[];
  onSortChange: (options: TFilterOption[]) => void;
  getSortTitle: () => string;
  onFind: () => void;
  onReset: () => void;
};

const FindBlock: FC<TFindBlockProps> = ({
  searchString,
  onSearchStringChange,
  filterOptions,
  filterValue,
  onFilterChange,
  getFilterTitle,
  sortOptions,
  sortValue,
  onSortChange,
  getSortTitle,
  onFind,
  onReset,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFind();
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.find}>
        <Input
          value={searchString}
          onChange={onSearchStringChange}
          placeholder={!searchString ? 'Search product' : ''}
        />
        <Button onClick={onFind}>Find now</Button>
      </div>
      <div className={styles.extraFilters}>
        <MultiDropdown
          className={styles.filter}
          options={filterOptions}
          value={filterValue}
          onChange={onFilterChange}
          getTitle={getFilterTitle}
        />
        <SingleDropdown
          className={styles.filter}
          options={sortOptions}
          value={sortValue}
          onChange={onSortChange}
          getTitle={getSortTitle}
        />
        <Button onClick={onReset} variant="white">
          Reset search
        </Button>
      </div>
    </form>
  );
};

export default FindBlock;
