import React, { useState, useContext, useEffect } from 'react';
import EditProfile from './EditProfile';
import './Profile.css';
import LoginContext from '../Context/Login_context/LoginContext';
import { useNavigate } from "react-router-dom";
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import MyContext from '../Context/States/Context';
function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const userInformation = useContext(LoginContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const Cart = useContext(Cartcontext)
  const {counter, changeCounter}= useContext(MyContext)
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullname: '',
    username: '',
    tele: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: ''
  });

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:7000/api/v1/user/getUserInfo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userInformation.token}` // Replace with actual token
          },
          credentials: 'include'
        });
        const result = await response.json();
        if (response.ok) {
          console.log("userdata",result.data)
          const updatedInformation = {
            username: result.data.userName || userInfo.username,  // Default to existing userInfo values if not provided
            email: result.data.email || userInfo.email,
            fullname: result.data.fullName || userInfo.fullname,
            tele: result.data.tele || userInfo.tele,
            address: result.data.userLocation.address || userInfo.address,
            country: result.data.userLocation.country || userInfo.country,
            state: result.data.userLocation.state || userInfo.state,
            city: result.data.userLocation.city || userInfo.city,
            zipCode: result.data.userLocation.zipCode || userInfo.zipCode
          };
          
          setUserInfo(updatedInformation);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userInformation]);

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

  const handleSave = async (updatedUser) => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/user/updateAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userInformation.token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          address: updatedUser.address,
          country: updatedUser.country,
          state: updatedUser.state,
          city: updatedUser.city,
          zipCode: updatedUser.zipCode
        })
      });

      const result = await response.json();
      if (response.ok) {
        setUserInfo(result.data);
        setIsEditing(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:7000/api/v1/user/logOut', {
        method: 'POST',
        credentials: 'include' // Ensure cookies are sent with the request
      });
      if (response.ok) {
        localStorage.clear(); // Clear all data from local storage
        
        if (userInformation?.clearUser) {
          userInformation.clearUser(); // Clear user data from context or state management
        }
        console.log('Logout successful');
        changeCounter(0);
                // Redirect to the home or login page after a short delay
      setTimeout(() => {
        navigate('/'); // Redirect to the home or login page
      }, 10)
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
          {/* <div className="profile-info">
            <label htmlFor="tele">Mobile No.:</label>
            <span id="tele">{userInfo.tele}</span>
          </div> */}
          <div className="profile-info">
            <label htmlFor="email">Email:</label>
            <span id="email">{userInfo.email}</span>
          </div>
          <div className="profile-info">
            <label htmlFor="address">Address:</label>
            <span id="address">
              <p>{userInfo.address}</p>
              <p>{userInfo.city}, {userInfo.state}, {userInfo.country}</p>
              <p>{userInfo.zipCode}</p>
            </span>
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
