import React from 'react';
import './Alert.css'; // Add styling for alert

function Alert({ exist }) {
  return (
    <div
      className={`alert-container ${exist ? 'alert-error' : 'alert-success'}`}
    >
      <div className="alert-inner">
        {exist ? 'Item already added!' : 'Item added successfully!'}
      </div>
    </div>
  );
}

export default Alert;
