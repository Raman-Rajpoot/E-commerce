import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // State for general error messages
  const [success, setSuccess] = useState(""); // State for success message
  const [termsAccepted, setTermsAccepted] = useState(false); // State for Terms & Conditions checkbox
  const [fieldError, setFieldError] = useState({
    username: "",
    email: "",
    password: "",
    cpass: "",
    terms: "",
  }); // State to store error messages for individual fields
  const navigate = useNavigate(); // Hook to navigate programmatically

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // Username validation using useEffect
  useEffect(() => {
    if (username) {
      if (!usernamePattern.test(username)) {
        setFieldError((prev) => ({
          ...prev,
          username: "Username must be 3-16 characters long and can only contain letters, numbers, underscores, and dots.",
        }));
      } else {
        setFieldError((prev) => ({ ...prev, username: "" }));
      }
    }
  }, [username]); // Dependency on the username field

  // Email validation using useEffect
  useEffect(() => {
    if (email) {
      if (!emailPattern.test(email)) {
        setFieldError((prev) => ({
          ...prev,
          email: "Invalid email format.",
        }));
      } else {
        setFieldError((prev) => ({ ...prev, email: "" }));
      }
    }
  }, [email]); // Dependency on the email field

  // Password validation using useEffect
  useEffect(() => {
    if (password) {
      if (!passwordPattern.test(password)) {
        setFieldError((prev) => ({
          ...prev,
          password: "Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }));
      } else {
        setFieldError((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [password]); // Dependency on the password field

  // Confirm Password validation using useEffect
  useEffect(() => {
    if (cpass) {
      if (cpass !== password) {
        setFieldError((prev) => ({
          ...prev,
          cpass: "Passwords do not match.",
        }));
      } else {
        setFieldError((prev) => ({ ...prev, cpass: "" }));
      }
    }
  }, [cpass, password]); // Dependency on both cpass and password fields

  const SignUpHandler = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      setFieldError((prev) => ({
        ...prev,
        terms: "You must accept the terms and conditions.",
        
      }));
      return ;
    } else {
      setFieldError((prev) => ({ ...prev, terms: "" }));
    }
    const isValid = Object.values(fieldError).every((err) => err === "");
    if (!isValid) {
      setError("Please fix the errors before submitting.");
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
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setError(""); // Clear error after successful registration
        setSuccess("User registered successfully!");
        setTimeout(() => {
          navigate("/login"); // Navigate to login page after a short delay
        }, 2000); // Delay of 2 seconds before navigating to login
        console.log("User registered:", data);
      }
       else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to register user.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  const handleFieldChange = (field, value) => {
    // Update the respective field value
    switch (field) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "cpass":
        setCpass(value);
        break;
      case "name":
        setName(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            onChange={(e) => handleFieldChange("username", e.target.value)} 
          />
          {fieldError.username && (
            <p className='error-message'>{fieldError.username}</p>
          )}

          <input 
            type="email" 
            placeholder='Enter Email' 
            required 
            className='SignUp_email' 
            value={email}
            onChange={(e) => handleFieldChange("email", e.target.value)} 
          />
          {fieldError.email && (
            <p className='error-message'>{fieldError.email}</p>
          )}

          <input 
            type='text' 
            placeholder='Full Name' 
            required 
            className='SignUp_Cpassword' 
            value={name}
            onChange={(e) => handleFieldChange("name", e.target.value)} 
          />

          <input 
            type='password' 
            placeholder='Enter Password' 
            required 
            className='SignUp_password' 
            value={password}
            onChange={(e) => handleFieldChange("password", e.target.value)} 
          />
          {fieldError.password && (
            <p className='error-message'>{fieldError.password}</p>
          )}

          <input 
            type='password' 
            placeholder='Confirm Password' 
            required 
            className='SignUp_Cpassword' 
            value={cpass}
            onChange={(e) => handleFieldChange("cpass", e.target.value)} 
          />
          {fieldError.cpass && (
            <p className='error-message'>{fieldError.cpass}</p>
          )}

          <div className='T&C'>
            <input 
              type="checkbox" 
              name="T&C" 
              id='checkBtn' 
              required 
              checked={termsAccepted}
              onChange={() => {
                setTermsAccepted(!termsAccepted);
              }}
            />
            <label htmlFor="checkBtn" className='T&C_label'> 
              I accept all <span>Terms and conditions</span>.
            </label>
          </div>
          {fieldError.terms && (
            <p className='error-message'>{fieldError.terms}</p>
          )}

          <input 
            type="submit" 
            value="Continue" 
            className='SignUp_btn' 
          />
          {error && <p className='error-message'>{error}</p>} {/* Display error message */}
          {success && <p className='success-message'>{success}</p>} {/* Display success message */}
        </form>
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <div className='Login'>Login</div>
        </NavLink>
      </div>
    </div>
  );
}

export default SignUp;
