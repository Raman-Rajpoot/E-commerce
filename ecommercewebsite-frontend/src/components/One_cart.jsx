import React, { useContext, useCallback, useState } from 'react';
import { Link } from "react-router-dom";
import './One_cart.css';
import cross from '../images/cart_cross_icon.png';
import MyContext from '../Context/States/Context';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import Buycontext from '../Context/Buy_context/Buy_context';
import LoginContext from '../Context/Login_context/LoginContext';

function One_cart({
  itemKey,  // Renamed from key to avoid conflict
  id,
  img,
  title,
  price
}) {
  const Cart = useContext(MyContext);
  const { cartitem, addCartItem } = useContext(Cartcontext);
  const { buyitem, addbuyitem } = useContext(Buycontext);
  const {user,setUser} = useContext(LoginContext);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = useCallback(async () => {
    setLoading(true);
    try {
      const productId = parseInt(id, 10); // Ensure the id is an integer

      const response = await fetch('http://localhost:7000/api/v1/user/removecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productID: productId }), // Send the id with a key
        credentials: 'include'
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          addCartItem(data.cart);
          console.log('Updated cart:', data.cart, productId);
        } else {
          console.error('Error removing item:', data.message);
          setIsAlertVisible(true); // Show an alert if needed
        }
      } else {
        console.error('Unexpected response type:', contentType);
        setIsAlertVisible(true);
      }
    } catch (error) {
      console.error('Error during remove request:', error);
      setIsAlertVisible(true); // Show an alert if needed
    } finally {
      setLoading(false);
    }
  }, [id, addCartItem]);

  return (
    <div className='closs'>
      <Link to='/product' style={{ textDecoration: "none" }}>
        <div className='cart-row'>
          <div>{itemKey}</div>
          <img src={img} alt="cart-item" className='product-item-img' />
          <div className='cart-title'>
            {title}
          </div>
          <div>
            {price}
          </div>
        </div>
      </Link>
      <img 
        src={cross} 
        alt="Remove" 
        className='remove-icon'  
        onClick={() => {
          Cart.changeCounter(Cart.counter - 1);
          handleRemoveItem();
        }}
      />
      {isAlertVisible && <div className="alert">Error removing item. Please try again.</div>}
      {loading && <div className="loading">Removing item...</div>}
    </div>
  );
}

export default One_cart;
