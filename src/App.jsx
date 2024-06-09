// import React, { useState } from "react";
// import  ReactDOM  from "react-dom";
// //css
import './App.css';
// import MyState from './Context/States/State.js';
// // import components
import Navbar from "./components/Navbar.jsx";

import Shop from "./components/Shop.jsx";
import Login from "./components/login.jsx";
import Popular from "./components/Popular.jsx";
import Male from "./components/productALL/male.jsx";
import Female from "./components/productALL/Female.jsx";
import Kids from "./components/productALL/Kids.jsx";
import New_collection from "./components/New_collection.jsx";
import Footer from "./components/Footer.jsx";
// import Footer from './components/Footer.jsx';

import React, { useState } from "react";
import { Suspense } from 'react';
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import MyState from './Context/States/State.js';
import Add_cart from './components/Add_cart.jsx';
// import Cartstate from './Context/Cart_contex/Cart_state.js';
import CartContextprovider from './Context/Cart_contex/CartContextprovider.jsx';
import BuyContextprovider from './Context/Buy_context/BuyContextprovider.jsx';
import Buycontext from './Context/Buy_context/Buy_context.js';
import LoginContextProvider from './Context/Login_context/LoginContextProvider.jsx';
import UploadItem from './components/UploadItem.jsx';
import Loader from './components/Loader.jsx';
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
       
       <UploadItem />
  
</Suspense>
    </>
  );
}

export default App;
