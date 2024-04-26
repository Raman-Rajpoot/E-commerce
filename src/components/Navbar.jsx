import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from "react-router-dom";
// import css
import './Navbar.css';

// import images
import logo from '../images/logo.png';
import cardIcon from '../images/cart_icon.png';
import menu from '../images/menu-icon.png';
import cross from '../images/cross-icon.png';
import Shop from "./Shop";
import MyContext from "../Context/States/Context.js";

const Navbar = () => {
  const [select, changeSelected] = useState("Shop");
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

  return (
    <div className="Navbar">
      <div className="Navbar_logo">
        <img src={logo} alt="logo" className="logo" />
        <p className="logo_name">Shopper</p>
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
            <NavLink to="/login" className="login" style={{textDecoration:"none"}}>Login</NavLink>
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
