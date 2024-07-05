// import React, { useState } from "react";
// import  ReactDOM  from "react-dom";
// //css
import './App.css';
// import MyState from './Context/States/State.js';
// // import components
import Navbar from "./components/Navbar.jsx";

import Footer from "./components/Footer.jsx";
// import Footer from './components/Footer.jsx';

import React, { Suspense } from "react";
import {
  Outlet
} from "react-router-dom";
import MyState from './Context/States/State.js';
// import Cartstate from './Context/Cart_contex/Cart_state.js';
import Loader from './components/Loader.jsx';
import Profile from './components/Profile.jsx';
import UploadItem from './components/UploadItem.jsx';
import BuyContextprovider from './Context/Buy_context/BuyContextprovider.jsx';
import CartContextprovider from './Context/Cart_contex/CartContextprovider.jsx';
import LoginContextProvider from './Context/Login_context/LoginContextProvider.jsx';
const App = () => {
  
  return (
    <>
    <Suspense fallback={<Loader />}>
  
    <MyState >
    <CartContextprovider>
      <BuyContextprovider>
        <LoginContextProvider>
      <Navbar  />
        <Outlet />     
      <Footer />
      </LoginContextProvider>
      </BuyContextprovider>
        </CartContextprovider>
        </MyState>
       
       {/* <UploadItem /> */}
       {/* <Profile/> */}
       {/* <SearchPage /> */}
</Suspense>
    </>
  );
}

export default App;
