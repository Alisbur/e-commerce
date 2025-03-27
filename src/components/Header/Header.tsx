import { FC } from 'react';
import NavBar from 'components/NavBar';
import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <NavBar />
    </header>
  );
};

export default Header;
