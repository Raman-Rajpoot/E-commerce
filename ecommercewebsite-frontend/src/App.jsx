import React, { Suspense, useContext, useEffect, useState } from "react";
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
    const [loading, setLoading] = useState(true);  // State to track loading

    // Function to handle token validation and user fetch
    const validateTokenAndFetchUser = () => {
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
                    // If token is valid, set the user data in context
                    setUser(data.user);
                } else {
                    // Invalid token, clear user data but don't redirect
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);  // Clear user in context
                }
                setLoading(false);  // Set loading to false after validation
            })
            .catch(() => {
                // In case of an error, clear user and token
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);  // Clear user in context
                setLoading(false);  // Stop loading on error
            });
        } else {
            setLoading(false); // No token, stop loading
        }
    };

    useEffect(() => {
        validateTokenAndFetchUser(); // Call the function on component mount
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
                localStorage.removeItem('user'); // Remove invalid data
            }
        }
    }, [user, setUser]);

    // Show loader while the app is verifying the token and loading user data
    if (loading) {
        return <Loader />;
    }

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
};

export default App;
