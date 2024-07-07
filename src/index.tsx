import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Home';
import GamePage from './pages/GamePage';
import UserProfile from './pages/UserProfile';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Layout from './Layout';
import ForgotPasswordPage from 'pages/ForgotPassword';
import SetNewPasswordPage from 'pages/SetNewPasswordPage';

import './index.scss';

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
