import React from 'react';

import { Box, Link, Tooltip, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Box className={styles.footer_wrapper}>
        <Typography className={styles.footer__text}>
          Copyright &copy; {new Date().getFullYear()} &nbsp; Dmytro Kotykhin
        </Typography>
        <Box className={styles.link_wrapper}>
          <Link href='https://github.com/DKotykhin' target='_blank'>
            <Tooltip title='Github'>
              <GitHubIcon sx={{ color: '#fff' }} />
            </Tooltip>
          </Link>
          <Link href='https://www.linkedin.com/in/dmytro-kotykhin-4683151b' target='_blank'>
            <Tooltip title='LinkedIn'>
              <LinkedInIcon sx={{ color: '#fff' }} />
            </Tooltip>
          </Link>
          <Link href='https://dmytro-kotykhin.pp.ua' target='_blank'>
            <Tooltip title='Portfolio'>
              <LanguageIcon sx={{ color: '#fff' }} />
            </Tooltip>
          </Link>
        </Box>
      </Box>
    </footer>
  );
};
