import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import cardIcon from '../images/cart_icon.png';
import cross from '../images/cross-icon.png';
import logo from '../images/logo.png';
import menu from '../images/menu-icon.png';
import LoginContext from "../Context/Login_context/LoginContext.js";
import MyContext from "../Context/States/Context.js";
import Cartcontext from "../Context/Cart_contex/Cart_contex.js";

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const Navbar = () => {
  const userInfo = useContext(LoginContext);
  const Cart = useContext(MyContext);
  const { user, setUser } = useContext(LoginContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(['example1', 'example2', 'example3']);
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (userInfo?.user) {

      // console.log("User Info after login:", userInfo.user);
    }
  }, [userInfo]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const location = useLocation();
  const path = useMemo(() => {
    if (location.pathname === '/') return "Shop";
    const formattedPath = location?.pathname?.slice(1);
    return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1).toLowerCase();
  }, [location.pathname]); // Ensure dependencies are correct

  const [select, changeSelected] = useState(path);



  const handleLogout = async () => {
    try {
      const response = await fetch('https://ecommerce-backend-j9hr.onrender.com/api/v1/user/logOut', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        localStorage.clear();
        setUser(null)
        changeCounter(0);
        navigate('/')

      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const handleMenuClick = (selectedPath) => {
    changeSelected(selectedPath);
    setMenuOpen(false);
  };

  const { cartitem, addCartItem } = useContext(Cartcontext);
  const [loading, setLoading] = useState(false);
  const { counter, changeCounter } = useContext(MyContext);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ecommerce-backend-j9hr.onrender.com/api/v1/user/getCart', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          changeCounter(data.cart.length);
          addCartItem(data.cart);

        } else {
          console.error('Failed to fetch cart');
        }
      } catch (error) {
        console.error('Error during fetching cart:', error);
      } finally {
        setLoading(false);

      }
    };

    fetchCart();
  }, []);



  return (
    <div className="Navbar">
      <div className="Navbar_logo">
        <Link
          to=""
          onClick={() => handleMenuClick("Shop")}
          className={select === "Shop" ? "selected" : ""}
          style={{ textDecoration: "none" }}
        >
          <img src={logo} alt="logo" className="logo" />
          <p className="logo_name">Bazzar</p>
        </Link>
      </div>

      <button
        className="menu-icon"
        onClick={() => setMenuOpen(prevMenuOpen => !prevMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="navigation"
      >
        <img src={menuOpen ? cross : menu} alt="menu" className="menuIcon" style={menuOpen ? { position: 'fixed' } : { position: "static" }} />
      </button>

      <div className={menuOpen ? "Nav-cnt vis" : "Nav-cnt"} id="navigation">
        <div className="Navbar_Menu">
          <Link to="" onClick={() => handleMenuClick("Shop")} className={select === "Shop" ? "selected" : ""} style={{ textDecoration: "none" }}>Shop</Link>
          <Link to="male" onClick={() => handleMenuClick("Male")} className={select === "Male" ? "selected" : ""} style={{ textDecoration: "none" }}>Male</Link>
          <Link to="female" onClick={() => handleMenuClick("Female")} className={select === "Female" ? "selected" : ""} style={{ textDecoration: "none" }}>Female</Link>
          <Link to="kids" onClick={() => handleMenuClick("Kids")} className={select === "Kids" ? "selected" : ""} style={{ textDecoration: "none" }}>Kids</Link>
        </div>



        <div className="Navbar_login">
          {userInfo?.user ? (
            <>
              <NavLink to="/profile" style={{ textDecoration: "none" }} className="Profile">
                <div style={windowWidth >= 1100 ? { width: "2rem", height: "2rem", border: '0.01px solid black', borderRadius: "50%", textAlign: "center", fontWeight: "bold", color: "orangered", fontSize: "1.3em", backgroundColor: "transparent" } : { textDecoration: "none", color: "black", fontWeight: '400', fontSize: '1rem' }}>
                  {windowWidth >= 1100 ? userInfo?.user?.userName[0]?.toUpperCase() || "U" : "Profile"}
                </div>
              </NavLink>

            </>
          ) : (
            <NavLink to="/login" className="login" style={{ textDecoration: "none" }}>Login</NavLink>
          )}

          {windowWidth < 1100 ? (
            <>
              <NavLink to="/cart" className="cart" style={{ textDecoration: "none" }}>Cart</NavLink>
              <button onClick={handleLogout} className="logOut">LogOut</button>
            </>
          ) : (
            <NavLink to="/cart" className="cart">
              <img src={cardIcon} alt="cardIcon" className="card" />
              <div className="card_count">{Cart.counter}</div>
            </NavLink>
          )}
        </div>
      </div>


      <div className="search-history">
        <ul>
          {searchHistory.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
