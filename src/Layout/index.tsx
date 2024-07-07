import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Footer } from '../components/Footer';
import Header from '../components/Header';
import { useUserStore } from 'store/userStore';

import styles from './layout.module.scss';

const MainLayout: React.FC = () => {
  const addUser = useUserStore((state) => state.addUser);

  useEffect(() => {
    const token = Cookies.get('token');
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/auth/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        addUser(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message || err.message);
      });
  }, [addUser]);

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
