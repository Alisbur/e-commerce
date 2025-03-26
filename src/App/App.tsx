import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router';
import styles from './App.module.scss';

const cx = classNames.bind(styles);

function App() {

  return (
    <div className={cx(styles.app)}>
      <Outlet />
    </div>
  )
}

export default App;
