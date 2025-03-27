import { FC } from 'react';
import classNames from 'classnames';
import { TNavBarLink } from 'config/navbar-links';
import { NavLink } from 'react-router';
import Text from 'components/Text';
import styles from './NavBarLink.module.scss';

const cx = classNames.bind(styles);

type TNavBarLinkComponent = Omit<TNavBarLink, 'id'>;

const NavBarLinkComponent: FC<TNavBarLinkComponent> = ({ caption, route }) => {
  return (
    <div className={styles.linkWrapper}>
      <NavLink
        to={route}
        className={({ isActive }) => (isActive ? cx(styles.link, styles.link_active) : styles.link)}
        style={{ position: 'relative' }}
      >
        {({ isActive }) => (
          <Text view="p-18" tag="span" color={isActive ? 'accent' : 'primary'} weight={isActive ? 'semibold' : 'normal'}>
            {caption}
          </Text>
        )}
      </NavLink>
    </div>
  );
};

export default NavBarLinkComponent;
