import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'store/userStore';
import ForgotPasswordForm from 'components/Forms/ForgotPassword';

const ForgotPasswordPage: React.FC = () => {
  const user = useUserStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate('/');
    }
  }, [user, navigate]);

  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
