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
    const [loading, setLoading] = useState(true);

    // Clear localStorage and reset user context
    const clearLocalStorageAndContext = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    // Fetch and validate current user based on token
    const validateTokenAndFetchUser = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/v1/user/getCurrentUser', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data:', data);
                const savedUser = {
                    _id: data.data._id,
                    cart: data.data.cart,
                    fullName: data.data.fullName,
                    userName: data.data.userName,
                    email: data.data.email,
                    userLocation: data.data.userLocation,
                    
                };
                setUser(savedUser);
            } else {
                console.warn("Failed to validate user. Clearing context.");
                clearLocalStorageAndContext();
            }
        } catch (error) {
            console.error("Error validating token:", error);
            clearLocalStorageAndContext();
        } finally {
            setLoading(false);
        }
    };

    // Run validation on component mount
    useEffect(() => {
        validateTokenAndFetchUser();
    }, []);

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
