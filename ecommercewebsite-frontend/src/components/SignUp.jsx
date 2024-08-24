import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const SignUpHandler = async (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    // Validate email, username, and password
    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!usernamePattern.test(username)) {
      setError("Username must be 3-16 characters long and can only contain letters, numbers, underscores, and dots.");
      return;
    }

    if (!passwordPattern.test(password)) {
      setError("Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (password !== cpass) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      email,
      password,
      userName: username,
      fullName: name,
    };

    try {
      const response = await fetch('http://localhost:7000/api/v1/user/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("User registered successfully!");
        setError(""); // Clear error after successful registration
        // Redirect or perform any action after successful registration
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register user");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Error during registration : ",error);
    }
  };

  return (
    <div className='SignUpPage'>
      <div className='SignUp_form'>
        <h2 className='SignUpText'>SignUp</h2>
        <form onSubmit={SignUpHandler}>
          <input 
            type="text" 
            placeholder='Enter Username' 
            required 
            className='SignUp_Username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder='Enter Email' 
            required 
            className='SignUp_email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type='text' 
            placeholder='Full Name' 
            required 
            className='SignUp_Cpassword' 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type='password' 
            placeholder='Enter Password' 
            required 
            className='SignUp_password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input 
            type='password' 
            placeholder='Confirm Password' 
            required 
            className='SignUp_Cpassword' 
            value={cpass}
            onChange={(e) => setCpass(e.target.value)} 
          />
          <input 
            type="submit" 
            value="Continue" 
            className='SignUp_btn' 
          />
          {error && <p className='error-message'>{error}</p>} {/* Display error message */}
        </form>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <div className='Login'>Login</div>
        </NavLink>
        <div className='T&C'>
          <input 
            type="checkbox" 
            name="T&C" 
            id='checkBtn' 
            required 
          />
          <label htmlFor="checkBtn" className='T&C_label'> 
            I accept all <span>Terms and conditions</span>.
          </label>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
