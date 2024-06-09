import React, { useState,useContext } from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from "react-router-dom";
// import css
import './SignUp.css';
import LoginContext from '../Context/Login_context/LoginContext';

const SignUp = () => {

  const Login_Context = useContext(LoginContext);
 const [Username, setUsername]= useState("");
 const [email, setemail] = useState("");
 const [password, setpassword]= useState("");
 const [cpass,setCpass] = useState("");

  return (
    <div className=' SignUpPage'>
       <div className='SignUp_form'>
       <h2 className=' SignUpText'>SignUp</h2>
       <form action="./action.php">
        <input type="UserName" placeholder='Enter Username' required className='SignUp_Username' onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="email" placeholder='Enter Email' required className='SignUp_email' onChange={(e)=>{setemail(e.target.value)}}/>
        <input type='password' placeholder='Enter Password' required className='SignUp_password'onChange={(e)=>{setpassword(e.target.value)}}/>
        <input type='password' placeholder='Confirm Password' required className='SignUp_Cpassword' onChange={(e)=>{setCpass(e.target.value)}}/>

        <input type="submit" value="Continue" className='SignUp_btn' onclick={()=>{
          if(Username=="") return false;
          if(password.length<8 || password!=cpass) return false;
          Login_Context.changeLogin({"Username":Username,"Email": email,"Password": password});
        }} />
       </form>
       <NavLink to="/login" style={{textDecoration:"none"}}>
       <div className='Login'> Login </div>
       </NavLink>
       <div className='T&C'>
       <input type="checkbox" name="T&C" id='checkBtn' checked/>
       <label htmlFor="checkBtn" className='T&C_label'> I accept all <span>Terms and conditions</span> .</label>
       </div>
       </div>

    </div>
  );
}

export default SignUp;