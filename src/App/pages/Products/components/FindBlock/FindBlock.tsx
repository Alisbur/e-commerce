import { FC } from 'react';
import styles from './FindBlock.module.scss';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Button from 'components/Button';
import { TFilterOption } from 'App/pages/Products';

type TFindBlockProps = {
  searchString: string;
  onSearchStringChange: (s: string) => void;
  filterOptions: TFilterOption[];
  filterValue: TFilterOption[];
  onFilterChange: (options: TFilterOption[]) => void;
  onFind: () => void;
  getTitle: () => string;
};

const FindBlock: FC<TFindBlockProps> = ({
  searchString,
  onSearchStringChange,
  filterOptions,
  filterValue,
  onFilterChange,
  onFind,
  getTitle,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.find}>
        <Input
          value={searchString}
          onChange={onSearchStringChange}
          placeholder={!searchString ? 'Search product' : ''}
        />
        <Button
          onClick={() => {
            onFind();
          }}
        >
          Find now
        </Button>
      </div>
      <MultiDropdown
        className={styles.filter}
        options={filterOptions}
        value={filterValue}
        onChange={onFilterChange}
        getTitle={getTitle}
      />
    </div>
  );
};

export default FindBlock;
