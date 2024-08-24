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
import LoginContextProvider from './Context/Login_context/LoginContextProvider.jsx';

const App = () => {
    const { user, setUser } = useContext(LoginContext);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && !user) { // Only set user if it's not already set
            setUser(JSON.parse(storedUser));
            
        }
        console.log("User loaded from localStorage:", user);
    }, [user, setUser]); // Depend on 'user' and 'setUser' to avoid unnecessary re-renders

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
