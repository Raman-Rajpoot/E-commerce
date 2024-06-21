import React, { useState } from 'react';
import EditProfile from './EditProfile';
import './Profile.css'
function Profile(user) {
  const [isEditing, setIsEditing] = useState(false);


  const [userInfo, setUserInfo] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser) => {
    setUserInfo(updatedUser);
    setIsEditing(false);
  };

  return (
    <>

      {!isEditing ? (
        <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-info">
            <label htmlFor="username">Username:</label>
            <span id="username">{userInfo?.username}</span>
        </div>
        <div className="profile-info">
            <label htmlFor="fullname">FullName:</label>
            <span id="fullname">{userInfo?.fullname}</span>
        </div>
        <div className="profile-info">
            <label htmlFor="tele">Mobile No.:</label>
            <span id="tele">{userInfo?.tele}</span>
        </div>
        <div className="profile-info">
            <label htmlFor="email">Email:</label>
            <span id="email">{userInfo?.email}</span>
        </div>
        <div className="profile-info">
            <label htmlFor="address">Address:</label>
            <span id="address">{userInfo?.address}</span>
        </div>
        <button onClick={handleEditClick} className='editbtn'>Edit Profile</button>
    </div>
      ) : (
        <EditProfile user={userInfo} onSave={handleSave} />
      )}
    </>
  );
}

export default Profile;
