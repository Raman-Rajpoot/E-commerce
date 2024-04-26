import React, {useState} from 'react'
import Cartcontext from './Cart_contex';

function CartContextprovider({children}) {
    const [cartitem, addcartitem]= useState([]);
  return (
    <Cartcontext.Provider value={{cartitem, addcartitem}}>
       {children}
    </Cartcontext.Provider>
  )
}

export default CartContextprovider;