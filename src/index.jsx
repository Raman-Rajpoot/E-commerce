import React, { StrictMode , useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Popular from "./components/Popular.jsx";
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
// import {useContext} from ""
import {MyState} from './Context/States/State.js';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout';
import Female from './components/productALL/Female.jsx';
import Male from './components/productALL/male.jsx';
import Add_cart from './components/Add_cart.jsx';
import Kids from './components/productALL/Kids.jsx';

// import Popular from './components/Popular.jsx';
import Login from './components/login.jsx';
import Navbar from './components/Navbar.jsx';
import Shop from './components/Shop.jsx';
import ProductBuy from './components/ProductBuy.jsx';
const router = createBrowserRouter(createRoutesFromElements(
       <Route path="/"  element={<App/> }>
         {/* <Route path='' element={<Shop/>} /> */}
         <Route path='' element={<Popular/>}/>
          <Route  path="male"  element={<Male />}/>
          <Route  path="female"  element={<Female />}/>
          <Route  path="kids"  element={<Kids />}/>
          <Route  path="login"  element={<Login />}/>
          <Route  path="cart"  element={<Add_cart />}/>
          <Route  path="product" element={<ProductBuy/>} />
       </Route>
      
));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
     {/* <App /> */}
       <RouterProvider router={router}/>
       </> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
