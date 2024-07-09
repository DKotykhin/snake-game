import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Avatar, Popover, Divider } from '@mui/material';
import Cookies from 'js-cookie';

import logo from '../../images/logo192.png';
import { useUserStore } from 'store/userStore';
import { useRecordsStore } from 'store/recordsStore';

import styles from './header.module.scss';

const getFirstLetters = (str: string) => {
  if (!str) {
    return '';
  }
  let words = str.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0];
  } else if (words.length >= 2) {
    return words[0][0] + words[1][0];
  } else {
    return '';
  }
};

const Header = () => {
  const { userData, removeUser } = useUserStore();
  const { removeRecords } = useRecordsStore();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClick = () => {
    Cookies.remove('token');
    removeUser();
    removeRecords();
    navigate('/sign-in');
};

  const open = Boolean(anchorEl);

  return (
    <header className={styles.header}>
      <Box className={styles.header_wrapper}>
        <Link to={'/'} className={styles.logo_wrapper}>
          <img src={logo} alt='logo' width={40} />
          <Typography className={styles.header__text}>Snake Game</Typography>
        </Link>
        {userData?.id ? (
          <Box className={styles.userBox}>
            <Typography className={styles.userName}>{userData.userName}</Typography>
            <Avatar alt={userData.userName} src={userData?.avatarUrl || ''} onClick={handleClick} sx={{ cursor: 'pointer' }}>
              {getFirstLetters(userData.userName)}
            </Avatar>
          </Box>
        ) : (
          <Link to={'sign-in'} className={styles.link}>
            <Typography className={styles.link__text}>Sign In</Typography>
          </Link>
        )}
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ marginTop: '10px' }}
      >
        <Box className={styles.popover} onClick={handleClose}>
          <Link to={'/profile'} className={styles.popover_link}>
            Profile
          </Link>
          <Divider />
          <Typography className={styles.popover_link} onClick={logoutClick}>
            Logout
          </Typography>
        </Box>
      </Popover>
    </header>
  );
};

export default Header;
