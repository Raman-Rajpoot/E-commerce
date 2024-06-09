import React from 'react';
import './UploadItem.css'; // Import the CSS file

function UploadItem() {
  return (
    <div className="upload-container">
            <h2>Upload Item</h2>

      <form action="action.php" className="upload-form">
        <label htmlFor="item-name" className="form-label">Enter Name of Item: </label>
        <input type="text" name="item-name" id="item-name" className="form-input" />

        <label htmlFor="price" className="form-label">Enter Price: </label>
        <input type="number" name="price" id="price" className="form-input" />
       
        <label htmlFor="description" className="form-label">Enter Item Description: </label>
        {/* <input type="textarea" name="description" id="description" className="form-input" row='5'/> */}
         <textarea name="decription" id="decription"  className="form-input" rows= '4'></textarea>

        <label htmlFor="image" className="form-label">Upload Image of Item: </label>
        <input type="file" name="image" id="image" className="form-input" />

        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </div>
  );
}

export default UploadItem;
