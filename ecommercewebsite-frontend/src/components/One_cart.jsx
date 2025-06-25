import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './One_cart.css';
import cross from '../images/cart_cross_icon.png';
import MyContext from '../Context/States/Context';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import Buycontext from '../Context/Buy_context/Buy_context';
import LoginContext from '../Context/Login_context/LoginContext';

function One_cart({
  itemKey, 
  id,
  img,
  title,
  price,
  oldPrice
}) {
  const Cart = useContext(MyContext);
  const { addCartItem } = useContext(Cartcontext);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { buyitem, addbuyitem } = useContext(Buycontext);
  
  const handleRemoveItem = useCallback(async () => {
    setLoading(true);
    try {
      const productId = parseInt(id, 10); 

      const response = await fetch('https://ecommerce-backend-j9hr.onrender.com/api/v1/user/removecart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productID: productId }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        addCartItem(data.cart);
        
      } else {
        throw new Error(data.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setIsAlertVisible(true);
    } finally {
      setLoading(false);
    }
  }, [id, addCartItem]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="closs">
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }} onClick={()=>{ addbuyitem({productID : id,productImage: img,productName: title,productOldPrice:oldPrice,productNewPrice:price})}}>
        <div className="cart-row">
          <div>{itemKey}</div>
          <img src={img} alt="cart-item" className="product-item-img" />
          <div className="cart-title">{title}</div>
          <div>{price}</div>
        </div>
      </Link>
  
     
      {!loading && (
        <img
          src={cross}
          alt="Remove"
          className="remove-icon"
          onClick={() => {
            Cart.changeCounter(Math.max(0, Cart.counter - 1));
            handleRemoveItem();
          }}
        />
      )}
  
     
      {isAlertVisible && <div className="alert">❌ Error removing item. Please try again.</div>}
      {loading && <div className="loading">⏳ Removing item...</div>}
    </div>
  );
  
}

export default One_cart;
