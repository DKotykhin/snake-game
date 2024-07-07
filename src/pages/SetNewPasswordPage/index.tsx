import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'store/userStore';

import SetNewPasswordForm from 'components/Forms/SetNewPassword';

const SetNewPasswordPage: React.FC = () => {
  const { token } = useParams();
  const user = useUserStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      navigate('/');
    }
  }, [user, navigate]);

  return <SetNewPasswordForm token={token} />;
};

export default SetNewPasswordPage;
