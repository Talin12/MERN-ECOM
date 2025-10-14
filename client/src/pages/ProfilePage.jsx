import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>User Profile</h1>
      <h2>Welcome, {userInfo ? userInfo.name : 'Guest'}!</h2>
      <p>Email: {userInfo ? userInfo.email : 'N/A'}</p>
    </div>
  );
};

export default ProfilePage;