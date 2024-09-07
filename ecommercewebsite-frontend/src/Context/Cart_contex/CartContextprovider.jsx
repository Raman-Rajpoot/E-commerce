import React, { useState } from 'react';
import Cartcontext from './Cart_contex.js';

const CartContextProvider = ({ children }) => {
  const [cartitem, setCartitem] = useState([]); // Initialize as an empty array

  const addCartItem = (item) => {
      setCartitem( item);
      console.log("cartitem after adding item:",item);
  };
//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem("user");
// };
  return (
      <Cartcontext.Provider value={{ cartitem, addCartItem }}>
          {children}
      </Cartcontext.Provider>
  );
};

export default CartContextProvider;
