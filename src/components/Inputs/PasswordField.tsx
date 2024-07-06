import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { Box, InputLabel, InputAdornment, IconButton, FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from './field.module.scss';
interface IPasswordField {
  label: string;
  name: string;
  placeholder: string;
  error?: FieldError;
  control: Control<any>;
}

const PasswordField: React.FC<IPasswordField> = ({ label, name, placeholder, error, control }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <Box className={styles.field}>
      <InputLabel>{label}</InputLabel>
      <FormControl className={styles.field__control}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              placeholder={placeholder}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              error={error ? true : false}
            />
          )}
        />
        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export { PasswordField };
