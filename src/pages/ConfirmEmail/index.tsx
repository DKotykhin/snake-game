import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useUserStore } from 'store/userStore';

import styles from './confirmEmail.module.scss';

const ConfirmEmailPage: React.FC = () => {
  const { token } = useParams();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const user = useUserStore((state) => state.userData);

  useEffect(() => {
    if (user.id) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/auth/confirm-email/${token}`,
    })
      .then((res) => {
        setIsConfirmed(res.data?.status);
      })
      .catch((err) => {
        setError(err);
      });
  }, [token]);

  if (isConfirmed) {
    navigate('/sign-in');
  }

  if (error) {
    return (
      <div className={styles.error_message}>
        <h3>Something went wrong</h3>
        <p>Try again later...</p>
      </div>
    );
  }

  return <div className={styles.loading_message}>Loading...</div>;
};

export default ConfirmEmailPage;
