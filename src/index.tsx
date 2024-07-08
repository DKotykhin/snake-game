import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import HomePage from 'pages/Home';
import GamePage from 'pages/GamePage';
import UserProfile from 'pages/UserProfile';
import SignUpPage from 'pages/SignUpPage';
import SignInPage from 'pages/SignInPage';
import ForgotPasswordPage from 'pages/ForgotPassword';
import SetNewPasswordPage from 'pages/SetNewPasswordPage';
import ConfirmEmailPage from 'pages/ConfirmEmail';
import Layout from './Layout';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00a1b6',
      dark: '#683b39',
    },
    secondary: {
      main: '#333333',
      light: '#808080',
    },
    error: {
      main: '#ff0000',
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'game',
        element: <GamePage />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/confirm-email/:token',
        element: <ConfirmEmailPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/set-new-password/:token',
        element: <SetNewPasswordPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar
      transition={Flip}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
    />
  </React.StrictMode>
);
