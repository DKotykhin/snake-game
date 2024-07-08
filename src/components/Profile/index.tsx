import React from 'react';
import { Link } from 'react-router-dom';

import { useRecordsStore } from 'store/recordsStore';
import { User } from 'types/User';

import styles from './profile.module.scss';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const records = useRecordsStore((state) => state.recordsData);

  return (
    <section className={styles.profile_wrapper}>
      <div className={styles.profile_box}>
        <h1>User Profile</h1>
        <h2>{user.userName}</h2>
        <p>email: {user.email}</p>
        <h2>Records</h2>
        {records.length > 0 ? (
          records.map((record) => (
            <div key={record.id} className={styles.record_box}>
              <p>
                Level <span>{record.level}</span>
              </p>
              <p>
                Score: <span>{record.score}</span>
              </p>
              <p>
                Created at: <span>{record.createdAt.toLocaleString().split('T')[0]}</span>
              </p>
            </div>
          ))
        ) : (
          <p>No records yet</p>
        )}
        <div className={styles.link_box}>
          <Link to='/game'>Back to the Game</Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
