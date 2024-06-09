import './User.css'
import React from 'react';

const ProfilePage = ({ username, email, address }) => {
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <label htmlFor="username">Username:</label>
                <span id="username">{username}</span>
            </div>
            <div className="profile-info">
                <label htmlFor="email">Email:</label>
                <span id="email">{email}</span>
            </div>
            <div className="profile-info">
                <label htmlFor="address">Address:</label>
                <span id="address">{address}</span>
            </div>
        </div>
    );
};

export default ProfilePage;
