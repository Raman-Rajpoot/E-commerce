import React from 'react';

// import css
import './login.css';

const login = () => {
  return (
    <div className=' loginPage'>
       <div className='login_form'>
       <h2 className=' loginText'>Login</h2>
       <form action="./action.php">
        <input type="email" placeholder='Enter Email' required className='login_email'/>
        <input type='password' placeholder='Enter Password' required className='login_password'/>
        <input type="submit" value="Continue" className='login_btn' />
       </form>
       <div className='signUp'> Sign Up </div>
       <div className='T&C'>
       <input type="checkbox" name="T&C" id='checkBtn' />
       <label htmlFor="checkBtn" className='T&C_label'> I accept all <span>Terms and conditions</span> .</label>
       </div>
       </div>

    </div>
  );
}

export default login;