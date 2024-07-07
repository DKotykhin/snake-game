import React from 'react';
import { Link } from 'react-router-dom';
import { Mode, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { Button, Container, Typography, Box, Avatar, Paper } from '@mui/material';

import { EmailField } from 'components/Inputs/_index';
import { emailValidationSchema, EmailTypes } from 'validation/userValidation';

import styles from '../form.module.scss';

interface EmailFormValidationTypes {
  defaultValues: EmailTypes;
  resolver: Resolver<any>;
  mode: Mode;
}

const EmailFormValidation: EmailFormValidationTypes = {
  defaultValues: {
    email: '',
  },
  resolver: zodResolver(emailValidationSchema),
  mode: 'onChange',
};

const ForgotPasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailTypes>(EmailFormValidation);

  const onSubmit: SubmitHandler<EmailTypes> = async (data): Promise<void> => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/reset-password`,
      data,
    })
      .then(() => {
        toast.success('Please, check your email');
      })
      .catch((error) => {
        toast.error(error.response.data?.message || error.message);
      });
  };

  return (
    <Container maxWidth='xs' className={styles.form}>
      <Paper elevation={10} className={styles.form__paper}>
        <Typography className={styles.form__title} component='h2'>
          Forgot Password
        </Typography>
        <Avatar className={styles.form__avatar} />
        <Typography className={styles.form__text}>Enter your email to reset your password</Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} className={styles.form__box}>
          <EmailField label='Email' placeholder='Enter your email' error={errors.email} control={control} />
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

export default ForgotPasswordForm;
