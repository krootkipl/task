import React from 'react';
import styles from './App.module.scss';
import Navbar from './components/navbar';
import Balance from './components/balance';
import Filter from './components/filter';
import FormComponent from './components/form';
import Table from './components/table';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Navbar/>
      </header>
      <main className={styles.main}>
        <div className={styles.main__inputs}>
          <div className={styles.main__inputs__manage}>
            <Balance/>
            <Filter/>
          </div>
          <div className={styles.main__form}>
            <FormComponent/>
          </div>
        </div>
        <div className={styles.main__table}>
          <Table/>
        </div>
      </main>
      <footer className={styles.footer}>
        <Footer/>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
