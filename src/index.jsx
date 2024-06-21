import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Popular from "./components/Popular.jsx";
import './index.css';
// import {useContext} from ""
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Add_cart from './components/Add_cart.jsx';
import Female from './components/productALL/Female.jsx';
import Kids from './components/productALL/Kids.jsx';
import Male from './components/productALL/male.jsx';

// import Popular from './components/Popular.jsx';
import Login from './components/login.jsx';
// import User from './components/User.jsx';
import ProductBuy from './components/ProductBuy.jsx';
import Profile from './components/Profile.jsx';
import SignUp from './components/SignUp.jsx';
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
          <Route path="profile" element= {<Profile/>} />
          <Route path="signUp" element={<SignUp />}/>
          
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
