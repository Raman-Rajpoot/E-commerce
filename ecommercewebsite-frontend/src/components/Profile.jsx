import React, { useState, useContext, useEffect } from 'react';
import EditProfile from './EditProfile';
import './Profile.css';
import LoginContext from '../Context/Login_context/LoginContext';
import { NavLink, useNavigate } from "react-router-dom";
function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const userInformation = useContext(LoginContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullname: '',
    username: '',
    tele: '',
    address: '',
  });

  useEffect(() => {
    const userDetails = {
      email: userInformation?.user?.email || '',
      fullname: userInformation?.user?.fullName || '',
      username: userInformation?.user?.userName || '',
      tele: userInformation?.user?.tele || '',
      address: userInformation?.user?.address || '',
    };
    setUserInfo(userDetails);
  }, [userInformation]); // Add userInformation as a dependency

  // Track window width to handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser) => {
    setUserInfo(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (userInformation?.clearUser) {
      userInformation.clearUser(); // Clear user data
    }
    navigate('/');
  };

  return (
    <div className="page">
      {!isEditing ? (
        <div className="profile-container">
          <h1>User Profile</h1>
          <div className="profile-info">
            <label htmlFor="username">Username:</label>
            <span id="username">{userInfo.username}</span>
          </div>
          <div className="profile-info">
            <label htmlFor="fullname">FullName:</label>
            <span id="fullname">{userInfo.fullname}</span>
          </div>
          <div className="profile-info">
            <label htmlFor="tele">Mobile No.:</label>
            <span id="tele">{userInfo.tele}</span>
          </div>
          <div className="profile-info">
            <label htmlFor="email">Email:</label>
            <span id="email">{userInfo.email}</span>
          </div>
          <div className="profile-info">
            <label htmlFor="address">Address:</label>
            <span id="address">{userInfo.address}</span>
          </div>
          <button onClick={handleEditClick} className="editbtn">
            Edit Profile
          </button>

          {windowWidth > 1100 && (
            <button onClick={handleLogout} className="logoutbtn">
              LogOut
            </button>
          )}
        </div>
      ) : (
        <EditProfile user={userInfo} onSave={handleSave} />
      )}
    </div>
  );
}

export default Profile;
