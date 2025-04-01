import { Link, NavLink } from 'react-router';
import styles from './NavBar.module.scss';
import { FC } from 'react';
import lasiaLogo from 'assets/logo.svg';
import { PAGE_ROUTES } from 'config/routes';
import NavBarLinkComponent from 'components/NavBar/NavBarLink/NavBarLink';
import { NAVBAR_LINKS } from 'config/navbar-links';
import { TNavBarLink } from 'config/navbar-links';
import BagIcon from 'components/icons/BagIcon';
import UserIcon from 'components/icons/UserIcon';

const NavBar: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navBar}>
        <Link to={PAGE_ROUTES.main.mask}>
          <img src={lasiaLogo} alt="Логотип компании" className={styles.navBar__logo} />
        </Link>
        <ul className={styles.navBar__links}>
          {NAVBAR_LINKS.map((link: TNavBarLink) => (
            <li key={link.caption}>
              <NavBarLinkComponent caption={link.caption} route={link.route} />
            </li>
          ))}
        </ul>
        <div className={styles.navBar__accountLinks}>
          <NavLink to={PAGE_ROUTES.cart.mask} className={styles.navBar__accountLink}>
            {({ isActive }) => <BagIcon width={30} height={30} color={isActive ? 'accent' : 'primary'} />}
          </NavLink>
          <NavLink to={PAGE_ROUTES.account.mask} className={styles.navBar__accountLink}>
            {({ isActive }) => <UserIcon width={30} height={30} color={isActive ? 'accent' : 'primary'} />}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
