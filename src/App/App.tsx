import { Outlet } from 'react-router';
import styles from './App.module.scss';
import NavBar from 'components/NavBar';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

function App() {
  useQueryParamsStoreInit();

  return (
    <div className={styles.app}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
