import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'store/userStore';

const UserProfile: React.FC = () => {
  const user = useUserStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate('/');
    }
  }, [user, navigate]);

  return <div>UserProfile</div>;
};

export default UserProfile;
