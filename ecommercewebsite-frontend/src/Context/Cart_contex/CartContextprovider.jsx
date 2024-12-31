import React, { useState } from 'react';
import Cartcontext from './Cart_contex.js';

const CartContextProvider = ({ children }) => {
  const [cartitem, setCartitem] = useState([]); 

  const addCartItem = (item) => {
      setCartitem( item);
  };

  return (
      <Cartcontext.Provider value={{ cartitem, addCartItem }}>
          {children}
      </Cartcontext.Provider>
  );
};

export default CartContextProvider;
