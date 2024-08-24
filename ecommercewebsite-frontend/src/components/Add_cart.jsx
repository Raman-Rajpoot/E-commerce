import React, { useContext, useEffect, useState } from 'react';
import One_cart from './One_cart';
import './Add_cart.css';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import Buycontext from '../Context/Buy_context/Buy_context';
import LoginContext from '../Context/Login_context/LoginContext';

function Add_cart() {
  const { cartitem, addCartItem } = useContext(Cartcontext); 
  const { buyitem, addbuyitem } = useContext(Buycontext);
  const { user, setuser } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);  // Added loading state
  
  

  return (
    <div className='cart-page'>
      <h2 className='myCart-label'>My Cart</h2>
      <div className='title-row'>
        <div>Product</div>
        <div style={{ width: '45%' }}>Title</div>
        <div>Price</div>
        <div>Remove</div>
      </div>
      <div className="hr"></div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          (user?.cart || []).map((item, index) => (
            <One_cart
              key={item?.productID}
              id={item?.productID}
              img={item?.productImage}
              title={item?.productName}
              price={item?.productNewPrice}
              oldPrice={item?.productOldPrice}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Add_cart;
