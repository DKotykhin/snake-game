import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

import logo from '../../images/logo192.png';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Box className={styles.header_wrapper}>
        <Link to={'/'} className={styles.logo_wrapper}>
          <img src={logo} alt='logo' width={40} />
          <Typography className={styles.header__text}>Snake Game</Typography>
        </Link>
        <Link to={'sign-in'} className={styles.link_text}>
          <Typography className={styles.header__text}>Sign In</Typography>
        </Link>
      </Box>
    </header>
  );
};

export default Header;
