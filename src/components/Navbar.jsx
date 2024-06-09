import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink, Link, Switch, useLocation } from "react-router-dom";
// import css
import './Navbar.css';

// import images
import logo from '../images/logo.png';
import cardIcon from '../images/cart_icon.png';
import UserImg from '../images/user.png'
import menu from '../images/menu-icon.png';
import cross from '../images/cross-icon.png';
import Shop from "./Shop";
import User from "./User.jsx";
import MyContext from "../Context/States/Context.js";
import LoginContext from "../Context/Login_context/LoginContext.js";

const Navbar = () => {
 const Login_Context = useContext(LoginContext)


// use for good navbar ui 
  const location = useLocation();
 let path ="Shop";
 if(location.pathname!='/')
        path = location?.pathname?.slice(1)[0]?.toUpperCase()+ location?.pathname?.slice(2)?.toLowerCase() ;

//  if(!path) path="Shop";

//  alert(path)
  const [select, changeSelected] = useState(path);
  const Cart = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

const user= {};

  return (
    <div className="Navbar">
      <div className="Navbar_logo">
      <Link to='' onClick={() => { changeSelected("Shop") }} className={select === "Shop" ? "selected" : ""} style={{textDecoration:"none"}}>
        <img src={logo} alt="logo" className="logo" />
        <p className="logo_name">Shopper</p>
      </Link>
       
      </div>
      {/* <Router> */}
        <div className="menu-icon"onClick={() => setMenuOpen(!menuOpen)}>
          <img src={menuOpen ?cross:menu} alt="menu" />
        </div>
        <div className={menuOpen ? "Nav-cnt vis" : "Nav-cnt"}>
          <div className="Navbar_Menu">
            <Link to='' onClick={() => { changeSelected("Shop") }} className={select === "Shop" ? "selected" : ""} style={{textDecoration:"none"}}>Shop</Link>
            <Link to={`male`} onClick={() => { changeSelected("Male") }} className={select === "Male" ? "selected" : "" } style={{textDecoration:"none"}}>Male</Link>
            <Link to='female' onClick={() => { changeSelected("Female") }} className={select === "Female" ? "selected" : ""} style={{textDecoration:"none"}}>Female</Link>
            <Link to="kids" onClick={() => { changeSelected("Kids") }} className={select === "Kids" ? "selected" : ""} style={{textDecoration:"none"}}>Kids</Link>
          </div>
          <div className="Navbar_login">

          {user?._id ?
          <>
             <img src={UserImg} alt="user" className="user"/>
             {/* <Link to=></Link> */}

          </> :
           <NavLink to="/login" className="login" style={{textDecoration:"none"}}>Login</NavLink>  }
            
            
            {windowWidth < 1100 ? (
              <NavLink to="/cart" className="cart" style={{textDecoration:"none"}}>Cart</NavLink>
            ) : (
              <NavLink to="/cart" className="cart">
                <img src={cardIcon} alt="cardIcon" className="card" />
                <div className="card_count">{Cart.counter}</div>
              </NavLink>
            )}
          </div>
        </div>
      {/* </Router> */}
    </div>
  );
}

export default Navbar;
