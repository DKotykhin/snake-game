import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { Box, OutlinedInput, InputLabel, FormControl, FormHelperText } from '@mui/material';

import styles from './field.module.scss';

interface IEmailField {
  label: string;
  placeholder: string;
  error?: FieldError;
  control: Control<any>;
}

const EmailField: React.FC<IEmailField> = ({ label, placeholder, error, control }) => {
  return (
    <Box className={styles.field}>
      <InputLabel>{label}</InputLabel>
      <FormControl>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              type='email'
              placeholder={placeholder}
              autoComplete='email'
              error={error ? true : false}
            />
          )}
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export { EmailField };
