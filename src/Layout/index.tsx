import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../components/Footer';
import Header from '../components/Header';

import styles from './layout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
        <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
        <Footer />
    </div>
  );
};

export default MainLayout;
