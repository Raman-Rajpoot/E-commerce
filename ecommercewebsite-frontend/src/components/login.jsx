import React from 'react';
import { NavLink } from "react-router-dom";
// import css
import './login.css';

const login = () => {
  return (
    <div className=' loginPage'>
       <div className='login_form'>
       <h2 className=' loginText'>Login</h2>
       <form action="./action.php">
        <input type="email" placeholder='Enter Email / username' required className='login_email'/>
        <input type='password' placeholder='Enter Password' required className='login_password'/>
        <input type="submit" value="Continue" className='login_btn' />
       </form>
       <NavLink to="/signUp" style={{textDecoration:"none"}}>
            <div className='signUp'> Sign Up </div>
       </NavLink>
       <div className='T&C'>
       <input type="checkbox" name="T&C" id='checkBtn' checked/>
       <label htmlFor="checkBtn" className='T&C_label'> I accept all <span>Terms and conditions</span> .</label>
       </div>
       </div>

    </div>
  );
}

export default login;