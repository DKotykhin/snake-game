import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mode, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

import { Button, Container, Typography, Box, Avatar, Paper } from '@mui/material';

import { EmailField, PasswordField } from 'components/Inputs/_index';
import { signInValidationSchema, SignInTypes } from 'validation/userValidation';
import { useUserStore } from 'store/userStore';

import styles from '../form.module.scss';

interface SignInFormValidationTypes {
  defaultValues: SignInTypes;
  resolver: Resolver<any>;
  mode: Mode;
}

const SignInFormValidation: SignInFormValidationTypes = {
  defaultValues: {
    email: '',
    password: '',
  },
  resolver: zodResolver(signInValidationSchema),
  mode: 'onChange',
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const addUser = useUserStore((state) => state.addUser);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInTypes>(SignInFormValidation);

  const onSubmit: SubmitHandler<SignInTypes> = async (data): Promise<void> => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/sign-in`,
      data,
    })
      .then((res) => {
        Cookies.set('token', res.data?.auth_token, {
          expires: 2,
        });
        addUser(res.data.user);
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data?.message?.toString() || err.message || 'Something went wrong');
      });
  };

  return (
    <Container maxWidth='xs' className={styles.form}>
      <Paper elevation={10} className={styles.form__paper}>
        <Typography className={styles.form__title} component='h2'>
          Welcome back
        </Typography>
        <Avatar className={styles.form__avatar} />
        <Box component='form' onSubmit={handleSubmit(onSubmit)} className={styles.form__box}>
          <EmailField label='Email' placeholder='Enter your email' error={errors.email} control={control} />
          <PasswordField
            name='password'
            label='Password'
            placeholder='Enter your password'
            error={errors.password}
            control={control}
          />
          <Box className={styles.forgot_password}>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Box>
          <Button className={styles.form__submit_button} disabled={!isValid} type='submit'>
            Submit
          </Button>
        </Box>
      </Paper>
      <Typography className={styles.form__subtitle}>
        Don't have an account? <Link to={'/sign-up'}>Sign Up</Link>
      </Typography>
      <Button className={styles.form__return_button} component={Link} to='/'>
        Main Page
      </Button>
    </Container>
  );
};

export default LoginForm;
