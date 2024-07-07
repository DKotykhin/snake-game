import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignIn from 'components/Forms/SignIn';
import { useUserStore } from 'store/userStore';

const SignInPage: React.FC = () => {
  const user = useUserStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate('/');
    }
  }, [user, navigate]);

  return <SignIn />;
};

export default SignInPage;
