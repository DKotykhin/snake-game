import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'store/userStore';
import SignUp from 'components/Forms/SignUp';

const SignUpPage: React.FC = () => {
  const user = useUserStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate('/');
    }
  }, [user, navigate]);

  return <SignUp />;
};

export default SignUpPage;
