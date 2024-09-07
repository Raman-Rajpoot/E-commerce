import React, { useContext, useEffect, useState, useMemo } from 'react';
import One_cart from './One_cart';
import './Add_cart.css';
import Cartcontext from '../Context/Cart_contex/Cart_contex';
import MyContext from '../Context/States/Context';

function Add_cart() {
  const { cartitem, addCartItem } = useContext(Cartcontext); 
  const [loading, setLoading] = useState(false);
  const { counter, changeCounter } = useContext(MyContext);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:7000/api/v1/user/getCart', {
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
          console.log(counter);
          console.log('Cart fetched successfully:', data.cart);
        } else {
          console.error('Failed to fetch cart');
        }
      } catch (error) {
        console.error('Error during fetching cart:', error);
      } finally {
        setLoading(false);
        console.log("Cart fetch operation completed");
      }
    };

    fetchCart();
  }, []);

  const memoizedCartItems = useMemo(() => (
    cartitem.map((item) => (
      <One_cart
        key={item?.productId}
        id={item?.productId}
        img={item?.productImage}
        title={item?.productName}
        price={item?.productPrice.$numberDecimal}
        oldPrice={item?.productOldPrice?.$numberDecimal}
      />
    ))
  ), [cartitem]);

  return (
    <div className='cart-page'>
      <h2 className='myCart-label'>My Cart</h2>
      <div className='title-row'>
        <div>Product</div>
        <div style={{ width: '40%' }}>Title</div>
        <div>Price</div>
        <div>Remove</div>
      </div>
      <div className="hr"></div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          memoizedCartItems
        )}
      </div>
    </div>
  );
}

export default Add_cart;
