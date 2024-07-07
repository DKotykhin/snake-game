import { z } from 'zod';

import { email, password, textFieldRequired } from './_fields';

export const signUpValidationSchema = z.object({
  userName: textFieldRequired,
  email,
  password,
});
export type SignUpTypes = z.infer<typeof signUpValidationSchema>;

export const signInValidationSchema = z.object({
  email,
  password,
});
export type SignInTypes = z.infer<typeof signInValidationSchema>;

export const emailValidationSchema = z.object({
  email,
});
export type EmailTypes = z.infer<typeof emailValidationSchema>;

export const userNameValidationSchema = z.object({
  userName: textFieldRequired,
});

export const passwordValidationSchema = z.object({
  password,
});

export const changePasswordValidationSchema = z
  .object({
    password,
    newPassword: password,
  })
  .refine((data) => data.password !== data.newPassword, {
    path: ['newPassword'],
    message: 'The same password',
  });
export type ChangePasswordTypes = z.infer<typeof changePasswordValidationSchema>;

export const setNewPasswordValidationSchema = z
  .object({
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });
export type SetNewPasswordTypes = z.infer<typeof setNewPasswordValidationSchema>;
