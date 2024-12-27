import React, { useState, useEffect } from 'react';
import './EditeProfile.css';
function EditProfile({ user, onSave }) {
  const [formState, setFormState] = useState({

    address: user.address || '',
    country: user.country || '',
    state: user.state || '',
    city: user.city || '',
    zipCode: user.zipCode || ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <form className="edit-profile" onSubmit={handleSubmit}>
         <label>
         userame:
        <input type="text" name="username" readOnly value={user.username} onChange={handleChange} />
      </label>
      <label>
        Full Name:
        <input type="text" name="fullname" readOnly value={user.fullname} onChange={handleChange} />
      {/* </label>
       <label>
        Email:
        <input type="text" name="email" value={formState.email} onChange={handleChange} />
      </label> 
      <label> */}
        Address:
        <input type="text" name="address" value={formState.address} onChange={handleChange} />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={formState.country} onChange={handleChange} />
      </label>
      <label>
        State:
        <input type="text" name="state" value={formState.state} onChange={handleChange} />
      </label>
      <label>
        City:
        <input type="text" name="city" value={formState.city} onChange={handleChange} />
      </label>
      <label>
        Zip Code:
        <input type="text" name="zipCode" value={formState.zipCode} onChange={handleChange} />
      </label>
      {/* <label>
        Telephone:
        <input type="text" name="tele" value={formState.tele} onChange={handleChange} />
      </label> */}
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfile;
