import React, { useState } from 'react';
import './EditeProfile.css';
function EditProfile({ user, onSave }) {
  const [formState, setFormState] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <form className="edit-profile" onSubmit={handleSubmit}>
         <label>
         userame:
        <input type="text" name="username" value={formState.username} onChange={handleChange} />
      </label>
      <label>
        Full Name:
        <input type="text" name="fullname" value={formState.fullname} onChange={handleChange} />
      </label>
      {/* <label>
        Email:
        <input type="text" name="email" value={formState.email} onChange={handleChange} />
      </label> */}
      <label>
        Address:
        <input type="text" name="address" value={formState.address} onChange={handleChange} />
      </label>
      <label>
        Telephone:
        <input type="text" name="tele" value={formState.tele} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditProfile;
