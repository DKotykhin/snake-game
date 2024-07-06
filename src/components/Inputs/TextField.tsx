import { Control, Controller, FieldError } from 'react-hook-form';

import { Box, InputLabel, FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import styles from './field.module.scss';

interface ITextField {
  label: string;
  placeholder: string;
  error?: FieldError;
  control: Control<any>;
}

const TextField: React.FC<ITextField> = ({ label, placeholder, error, control }) => {
  return (
    <Box className={styles.field}>
      <InputLabel>{label}</InputLabel>
      <FormControl className={styles.field__control}>
        <Controller
          name='userName'
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              type='text'
              placeholder={placeholder}
              autoComplete='name'
              error={error ? true : false}
            />
          )}
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export { TextField };
