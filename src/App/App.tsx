import React from 'react';
import classNames from 'classnames';
import { Outlet } from 'react-router';
import styles from './App.module.scss';
import Button from 'components/Button';

const cx = classNames.bind(styles);

function App() {

  return (
    <div className={cx(styles.app)}>
      <Button>Test</Button>
      <Outlet />
    </div>
  )
}

export default App;
