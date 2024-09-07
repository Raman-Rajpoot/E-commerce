import React, { Suspense, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MyState from './Context/States/State.js';
import Loader from './components/Loader.jsx';
import BuyContextprovider from './Context/Buy_context/BuyContextprovider.jsx';
import CartContextprovider from './Context/Cart_contex/CartContextprovider.jsx';
import LoginContext from './Context/Login_context/LoginContext.js';

const App = () => {
    const { user, setUser } = useContext(LoginContext);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:7000/api/v1/user/getCurrentUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    // Re-establish session on backend
                    // Set user context or any other state
                } else {
                    // Invalid token, clear localStorage
                    localStorage.removeItem('token');
                    // Redirect to login or other action
                }
            })
            .catch(() => {
                // Handle error, e.g., clear token and redirect to login
                localStorage.removeItem('token');
            });
        }
    }, []);
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && !user) {
                    setUser(parsedUser);
                    console.log("User loaded from localStorage:", parsedUser);
                }
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem('user'); // Optionally remove the invalid item from storage
            }
        }
    }, [user, setUser]);

    return (
        <Suspense fallback={<Loader />}>
            <MyState>
                <CartContextprovider>
                    <BuyContextprovider>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </BuyContextprovider>
                </CartContextprovider>
            </MyState>
        </Suspense>
    );
}

export default App;
