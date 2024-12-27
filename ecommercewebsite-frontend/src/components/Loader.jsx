import React from 'react';
import './Loader.css'; // Import the CSS file for styles

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-header">
        <div className="loader-thumbnail"></div>
        <div className="loader-text">
          <div className="loader-title"></div>
          <div className="loader-subtitle"></div>
        </div>
      </div>
      <div className="loader-content"></div>
    </div>
  );
}

export default Loader;
