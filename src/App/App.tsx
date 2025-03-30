import { Outlet } from 'react-router';
import styles from './App.module.scss';
import NavBar from 'components/NavBar';

function App() {
  return (
    <div className={styles.app}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
