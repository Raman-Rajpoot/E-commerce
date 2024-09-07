import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './login.css';
import LoginContext from '../Context/Login_context/LoginContext';
import Cartcontext from '../Context/Cart_contex/Cart_contex';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(LoginContext);
    const { addCartItem } = useContext(Cartcontext);

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:7000/api/v1/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data?.user) setUser(data.user);
                if (data?.cart) addCartItem(data.cart);
                setUser(data.data.user);
                console.log('Logged in successfully:', data.data.user);
                navigate('/'); // Redirect to home after login
            } else {
                const errorMessage = await response.text();
                console.error('Login failed:', errorMessage);
                // Optionally, show an error message to the user
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Optionally, show an error message to the user
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className='loginPage'>
            <div className='login_form'>
                <h2 className='loginText'>Login</h2>
                <form onSubmit={loginHandler}>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        required
                        className='login_email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Enter Password'
                        required
                        className='login_password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className='login_btn' disabled={loading}>
                        {loading ? "Loading..." : "Continue"}
                    </button>
                </form>
                <NavLink to="/signUp" style={{ textDecoration: "none" }}>
                    <div className='signUp'>Sign Up</div>
                </NavLink>
                <div className='T&C'>
                    <input type="checkbox" name="T&C" id='checkBtn' defaultChecked />
                    <label htmlFor="checkBtn" className='T&C_label'>
                        I accept all <span>Terms and conditions</span>.
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Login;
