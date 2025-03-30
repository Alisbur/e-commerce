import { Link, NavLink } from 'react-router';
import styles from './NavBar.module.scss';
import { FC } from 'react';
import lasiaLogo from 'assets/logo.svg';
import { routes } from 'config/routes';
import NavBarLinkComponent from 'components/NavBar/NavBarLink/NavBarLink';
import { NAVBAR_LINKS } from 'config/navbar-links';
import { TNavBarLink } from 'config/navbar-links';
import BagIcon from 'components/icons/BagIcon';
import UserIcon from 'components/icons/UserIcon';

const NavBar: FC = () => {
  return (
    <div className={styles.navBar}>
      <Link to={routes.main.mask}>
        <img src={lasiaLogo} alt="Логотип компании" className={styles.navBar__logo} />
      </Link>
      <ul className={styles.navBar__links}>
        {NAVBAR_LINKS.map((link: TNavBarLink) => (
          <li key={link.id}>
            <NavBarLinkComponent caption={link.caption} route={link.route} />
          </li>
        ))}
      </ul>
      <div className={styles.navBar__accountLinks}>
        <NavLink to={routes.cart.mask} className={styles.navBar__accountLink}>
          {({ isActive }) => <BagIcon width={30} height={30} color={isActive ? 'accent' : 'primary'} />}
        </NavLink>
        <NavLink to={routes.account.mask} className={styles.navBar__accountLink}>
          {({ isActive }) => <UserIcon width={30} height={30} color={isActive ? 'accent' : 'primary'} />}
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
