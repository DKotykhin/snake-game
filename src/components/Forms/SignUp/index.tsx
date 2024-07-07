import React from 'react';
import { Link } from 'react-router-dom';
import { Mode, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Button, Container, Typography, Box, Avatar, Paper } from '@mui/material';

import { EmailField, PasswordField, TextField } from 'components/Inputs/_index';
import { signUpValidationSchema, SignUpTypes } from 'validation/userValidation';

import styles from '../form.module.scss';

interface SignUpFormValidationTypes {
  defaultValues: SignUpTypes;
  resolver: Resolver<any>;
  mode: Mode;
}

const SignUpFormValidation: SignUpFormValidationTypes = {
  defaultValues: {
    userName: '',
    email: '',
    password: '',
  },
  resolver: zodResolver(signUpValidationSchema),
  mode: 'onChange',
};

const SignUpForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpTypes>(SignUpFormValidation);

  const onSubmit: SubmitHandler<SignUpTypes> = async (data): Promise<void> => {
    console.log(data);
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/sign-up`,
      data,
    })
      .then((res) => {
        toast.success('Check your email to confirm registration');
      })
      .catch((err) => {
        toast.error(err.response.data?.message?.toString() || err.message || 'Something went wrong');
      });
  };

  return (
    <Container maxWidth='xs' className={styles.form}>
      <Paper elevation={10} className={styles.form__paper}>
        <Typography className={styles.form__title} component='h2'>
          Registration
        </Typography>
        <Avatar className={styles.form__avatar} />
        <Box component='form' onSubmit={handleSubmit(onSubmit)} className={styles.form__box}>
          <TextField label='userName' placeholder='Enter your name' error={errors.userName} control={control} />
          <EmailField label='Email' placeholder='Enter your email' error={errors.email} control={control} />
          <PasswordField
            name='password'
            label='Password'
            placeholder='Enter your password'
            error={errors.password}
            control={control}
          />
          <Button className={styles.form__submit_button} disabled={!isValid} type='submit'>
            Submit
          </Button>
        </Box>
      </Paper>
      <Typography className={styles.form__subtitle}>
        Already have an account? <Link to={'/sign-in'}>Sign In</Link>
      </Typography>
      <Button className={styles.form__return_button} component={Link} to='/'>
        Main Page
      </Button>
    </Container>
  );
};

export default SignUpForm;
