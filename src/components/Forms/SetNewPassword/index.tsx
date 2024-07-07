import React from 'react';
import { Link } from 'react-router-dom';
import { Mode, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Container, Typography, Box, Avatar, Paper } from '@mui/material';

import { PasswordField } from 'components/Inputs/_index';
import { setNewPasswordValidationSchema, SetNewPasswordTypes } from 'validation/userValidation';

import styles from '../form.module.scss';

interface SetNewPasswordFormValidationTypes {
  defaultValues: SetNewPasswordTypes;
  resolver: Resolver<any>;
  mode: Mode;
}

const EmailFormValidation: SetNewPasswordFormValidationTypes = {
  defaultValues: {
    password: '',
    confirmPassword: '',
  },
  resolver: zodResolver(setNewPasswordValidationSchema),
  mode: 'onChange',
};

const SetNewPasswordForm: React.FC<{ token?: string }> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SetNewPasswordTypes>(EmailFormValidation);

  const onSubmit: SubmitHandler<SetNewPasswordTypes> = async (data): Promise<void> => {
    console.log(data);
  };

  return (
    <Container maxWidth='xs' className={styles.form}>
      <Paper elevation={10} className={styles.form__paper}>
        <Typography className={styles.form__title} component='h2'>
          Set New Password
        </Typography>
        <Avatar className={styles.form__avatar} />
        <Box component='form' onSubmit={handleSubmit(onSubmit)} className={styles.form__box}>
          <PasswordField
            name='password'
            label='New Password'
            placeholder='Enter your password'
            error={errors.password}
            control={control}
          />
          <PasswordField
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Confirm your password'
            error={errors.confirmPassword}
            control={control}
          />
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

export default SetNewPasswordForm;
