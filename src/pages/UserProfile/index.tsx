import React from 'react';

import { useUserStore } from 'store/userStore';
import Profile from 'components/Profile';

const UserProfile: React.FC = () => {
  const user = useUserStore((state) => state.userData);

  if (!user.id) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontSize: '32px' }}>Loading...</div>
    );
  }

  return <Profile user={user} />;
};

export default UserProfile;
