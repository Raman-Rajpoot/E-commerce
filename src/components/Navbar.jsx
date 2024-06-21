import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
// import css
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
// import images
import cardIcon from '../images/cart_icon.png';
import cross from '../images/cross-icon.png';
import logo from '../images/logo.png';
import menu from '../images/menu-icon.png';
import UserImg from '../images/user.png';
// import User from "./User.jsx";
import LoginContext from "../Context/Login_context/LoginContext.js";
import MyContext from "../Context/States/Context.js";



const Navbar = () => {
 const Login_Context = useContext(LoginContext)


 const [searchQuery, setSearchQuery] = useState('');
 const [searchHistory, setSearchHistory] = useState(['example1', 'example2', 'example3']);
 const [suggestions, setSuggestions] = useState(['suggestion1', 'suggestion2', 'suggestion3']);

 const handleSearchChange = (e) => {
   setSearchQuery(e.target.value);
   
   // Optionally update suggestions here based on the searchQuery
 };

 const handleSearchSubmit = (e) => {
   e.preventDefault();
   if (searchQuery) {
     setSearchHistory([searchQuery, ...searchHistory]);
   }
   setSearchQuery('');
 };
 const handleKeyDown = (e) => {
  if (e.keyCode === 13) { // Check if Enter key is pressed
    if (searchQuery) {
      setSearchHistory([searchQuery, ...searchHistory]);
    }
    setSearchQuery('');
  }
};

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
         {!(windowWidth < 1100)  ? <div className="search-icon-container">
          <div className="search-icon-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            onKeyDown={handleKeyDown}
            
          />
     
          <button className="search-button" onClick={handleSearchSubmit} >
          <FontAwesomeIcon icon={faSearch} />
          </button>
        
          </div>
        </div> : ""}
          <div className="Navbar_login">

          {user?._id?  <NavLink to="/profile" style={{textDecoration:"none"}}  className="Profile">{windowWidth < 1100 ? <div> User</div>: <img src={UserImg} alt="User" className="ProfileImg"/>} </NavLink>: <NavLink to="/login" className="login" style={{textDecoration:"none"}}>Login</NavLink> }
            
            
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
        {windowWidth < 1100 ? <div className="search-icon-container">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
         <FontAwesomeIcon icon={faSearch} />
        </div>: ""}
      {/* </Router> */}
      <div className="search-history">
        
               <ul>
                   {searchHistory.map((historyItem, index) => (
                     <li key={index}>{historyItem}</li>
                   ))}
                </ul>
       </div>
    </div>
  );
}

export default Navbar;
